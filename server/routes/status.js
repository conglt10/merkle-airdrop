const router = require('express').Router();
const { validationResult, check } = require('express-validator');
const AirDropList = require('../models/AirDropList');
const CURRENT_TRANCHE = require('../constants/tranches').CURRENT_TRANCHE;
const { web3 } = require('../utils/getWeb3');
require('dotenv').config();

router.get('/:address', async (req, res) => {
  try {
    let address = req.params.address;
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ msg: 'Address is invalid' });
    }

    const result = await AirDropList.findOne({ tranche: CURRENT_TRANCHE, address });

    if (!result) {
      return res.status(404).json({ msg: 'Address is not registered' });
    }

    const { twitter, following, retweet, telegram } = result;

    return res.status(200).json({
      twitter,
      following,
      retweet,
      telegram,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

router.get('/tele/:username', async (req, res) => {
  try {
    let username = req.params.username;
    const result = await AirDropList.findOne({ tranche: CURRENT_TRANCHE, telegram: username });

    if (!result) {
      return res.status(404).json({ msg: 'telegram user is not registered' });
    }

    const { twitter, following, retweet, telegram } = result;

    return res.status(200).json({
      twitter,
      following,
      retweet,
      telegram,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
