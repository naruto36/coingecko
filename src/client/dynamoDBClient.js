const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'cryptoSearchHistory';

exports.saveSearchHistory = async (currency) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: Date.now().toString(),
            currency: currency,
            timestamp: new Date().toISOString(),
        },
    };
    return dynamoDb.put(params).promise();
};

exports.getSearchHistory = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
};
