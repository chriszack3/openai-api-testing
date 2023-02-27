import fs from "fs"

const ReturnJson = (req, res) => {
    fs.readFile(`${process.env.HOME}/local-openai-app/src/data/msgDump.json`, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err)
            return;
        }
        console.log('api: ', data)
        res.status(200).send(data);
    })
}

export default ReturnJson;