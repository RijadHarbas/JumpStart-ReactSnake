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


        this.state = {
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
        this.drawSnake();
        this.clearGameArea();
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

    }

    drawApple() {

    }

    createApple() {

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