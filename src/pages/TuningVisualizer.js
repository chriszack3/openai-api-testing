import React, { useState } from "react"
import { Link } from "gatsby"

const TuningVisualizer = () => {
    const [prompt, setPrompt] = useState("")
    const [completion, setCompletion] = useState("")


    const [compPrompPairs, setPair] = useState([])

    const handleAddPairs = (p, c) => {
        const pairs = `{"prompt": "${p} ###", "completion": "${c} /nEND/n"}`
        setPair([...compPrompPairs, pairs])
    }

    return(
        <div>
            <h1>Tuning Visualizer Here or UX for Interacting with Models <Link alt='home' to='/'>Here</Link></h1>
            <div>
                <h3>Add Prompt/Completion Here</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <span>New Prompt/Completion Pair: </span><p>{`{"prompt": "${prompt} ###", "completion": "${completion} /nEND/n"}`}</p><button onClick={() => handleAddPairs(prompt, completion)}>Add</button>
                </form>
                <div>
                    {
                        compPrompPairs?.length > 0 && compPrompPairs.map((pair) => <>{pair}<br /></>)
                    }
                </div>
            </div>
            <form>
                <legend>Prompt/Completion Formatter</legend>
                <label>Prompt: </label><textarea value={prompt} onChange={(e) => setPrompt(e?.target?.value)} ></textarea>
                <label>Completion: </label><textarea value={completion} onChange={(e) => setCompletion(e?.target?.value)} ></textarea>
            </form>
        </div>
    )
}

export default TuningVisualizer