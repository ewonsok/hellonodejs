const express = require('express');
const router = require('./router');

const app = express();
app.use(router);

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
