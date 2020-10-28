const router = require('express').Router();
const { validationResult, check } = require('express-validator');
const AirDropList = require('../models/AirDropList');
const { web3 } = require('../utils/getWeb3');
const { DeadLine } = require('../constants');
const CURRENT_TRANCHE = require('../constants/tranches').CURRENT_TRANCHE;

require('dotenv').config();

router.post(
  '/',
  [
    check('address').not().isEmpty().trim().escape(),
    check('twitter').not().isEmpty().trim().escape(),
    check('following').not().isEmpty().trim().escape(),
    check('retweet').not().isEmpty().trim().escape(),
    check('telegram').not().isEmpty().trim().escape(),
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('invalid request');
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let now = Date.now();

      if (now > DeadLine) {
        console.log('Deadline exceeded');
        return res.status(400).json({ msg: 'Has expired for this airdrop' });
      }

      let { address, twitter, following, retweet, telegram } = req.body;

      if (!web3.utils.isAddress(address)) {
        console.log('invalid address');
        return res.status(400).json({ msg: 'Address is invalid' });
      }

      address = address.toLowerCase();

      let duplicateAddress = await AirDropList.findOne({ address: address });

      if (duplicateAddress) {
        console.log('Account already registered');
        return res.status(409).json({
          msg: 'Account already registered',
        });
      }

      let newAddress = new AirDropList({
        tranche: CURRENT_TRANCHE,
        address,
        twitter,
        following,
        retweet,
        telegram,
      });

      await newAddress.save();
      return res.status(200).json({ msg: 'Register Successfully' });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
);

module.exports = router;
