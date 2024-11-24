const { getSearchHistory } = require('../client/dynamoDBClient');

require('dotenv').config();


exports.handler = async () => {
    try {
        const history = await getSearchHistory();

        return {
            statusCode: 200,
            body: JSON.stringify({ history }),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
