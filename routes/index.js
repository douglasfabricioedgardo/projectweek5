require('dotenv').config();

const express = require('express');
const router = express.Router();
const { auth,requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.HOSPITAL_CLIENT_ID,
    issuerBaseURL: process.env.HOSPITAL_ISSUER_BASE_URL
  };
   router.use(auth(config));
  router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

router.get('/profile', requiresAuth(), (req, res) => {
    // Requires authentication
    //if (!req.oidc.isAuthenticated()) {
      //return res.status(401).send('Not logged in');
    //}
    res.send(JSON.stringify(req.oidc.user));
});


router.use('/api-docs', require('./swagger'));
router.use('/Hospital', require('./hospital'));
module.exports = router;