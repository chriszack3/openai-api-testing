import React from "react"
import PromptCompPair from "../components/promptCompPair"
import { Link } from "gatsby"
import { v4 as uuidv4 } from 'uuid';

const TuningVisualizer = () => {

    return(
        <div>
            <h1>Tuning Visualizer Here or UX for Interacting with Models <Link alt='home' to='/'>Here</Link></h1>
            <h3>Add Prompt/Completion Here</h3>
            <PromptCompPair />
        </div>
    )
}

export default TuningVisualizer