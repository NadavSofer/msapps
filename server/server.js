const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

const PIXABAY_API_KEY = '25540812-faf2b76d586c1787d2dd02736';

app.get('/api/:category/:page', async (req, res) => {
    try {
        const category = req.params.category;
        const page = req.params.page;
        const perPage = 9;

        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${category}&per_page=${perPage}&page=${page}`);

        const data = response.data;

        res.json({ Message: 'successful', category, page, data });


    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('server started on port 5000');
});
