import React from "react"


class Score extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <h2>Your score: <span>{this.props.score}</span></h2>
        )
    }
}


export default Score