import React from "react";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            context: null
        }
    }

    componentDidMount() {
        this.setState({
            context: this.canvasRef.current.getContext("2d")
        })
    }

    render() {
        return (
            <canvas ref={this.canvasRef} {...this.props} />
        )
    }
}

export default Canvas;