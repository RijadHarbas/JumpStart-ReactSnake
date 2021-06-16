import React from "react"
import "./Status.css"

class Status extends React.Component {
    render() {
        return (
            <h2 className={this.props.visibility}>GAME OVER</h2>
        )
    }

}

export default Status