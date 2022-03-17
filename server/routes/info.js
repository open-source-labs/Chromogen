const express = require('express');
const dailyController = require('../controllers/dailyController');
const router = express.Router();

//getting all entries
router.get('/', 
  dailyController.getEntries,
  (req, res) => res.status(200).json(res.locals.entries)
);

//getting one entry
router.get('/:id', 
//   dailyController.getEntry,
//   (req, res) => {
//     return res.status(200).send(res.locals.entry)
//   }
)


router.post('/', 
   dailyController.addEntry,
   (req,res) => res.status(200).json(res.locals.entry)
     //console.log('endpoint test')
 );

//deleting entry
router.delete('/:id', 
  dailyController.deleteEntry,
  (req, res) => res.status(200).json(res.locals.entry)
)
module.exports = router;