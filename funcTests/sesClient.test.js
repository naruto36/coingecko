const { sendEmail } = require('../../src/client/sesClient.js');
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
    const SES = {
        sendEmail: jest.fn().mockReturnThis(),
        promise: jest.fn(),
    };
    return { SES: jest.fn(() => SES) };
});

describe('sendEmail', () => {
    test('Should send email successfully', async () => {
        AWS.SES.prototype.promise.mockResolvedValue({});

        const result = await sendEmail('bitcoin', 50000);
        expect(result).toEqual({});
    });

    test('Should throw error if email sending fails', async () => {
        AWS.SES.prototype.promise.mockRejectedValue(new Error('SES failed'));

        await expect(sendEmail('bitcoin', 50000)).rejects.toThrow('SES failed');
    });
});
