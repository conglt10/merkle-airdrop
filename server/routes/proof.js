const router = require('express').Router();
const TRANCHES = require('../constants/tranches').TRANCHES;
const AirDropList = require('../models/AirDropList');
const Merkle = require('../utils/merkle.module');
const { web3 } = require('../utils/getWeb3');

require('dotenv').config();

router.get('/:trancheId/:address', async (req, res) => {
  try {
    if (!web3.utils.isAddress(req.params.address)) {
      return res.status(400).json({ msg: 'Address is invalid' });
    }

    let address = req.params.address;
    address = address.toLowerCase();

    const info = await AirDropList.findOne({ tranche: req.params.trancheId, address });

    const { twitter, following, retweet, telegram } = info;

    if (!twitter || !following || !retweet || !telegram) {
      return res.status(400).json({ msg: 'You have not completed all step' });
    }

    let result = await AirDropList.find({ tranche: req.params.trancheId });

    let list = [];

    let defaultAmount = TRANCHES[req.params.trancheId];

    for (let i = 0; i < result.length; i++) {
      list.push([result[i].address, defaultAmount]);
    }

    let tranche = await Merkle.getTranche(...list);
    let tree = await Merkle.createTree(tranche);

    let proof = await Merkle.getAccountBalanceProof(tree.tree, address, defaultAmount);

    return res.status(200).json({ proof: proof });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
