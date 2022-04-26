// const express = require('express');
// const dailyController = require('../controllers/dailyController');
// const router = express.Router();

// //getting all entries
// router.get('/', 
//   dailyController.getEntries,
//   (req, res) => res.status(200).json(res.locals.entries)
// );

// //getting one entry
// router.get('/:id', 
// )

// router.post('/', 
//    dailyController.addEntry,
//    (req,res) => res.status(200).json(res.locals.entry)
//  );

// //deleting entry
//  router.delete('/:id', 
//    dailyController.deleteEntry,
//    (req, res) => res.status(200).json(res.locals.entry)
//  )


// module.exports = router;

// // const mongoose = require('mongoose');
// // const models = require('../models/entries.js')
// // const express = require('express');
// // //const dailyController = require('../controllers/dailyController');
// // const router = express.Router();

// // //getting all entries
// // router.get('/', (req, res) => {
// //   const { answer } = req.body;

// //    models.create({
// //     answer
// //   })
// //   .then(entryDoc => {
// //     res.locals.entry = entryDoc;
// //   })
// //   .catch(err => {
// //     next({
// //       log: `dailyController.addEntry: ERROR: ${err}`,
// //       message: { err: 'Error occured in dailyController.addEntry. Check server logs for more details.'}
// //     })
// //   })
// //   return res.status(200).json(res.locals.entries)
// //   }
// // );

// // //getting one entry
// // router.get('/:id', 
// // )


// // router.post('/', (req,res) => {
// //   const { answer } = req.body;
// //   //console.log(answer)
// //   models.create({
// //     answer
// //   })
// //   .then(entryDoc => {
// //     res.locals.entry = entryDoc;
// //     console.log(res.locals.entry)
// //   })
// //   .send(data)
// //   .catch(err => console.log(err))
// // }
// //  );

// // //deleting entry
// // router.delete('/:id', (req, res) => res.status(200).json(res.locals.entry)
// // )
// // module.exports = router;