import React from "react"


class Score extends React.Component {
    render() {
        return (
            <h2>Your score: <span>{this.props.score}</span></h2>
        )
    }
}


export default Score