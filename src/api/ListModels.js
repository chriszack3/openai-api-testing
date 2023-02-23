import axios from "axios";

const OpenAi = (req, res) => {
    axios.defaults.headers.common = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
    axios.get('https://api.openai.com/v1/models').then(({ data }) => {
        console.log(data);

        res.status(200).send(data);
    }).catch(err => {
        console.log(err.response);
        res.status(500).send(err)
    })
}

export default OpenAi;