import React from "react";
import "./Canvas.css"

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = null
        this.setCanvasRef = element => {
            this.canvas = element;
            this.setState({ context: element.getContext("2d") })
        }

        this.clearGameArea = this.clearGameArea.bind(this);
        this.drawSnake = this.drawSnake.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        this.drawApple = this.drawApple.bind(this);
        this.createApple = this.createApple.bind(this);
        this.handleKeyboardEvents = this.handleKeyboardEvents.bind(this);
        this.isGameOver = this.isGameOver.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        this.state = {
            currentApple: null,
            previousTime: null,
            directionModX: 0,
            directionModY: -10,
            snake: {
                parts: [
                    { x: 170, y: 200 },
                    { x: 180, y: 200 },
                    { x: 190, y: 200 },
                    { x: 200, y: 200 }
                ],
                getHead() {
                    return this.parts[this.parts.length - 1];
                },
                getTail() {
                    return this.parts[0];
                },
                appendNewHead(directionModX, directionModY) {
                    const currentHead = this.getHead();
                    const newHead = { x: 0, y: 0 };
                    newHead.x = currentHead.x + directionModX;
                    newHead.y = currentHead.y + directionModY;
                    this.parts.push(newHead);
                    // Cut the end of the tail
                    this.parts.shift();
                },
                appendNewTail(directionModX, directionModY) {
                    const currentTail = this.getTail();
                    const newTail = { x: 0, y: 0 };
                    newTail.x = currentTail.x - directionModX;
                    newTail.y = currentTail.y - directionModY;
                    this.parts.unshift(newTail);
                }
            }
        }

    }

    componentDidMount() {
        requestAnimationFrame(this.gameLoop);
        document.addEventListener("keydown", this.handleKeyboardEvents);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyboardEvents);
    }

    clearGameArea() {
        this.state.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
    }

    drawSnake() {
        for (const part of this.state.snake.parts) {
            this.state.context.fillStyle = "#D9ED92"
            this.state.context.strokeStyle = "#168AAD";
            this.state.context.fillRect(part.x, part.y, 10, 10);
            this.state.context.strokeRect(part.x, part.y, 10, 10);
        }
    }

    moveSnake() {
        this.state.snake.appendNewHead(this.state.directionModX, this.state.directionModY);
        // Did we land on an apple? If so increase the score
        if (this.state.currentApple && this.state.currentApple.x === this.state.snake.getHead().x
            && this.state.currentApple.y === this.state.snake.getHead().y) {
            // We ate the apple; Increase the score
            this.props.updateScore(this.props.oldScore + 10);
            this.setState({ currentApple: null });
            this.state.snake.appendNewTail();
        }
    }

    drawApple() {
        this.state.context.fillStyle = "#FF0000";
        if (!this.state.currentApple) {
            this.setState({ currentApple: this.createApple() });
        }
        const isInvalidPosition = this.state.snake.parts
            .some(part => part.x === this.state.currentApple.x && part.y === this.state.currentApple.y);

        if (isInvalidPosition) {
            this.setState({ currentApple: null });
            return;
        }
        this.state.context.fillRect(this.state.currentApple.x, this.state.currentApple.y, 10, 10);
    }

    createApple() {
        let x = Math.floor(Math.random() * (this.canvas.width - 20)) + 10;
        // Remove the single digits, e.g. 427 becomes 420
        x = x - x % 10;
        let y = Math.floor(Math.random() * (this.canvas.height - 20)) + 10;
        y = y - y % 10;
        return { x: x, y: y };
    }

    handleKeyboardEvents(event) {
        if (event.key === "a") {
            if (this.state.directionModX !== 10) {
                this.setState({ directionModX: -10, directionModY: 0 })
            }
        } else if (event.key === "d") {
            if (this.state.directionModX !== -10) {
                this.setState({ directionModX: 10, directionModY: 0 })
            }
        } else if (event.key === "w") {
            if (this.state.directionModY !== 10) {
                this.setState({ directionModX: 0, directionModY: -10 })
            }
        } else if (event.key === "s") {
            if (this.state.directionModY !== -10) {
                this.setState({ directionModX: 0, directionModY: 10 })
            }
        }
    }

    isGameOver() {
        const head = this.state.snake.getHead();
        let isOutOfBounds = false;
        isOutOfBounds = head.x < 0 || head.y < 0;
        isOutOfBounds = isOutOfBounds || head.x >= this.canvas.width || head.y >= this.canvas.height;

        const isCollidedWith = this.state.snake.parts
            .slice(0, -1)
            .some(part => part.x === head.x && part.y === head.y);

        return isOutOfBounds || isCollidedWith;
    }

    gameLoop(timestamp) {
        if (!this.state.previousTime) {
            this.setState({ previousTime: timestamp });
        }
        // How fast the snake is rendered depends on the difficulty, Higher means easier
        if (timestamp - this.state.previousTime >= 100) {
            this.setState({ previousTime: timestamp })
            this.clearGameArea();
            this.drawSnake();
            this.drawApple();
            this.moveSnake();
            if (this.isGameOver()) {
                return;
            }
        }
        requestAnimationFrame(this.gameLoop);
    }

    render() {
        return (
            <div className="Game">
                <canvas ref={this.setCanvasRef} {...this.props}>A snake game</canvas>
            </div>

        )
    }
}

export default Canvas;