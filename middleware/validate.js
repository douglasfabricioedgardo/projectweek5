const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    Full_names: 'required|string',
    years: 'required|numeric',
    number: 'required|numeric',
    entry_date: 'required|string',
    disease: 'required|string',
    Doctor_charge: 'required|string',
    Day_in_hospital: 'required|numeric',
    Number_room: 'required|numeric'
   
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};

