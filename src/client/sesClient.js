const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const ses = new AWS.SES();

exports.sendEmail = async (currency, price) => {
    const params = {
        Destination: {
            ToAddresses: ['user@example.com'],
        },
        Message: {
            Body: {
                Text: { Data: `The current price of ${currency.toUpperCase()} is given as $${price}.` },
            },
            Subject: { Data: `Subject to the Price Alert: ${currency.toUpperCase()}` },
        },
        Source: 'user@example.com',
    };
    return ses.sendEmail(params).promise();
};
