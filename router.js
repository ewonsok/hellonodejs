const express = require('express');
const bodyParser = require('body-parser');
const routerFunctions = require('./routerFunctions');

const router = express.Router();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Define routes using imported functions
router.get('/', routerFunctions.homepage);
router.get('/sound/:name', routerFunctions.soundName);
router.post('/news', routerFunctions.news);
router.post('/error', routerFunctions.error);
// router.get('/api/sample', routerFunctions.sampleEndpoint);
// router.get('/api/users/:id', routerFunctions.getUserById);
// router.post('/api/users', routerFunctions.createUser);
// router.put('/api/users/:id', routerFunctions.updateUser);
// router.delete('/api/users/:id', routerFunctions.deleteUser);

module.exports = router;


