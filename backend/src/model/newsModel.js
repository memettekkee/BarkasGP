const axios = require('axios');

const API_KEY = 'fd80c4fde90244a3b84e1669a96c192b';
const BASE_URL = 'https://newsapi.org/v2';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function newsModel() {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: {
                q: 'motorcycle',
                apiKey: API_KEY,
                pageSize: 100, 
            },
        });

        const articles = response.data.articles;

        const shuffledArticles = shuffleArray(articles);

        return shuffledArticles.slice(0, 10);
    } catch (error) {
        throw new Error('Error fetching and shuffling motorcycle news');
    }
}

module.exports = { newsModel }

