const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_VALID_API_KEY` // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "You are an agricultural expert assistant. Provide detailed, practical advice about farming, planting, crop management, and sustainable agriculture."
                }, {
                    role: "user",
                    content: message
                }]
            })
        });

        const data = await response.json();
        res.json(data.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
