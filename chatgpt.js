const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
})

// initialize openai app
const openai = new OpenAIApi(config);

// setup server

const app = express();
app.use(BodyParser.json());
app.use(cors());

//endpoint for chatgpt (to communicate with the front)

app.post("/chat", async (req,res) => { 

    const { prompt } = req.body;

    const complention = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt, 
    });

    res.send(complention.data.choices[0].text);

})

//port and server configurations

const port = 8082;
app.listen(port, () => {
    console.log(`Server listening on port ${port}` );
})
