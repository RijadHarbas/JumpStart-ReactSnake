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

    }

    componentDidMount() {
        this.drawSnake();
    }

    clearGameArea() {
        this.context.clearRect(0, 0, this.props.height, this.props.width);
    }

    drawSnake() {
        this.context.fillStyle = "#D9ED92"
        this.context.strokeStyle = "#168AAD";
        this.context.fillRect(100, 100, 10, 10);
        this.context.strokeRect(100, 100, 10, 10);
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