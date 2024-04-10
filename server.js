const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path')
app.use(cors());
require('dotenv').config();

app.get('/api/:category/:page/:numPerPage', async (req, res) => {
    try {
        const APIKey = process.env.PIXABAY_API_KEY
        const category = req.params.category;
        const page = req.params.page;
        const perPage = req.params.numPerPage;

        const response = await axios.get(`https://pixabay.com/api/?key=${APIKey}&q=${category}&per_page=${perPage}&page=${page}`);

        const data = response.data;

        const maxPage = (data.totalHits / 9).toFixed()

        res.json({ Message: 'successful', category, page, maxPage, data });


    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(5000, () => {
    console.log('server started on port 5000');
});


// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
