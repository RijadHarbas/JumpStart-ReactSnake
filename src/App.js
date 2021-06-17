import React from "react"
import Game from "./Game"
import Status from "./Status"
import Score from "./Score"
import Difficulty from "./Difficulty"
import "./App.css"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.updateStatus = this.updateStatus.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateDifficulty = this.updateDifficulty.bind(this);
        this.state = { score: 0, statusVisibility: "Status-hide", difficulty: 100 }
    }
    updateStatus() {
        this.setState({ statusVisibility: "Status-show" })
    }
    updateScore(newScore) {
        this.setState({ score: newScore })
    }
    updateDifficulty(difficultyChangeEvent) {
        this.setState({ difficulty: difficultyChangeEvent.target.value });
        console.log(difficultyChangeEvent.target.value);
    }
    render() {
        return (
            <div className="App">
                <h1>SNAAAAAKES!!!</h1>
                <Score score={this.state.score} />
                <Difficulty updateDifficulty={this.updateDifficulty} />
                <Game height={"250px"} width={"250px"} oldScore={this.state.score} updateScore={this.updateScore} onGameOver={this.updateStatus} difficulty={this.state.difficulty} />
                <Status visibility={this.state.statusVisibility} />
            </div>
        )
    }
}

export default App;