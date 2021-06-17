import React from "react"

class Difficulty extends React.Component {

    render() {
        return (
            <div className="difficulty-selector" onChange={this.props.updateDifficulty}>
                <h2>Difficulty</h2>
                <label htmlFor="easy">Easy</label>
                <input type="radio" name="difficulty" id="easy" value="300" />

                <label htmlFor="medium">Medium</label>
                <input type="radio" name="difficulty" id="medium" value="100" defaultChecked />

                <label htmlFor="hard">Hard</label>
                <input type="radio" name="difficulty" id="hard" value="50" />
            </div>
        );
    }
}

export default Difficulty