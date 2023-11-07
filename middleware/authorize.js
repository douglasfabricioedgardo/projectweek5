const checkLogin = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).send({
        error: 'Not authorized to change data without login.',
        login: "project5-l35t.onrender.com/login"
      });
    }
    next();
  };
  
  module.exports = {checkLogin};