import React, { useState } from "react"
import axios from "axios"

const Index = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState([])
  const onSubmit = async (e) => {
    e.preventDefault();
    axios.post(`/api/OpenAi`, {
      prompt: prompt
    }).then(response => {
      console.log(response.data);
      setResponse(response?.data?.choices);
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <main>
      <title>Home Page</title>
      <h1>Welcome to my Gatsby site!</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
      </form>
      {
        response && response.map((item, index) => {
          return <p key={index}>{item.text}</p>
        })
      }
    </main>
  )
}

export default Index