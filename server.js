const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/api/chat', (req, res) => {
    const data = fs.readFileSync('./chat.txt',
        { encoding: 'utf8', flag: 'r' });
    res.send({ data });
})

app.post('/api/chat', (req, res) => {
    fs.appendFile('./chat.txt', req.body.message + '\n', function (err) {
        if (err) {
            res.status(500).send('Server Error');
        }
        const data = fs.readFileSync('./chat.txt',
            { encoding: 'utf8', flag: 'r' });
        res.send({ data });
    })
})

app.post('/api/chatgpt', async (req, res) => {
    try {
        // Extract message from frontend request
        const message = req.body.message;

        // Replace with your OpenAI API key
        const apiKey = '';

        // API endpoint for ChatGPT
        const apiUrl = 'https://api.openai.com/v1/completions';

        // Configure headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        // Set up the prompt and other parameters for the ChatGPT API request
        const data = {
            model: "text-davinci-003",
            prompt: `${message}\nAI: `,
            max_tokens: 50,
            n: 1,
            stop: null,
            temperature: 0.5,
        };

        // Send a POST request to the ChatGPT API using fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        // Check if the response is successful
        if (response.ok) {
            const responseData = await response.json();
            // Extract the first generated response from the API response
            const chatGPTResponse = responseData.choices[0].text.trim();

            // Send the ChatGPT response back to the frontend
            res.json({ message: chatGPTResponse });
        } else {
            throw new Error(`HTTP error ${response.status}`);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});


app.use(express.static(path.resolve(__dirname, './')));

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
