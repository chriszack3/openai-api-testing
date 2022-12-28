import React, { useState, useEffect } from "react"
import axios from "axios"

const Index = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if(localStorage?.length > 0) {
      let storage = [];
      for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.getItem(localStorage.key(i))
        storage.push(value)
      }
      setHistory(storage)
    }
  }, [response])
 
  

  const onSubmit = async (e) => {
    e.preventDefault();
    axios.post(`/api/OpenAi`, {
      prompt: prompt
    }).then(response => {
      console.log(response.data);
      //set response to state
      setResponse(response?.data);
      //log original prompt && response to local storage
      const timestamp = new Date().toISOString();
      
      localStorage.setItem(timestamp, JSON.stringify({
        prompt: prompt,
        response: response?.data
        })
      )

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
        response?.choices && response?.choices.map((item, index) => {
          return Object.keys(item).map((key, index) => {
            return <p key={index}>{key}: {item[key]}</p>
          })
          
        })
      }
      {
        history?.length > 0 && history.map((item, index) => {
          return (
            <div key={index}>
              <p>{item}</p>
            </div>
          )
        })
      }
    </main>
  )
}

export default Index