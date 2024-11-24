const { saveSearchHistory, getSearchHistory } = require('../../src/client/dynamoDBClient');
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
    const DocumentClient = {
        put: jest.fn().mockReturnThis(),
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn(),
    };
    return { DynamoDB: { DocumentClient: jest.fn(() => DocumentClient) } };
});

describe('saveSearchHistory', () => {
    test('Should save search history successfully', async () => {
        AWS.DynamoDB.DocumentClient.prototype.promise.mockResolvedValue({});

        const result = await saveSearchHistory('bitcoin');
        expect(result).toEqual({});
    });

    test('Should throw error if saving fails', async () => {
        AWS.DynamoDB.DocumentClient.prototype.promise.mockRejectedValue(new Error('DynamoDB failed'));

        await expect(saveSearchHistory('bitcoin')).rejects.toThrow('DynamoDB failed');
    });
});

describe('getSearchHistory', () => {
    test('Should retrieve search history successfully', async () => {
        const history = [
            { id: '1', currency: 'bitcoin', timestamp: '2024-11-12T12:34:56.000Z' },
            { id: '2', currency: 'ethereum', timestamp: '2024-11-12T12:35:56.000Z' },
        ];
        AWS.DynamoDB.DocumentClient.prototype.promise.mockResolvedValue({ Items: history });

        const result = await getSearchHistory();
        expect(result).toEqual(history);
    });

    test('Should throw error if retrieving fails', async () => {
        AWS.DynamoDB.DocumentClient.prototype.promise.mockRejectedValue(new Error('DynamoDB failed'));

        await expect(getSearchHistory()).rejects.toThrow('DynamoDB failed');
    });
});
