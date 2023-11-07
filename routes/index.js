require('dotenv').config();

const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
  };
   router.use(auth(config));
  router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

router.get('/Hospital', (req, res) => {
    // Requires authentication
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send('Not logged in');
    }
    res.send(JSON.stringify(req.oidc.user));
});

router.use('/', require('./swagger'));
router.use('/', require('./swagger'));
module.exports = router;