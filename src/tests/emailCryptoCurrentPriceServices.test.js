const axios = require('axios');
const { handler } = require('../src/services/emailCryptoCurrentPriceServices.js');
const { sendEmail } = require('../src/client/sesClient.js');
const { saveSearchHistory } = require('../src/client/dynamoDBClient');

jest.mock('axios');
jest.mock('../src/client/sesClient.js');
jest.mock('../src/client/dynamoDBClient');

describe('Email Cryptocurrency Current Price', () => {
    test('Should return current price and send email successfully', async () => {
        axios.get.mockResolvedValue({ data: { bitcoin: { usd: 50000 } } });
        sendEmail.mockResolvedValue({});
        saveSearchHistory.mockResolvedValue({});

        const event = { body: JSON.stringify({ currency: 'bitcoin' }) };
        const result = await handler(event);

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe(
            'The current price of bitcoin is $50000. An email has been sent.'
        );
        expect(sendEmail).toHaveBeenCalledWith('bitcoin', 50000);
        expect(saveSearchHistory).toHaveBeenCalledWith('bitcoin');
    });

    test('Should return 500 if currency is not found', async () => {
        axios.get.mockResolvedValue({ data: {} });
        const event = { body: JSON.stringify({ currency: 'unknowncoin' }) };
        const result = await handler(event);

        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).error).toBe('Currency not found');
    });

    test('Should return 500 if email sending fails', async () => {
        axios.get.mockResolvedValue({ data: { bitcoin: { usd: 50000 } } });
        sendEmail.mockRejectedValue(new Error('Email service failed'));

        const event = { body: JSON.stringify({ currency: 'bitcoin' }) };
        const result = await handler(event);

        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).error).toBe('Email service failed');
    });
});
