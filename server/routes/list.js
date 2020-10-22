const router = require('express').Router();
const { validationResult, check } = require('express-validator');
const AirDropList = require('../models/AirDropList');
require('dotenv').config();

router.get('/:trancheId', async (req, res) => {
  try {

    let result = await AirDropList.find({ tranche: req.params.trancheId });

    let list = [];

    for (let i = 0; i < result.length; i++) {
      list.push('' + result[i].address.toLowerCase());
    }

    return res.status(200).json({ airDropList: list });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
