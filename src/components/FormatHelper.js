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
                    console.log(threadObj)
                    return (
                        <div key={i}>
                            <h4>{threadObj.usernames}</h4>
                            <span>Messages: </span>
                            {
                                threadObj?.threadMessages.map(messages => (
                                    <p>{messages.text}</p>
                                ))
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