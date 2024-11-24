const { handler } = require('../src/services/searchHistoryServices.js');
const { getSearchHistory } = require('../src/client/dynamoDBClient');

jest.mock('../src/client/dynamoDBClient');

describe('Search History', () => {
    test('Should return search history successfully', async () => {
        const history = [
            { id: '1', currency: 'bitcoin', timestamp: '2024-11-12T12:34:56.000Z' },
            { id: '2', currency: 'ethereum', timestamp: '2024-11-12T12:35:56.000Z' },
        ];
        getSearchHistory.mockResolvedValue(history);

        const result = await handler();

        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).history).toEqual(history);
    });

    test('Should return 500 if retrieving history fails', async () => {
        getSearchHistory.mockRejectedValue(new Error('Database error'));

        const result = await handler();

        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).error).toBe('Database error');
    });
});
