const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());

app.get('/api/:category/:page', async (req, res) => {
    try {
        const category = req.params.category;
        const page = req.params.page;

        const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&per_page=9`);
        const data = response.data;
        const length = Array.isArray(data.hits) ? data.hits.length : 0;
        res.json({ Message: 'successful', category, page, data });
        console.log(`${category} - ${page} - ${length}`);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('server started on port 5000');
});
