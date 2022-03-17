// const db = require('../models/entries')
const mongoose = require('mongoose');
const models = require('../models/entries.js')

const dailyController = {};

dailyController.getEntries = (req, res, next) => {
    models.find({})
    .then(entryDocs => {
        res.locals.entries = entryDocs;
        console.log(entryDocs)
        next();
    })
    .catch(err => {
        next({
            log: `dailyController.getEntry: ERROR: ${err}`,
            message: {err: 'Error occured in dailyController.getEntry. Check server logs for more details.'}
      })
    })
};

dailyController.addEntry = (req, res, next) => {
  const { answer } = req.body;

   models.create({
    answer
  })
  .then(entryDoc => {
    res.locals.entry = entryDoc;
    next();
  })
  .catch(err => {
    next({
      log: `dailyController.addEntry: ERROR: ${err}`,
      message: { err: 'Error occured in dailyController.addEntry. Check server logs for more details.'}
    })
  })
}

dailyController.deleteEntry = (req, res, next) => {
  const { answer } = req.body;

  models.deleteOne({
    answer
  })
}
module.exports = dailyController;