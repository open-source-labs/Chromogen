
// const mongoose = require('mongoose');
// const models = require('../models/entries.js')

// const dailyController = {};

// dailyController.getEntries = (req, res, next) => {
//     models.find({})
//     .then(entryDocs => {
//         res.locals.entries = entryDocs;
//         next();
//     })
//     .catch(err => {
//         next({
//             log: `dailyController.getEntry: ERROR: ${err}`,
//             message: {err: 'Error occured in dailyController.getEntry. Check server logs for more details.'}
//       })
//     })
// };

// dailyController.addEntry = (req, res, next) => {
//   const { answer } = req.body;

//    models.create({
//     answer
//   })
//   .then(entryDoc => {
//     res.locals.entry = entryDoc;
//     next();
//   })
//   .catch(err => {
//     next({
//       log: `dailyController.addEntry: ERROR: ${err}`,
//       message: { err: 'Error occured in dailyController.addEntry. Check server logs for more details.'}
//     })
//   })
// }

// dailyController.deleteEntry = (req, res, next) => {
//   const id = req.params.id;
//   models.findOneAndDelete({answer: id})
//   .then(deleteDoc => {
//     res.locals.delete = deleteDoc;
//     next();
//   })
//   .catch(err => {
//     next({
//       log: `dailyController.deleteEntry: ERROR: ${err}`,
//       message: { err: 'Error occured in dailyController.deleteEntry. Check server logs for more details.'}
//     })
//   })
// }
// module.exports = dailyController;