const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config({ path: '../llm/.env' });

const llmApiKey = process.env.LLM_API_KEY;

exports.generateResponse = async (content) => {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${llmApiKey}`
      },
      body: JSON.stringify({
        prompt: content,
        max_tokens: 50,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['\n']
      })
    });

    if (!response.ok) {
      throw new Error('LLM API request failed');
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating response from LLM:', error.message);
    return 'Sorry, I\'m currently busy. I\'ll get back to you later.';
  }
};
