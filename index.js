require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');
const { Client, GatewayIntentBits } = require('discord.js');

const configuration = new Configuration ({
    apiKey: process.env.OPENAI_API_KEY
});

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

async function gptResponse(prompt) {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 200,
        temperature: 0.5,
    });
    return response.data.choices[0].text;
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if(message.content === 'Hey') message.reply('Hi, how can I help you today?');
    if(message.content.startsWith('dexter')){
        const prompt = message.content
        const response = await gptResponse(prompt);
        message.reply(response);
    }
});

client.login(process.env.DISCORD_BOT_API_TOKEN);