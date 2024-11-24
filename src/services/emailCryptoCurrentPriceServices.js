const axios = require('axios');
const AWS = require('aws-sdk');
const { saveSearchHistory } = require('../client/dynamoDBClient');
const { sendEmail } = require('../client/sesClient.js');
require('dotenv').config();

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/price/current';

exports.handler = async (event) => {
    const currency = event.queryStringParameters.currency;

    try {
        const response = await axios.get(`${COINGECKO_API_URL}?ids=${currency}&vs_currencies=usd`);
        const price = response.data[currency]?.usd;

        if (!price) throw new Error('Currency not found');

        // Frmt with snd the email
        await sendEmail(currency, price);

        // Sve history
        await saveSearchHistory(currency);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Price of ${currency}: $${price}` }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
