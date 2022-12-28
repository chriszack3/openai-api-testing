import axios from "axios";

const OpenAi = (req, res) => {
    const body = req?.body?.prompt;
    const prompt = typeof body === 'string' ? body : 'invalid prompt'
    axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }

    axios.post('https://api.openai.com/v1/completions', {
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 7,
        "temperature": 0
    }).then(({ data }) => {
        console.log(data);

        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send
    })
}

export default OpenAi;