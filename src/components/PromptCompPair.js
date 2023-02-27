import React, { useState } from "react"
import { Link } from "gatsby"
import { v4 as uuidv4 } from 'uuid';
import "./PromptCompPair.module.scss"

const PromptCompPair = () => {
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

    return (
        <div>
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
                <br />
                <button onClick={() => handleAddPairs(prompt, completion)}>Add</button>
            </form>
        </div>
    )
}

export default PromptCompPair