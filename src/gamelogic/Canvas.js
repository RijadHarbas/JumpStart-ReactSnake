import React from "react";

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.canvas = null
        this.context = null
        this.setCanvasRef = element => {
            this.canvas = element;
            this.context = element.getContext("2d");
        }

        this.clearGameArea = this.clearGameArea.bind(this);
        this.drawSnake = this.drawSnake.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        this.drawApple = this.drawApple.bind(this);
        this.createApple = this.createApple.bind(this);

        this.gameLoop = this.gameLoop.bind(this);

        this.state = {
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
        this.gameLoop();
    }

    clearGameArea() {
        this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);
    }

    drawSnake() {
        for (const part of this.state.snake.parts) {
            this.context.fillStyle = "#D9ED92"
            this.context.strokeStyle = "#168AAD";
            this.context.fillRect(part.x, part.y, 10, 10);
            this.context.strokeRect(part.x, part.y, 10, 10);
        }
    }

    moveSnake() {
        this.state.snake.appendNewHead(this.state.directionModX, this.state.directionModY);
        // Did we land on an apple? If so increase the score
        // if (currentApple && currentApple.x === snake.getHead().x && currentApple.y === snake.getHead().y) {
        //     score.innerText = parseInt(score.innerText) + 10;
        //     // We ate the apple
        //     currentApple = null;
        //     snake.appendNewTail();
        // }
    }

    drawApple() {

    }

    createApple() {

    }

    gameLoop(timestamp) {
        if (!this.state.previousTime) {
            this.state.previousTime = timestamp;
        }
        // How fast the snake is rendered depends on the difficulty, Higher means easier
        if (timestamp - this.state.previousTime >= 100) {
            this.state.previousTime = timestamp;
            this.clearGameArea();
            this.drawSnake();
            this.moveSnake();
        }
        requestAnimationFrame(this.gameLoop);
    }

    render() {
        return (
            <div>
                <canvas ref={this.setCanvasRef} {...this.props}>A snake game</canvas>
            </div>

        )
    }
}

export default Canvas;