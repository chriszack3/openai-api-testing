import axios from "axios";

const OpenAi = (req, res) => {
    const body = req?.body
    const prompt = body?.prompt && typeof body?.prompt === 'string' ? body?.prompt + `###` : 'invalid prompt'
    const max_tokens = body?.max_tokens && typeof body?.max_tokens === 'number' && body?.max_tokens < 500 ? body?.max_tokens : 500
    const temperature = body?.temperature && typeof body?.temperature === 'number' && body?.temperature < 1 && body?.temperature >= 0 ? body?.temperature : 0
    const frequency_penalty = body?.frequency_penalty && typeof body?.frequency_penalty === 'number' && body?.frequency_penalty < 2 && body?.frequency_penalty >-2 ? body?.frequency_penalty : 0
    axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }

    axios.post('https://api.openai.com/v1/completions', {
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "frequency_penalty": frequency_penalty,
        // "top_p": 1,
    }).then(({ data }) => {
        console.log(data);

        res.status(200).send(data);
    }).catch(err => {
        console.log(err.response);
        res.status(500).send(err)
    })
}

export default OpenAi;