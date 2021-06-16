import React from "react"
import Canvas from "./gamelogic/Canvas"

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Foo</h1>
                <Canvas height={"250px"} width={"250px"} />
            </div>

        )
    }
}

export default App;