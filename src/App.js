import React from "react"
import Canvas from "./Canvas"
import "./App.css"

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>SNAAAAAKES!!!</h1>
                <h2>Your score: <span id="score">0</span></h2>
                <Canvas height={"250px"} width={"250px"} />
            </div>

        )
    }
}

export default App;