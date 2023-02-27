import React from "react";
import axios from "axios"

const FormatHelper = () => {
    const getJson = async () => {
        const response = await axios.get('/api/ReturnJson')
        console.log(response)
    }
    return (
        <div>
            <button onClick={() => getJson()}>Get Json</button>
        </div>
    )
}

export default FormatHelper