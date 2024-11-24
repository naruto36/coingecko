const axios = require('axios');

exports.getCryptoPrice = async (currency) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`);
    return response.data[currency]?.usd;
};
