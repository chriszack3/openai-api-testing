import React, { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import "./index.module.scss"

const Index = () => {
  const [prompt, setPrompt] = useState('')
  const [temperature, setTemperature] = useState(0)
  const [max_tokens, setMaxTokens] = useState(500)
  const [frequency_penalty, setFrequencyPenalty] = useState(0)
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
      prompt: prompt,
      temperature: temperature,
      max_tokens: max_tokens,
      frequency_penalty: frequency_penalty
    }).then(response => {
      //set response to state
      setResponse(response?.data);
      //log original prompt && response to local storage
      const timestamp = new Date().toISOString();
      localStorage.setItem(timestamp, JSON.stringify({
        prompt: prompt,
        temperature: temperature,
        frequency_penalty: frequency_penalty,
        response: response?.data
        })
      )
    }).catch(err => {
      console.log(err);
    })
  }

  history?.sort((rawA, rawB) => {
    const a = JSON.parse(rawA)
    const b = JSON.parse(rawB)
    return b?.response?.created - a?.response?.created
  })
  return (
    <main>
      <title>Home Page</title>
      <h1>Interact with OpenAI Model Here</h1>
      <form onSubmit={onSubmit}>
        <label>Prompt:</label><textarea type="text" value={prompt} onChange={e => setPrompt(e.target.value)} /><br />
        <label>Temperature Slider: </label><input type="range" min="0" max=".9" step=".1" value={temperature} onChange={e => setTemperature(e.target.value)}></input><span>{temperature ?? 'Something went wrong'}</span><br />
        <label>Max Tokens: </label><input type="number" min="1" max="500" value={max_tokens} onChange={e => setMaxTokens(e.target.value)} /><br />
        <label>Frequency Penalty: </label><input type="number" min="-2" max="2" step=".1" value={frequency_penalty} onChange={e => setFrequencyPenalty(e.target.value)} /><br />
        <button type="submit">Submit</button>
      </form>
      {
        response?.choices && response?.choices.map((item, index) => {
          return Object.keys(item).map((key, index) => {
            return <p key={index}>{key}: {item[key]}</p>
          })
          
        })
      }
      {
        history?.length > 0 && history.map((rawItem, index) => {
          const item = JSON.parse(rawItem)
          
          const fromIsoDate = new Date(item?.response?.created * 1000)
          const date = moment(fromIsoDate).fromNow()

          const style = {
            'width': '50%',
            'margin': '0 auto',
            'display': 'flex',
            'flexDirection': 'column',
          }
          return (
            <div style={style} key={index}>
              <h3>{index}</h3>
                <p>{date}</p>
                <p>{item?.response?.choices[0].text}</p>
              <span>
                {rawItem}
              </span>
            </div>
          )
        })
      }
    </main>
  )
}

export default Index