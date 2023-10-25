const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('Hospital')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('Hospital').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createHospital = async (req, res) => {
  const Hospital = {
    Full_names: req.body.Full_names,
    years: req.body.years,
    number: req.body.number,
    entry_date: req.body.entry_date,
    disease: req.body.disease,
    Doctor_charge: req.body.Doctor_charge,
    Day_in_hospital: req.body
  };
  const response = await mongodb.getDb().db().collection('Hospital').insertOne(Hospital);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the Hospital.');
  }
};

const updateHospital = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const Hospital = {
    Full_names: req.body.Full_names,
    years: req.body.years,
    number: req.body.number,
    entry_date: req.body.entry_date,
    disease: req.body.disease,
    Doctor_charge: req.body.Doctor_charge,
    Day_in_hospital: req.body
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('Hospital')
    .replaceOne({ _id: userId }, Hospital);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};


const deleteHospital = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const userId = new ObjectId(req.params.id);
  
  try {
    const response = await mongodb.getDb().db().collection('Hospital').deleteOne({ _id: userId });

    if (response.deletedCount === 1) {
      res.status(200).send(); // Envía una respuesta vacía en caso de éxito (código 204).
    } else {
      res.status(404).json('Contact not found'); // Cambié el código de estado a 404 si no se encuentra el documento.
    }
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createHospital,
  updateHospital,
  deleteHospital
};