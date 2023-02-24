import React, { useState } from "react"
import { Link } from "gatsby"
import { v4 as uuidv4 } from 'uuid';
import "./TuningVisualizer.module.scss"

const TuningVisualizer = () => {
    const [prompt, setPrompt] = useState("")
    const [completion, setCompletion] = useState("")


    const [compPrompPairs, setPair] = useState([])

    const handleAddPairs = (p, c) => {
        const pairs = {
            id: uuidv4(),
            pairStr: `{"prompt": "${p} ###", "completion": "${c} /nEND/n"}`,
            prompt: p,
            completion: c
        }
        setPair([...compPrompPairs, pairs])
        setPrompt("")
        setCompletion("")
    }

    const handleSelectPair = (e) => {
        e.preventDefault()
        const { prompt, completion } = compPrompPairs.find((pair) => pair.id === e.target.id)
        setPrompt(prompt)
        setCompletion(completion)
        const newPairArr = compPrompPairs.filter((pair) => pair.id !== e.target.id)
        setPair([...newPairArr])
    }

    return(
        <div>
            <h1>Tuning Visualizer Here or UX for Interacting with Models <Link alt='home' to='/'>Here</Link></h1>
                <h3>Add Prompt/Completion Here</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <span>New Prompt/Completion Pair: </span><p>{`{"prompt": "${prompt} ###", "completion": "${completion} /nEND/n"}`}</p>
                </form>
                <div>
                    {
                    compPrompPairs?.length > 0 && compPrompPairs.map(({ id, pairStr }) => (
                        <>
                            <span key={uuidv4()} id={id} onClick={(e) => handleSelectPair(e)}>{pairStr}</span>
                            <br />
                        </>
                    ))
                    }
                </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <legend>Prompt/Completion Formatter</legend>
                <label>Prompt: </label><textarea value={prompt} onChange={(e) => setPrompt(e?.target?.value)} ></textarea>
                <label>Completion: </label><textarea value={completion} onChange={(e) => setCompletion(e?.target?.value)} ></textarea>
                <br/>
                <button onClick={() => handleAddPairs(prompt, completion)}>Add</button>
            </form>
        </div>
    )
}

export default TuningVisualizer