import React, { useState } from "react";
import axios from "axios"

const FormatHelper = () => {
    const [jsonRes, setJsonRes] = useState([])
    const getJson = async () => {
        const response = await axios.get('/api/ReturnJson')
        setJsonRes(response.data)
    }
    return (
        <div>
            {
                jsonRes && jsonRes.map((threadObj, i) => {
                    let prompts = []
                    let completions = []
                    let pairs = []
                    threadObj.threadMessages.forEach((messages, index) => {
                        if (messages?.html?.includes("Appropriate_One_8365")) {
                            completions.push(messages.text)
                            if (!messages?.[index + 1]?.html?.includes("Appropriate_One_8365")) {
                                pairs = [...pairs, { prompts, completions }]
                                prompts = []
                                completions = []
                            }
                        } else {
                            prompts.push(messages.text)
                        }
                    })
                    console.log(pairs)
                    return (
                        <div key={i}>
                            <h4>{threadObj.usernames}</h4>
                            <span>Messages: </span>
                            {
                                pairs?.map(messages => {
                                    let promptsString = ""
                                    let comptString = ""
                                    messages?.prompts?.forEach((prompt, i) => {
                                        i > 0 ? promptsString = promptsString.concat('**start new message**' + prompt) : promptsString = promptsString.concat(prompt)
                                    })
                                    messages?.completions?.forEach((comp, i) => {
                                        i > 0 ? comptString = comptString.concat('**start new message**' + comp) : comptString = comptString.concat(comp)
                                    })
                                    const pair = `{"prompt": "${promptsString} ###", "completion": "${comptString} /nEND/n"}`
                                    return (
                                    <span>{ pair }<br/></span>
                                )})
                            }
                        </div>
                    )

                })
            }
            <button onClick={() => getJson()}>Get Json</button>
        </div>
    )
}

export default FormatHelper