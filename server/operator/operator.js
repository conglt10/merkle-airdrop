const Merkle = require('../utils/merkle.module');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  error => {
    if (error) console.log(error);
  }
);

mongoose.set('useCreateIndex', true);

const AirDropList = require('../models/AirDropList');

const { CURRENT_TRANCHE, TRANCHES } = require('../constants/tranches');

const { web3 } = require('../utils/getWeb3');
const {
  PhoneAirdropContract,
  PhoneAirdropAddress,
  PhoneTokenContract,
} = require('../utils/getInstance');

const operator = web3.eth.accounts.privateKeyToAccount(process.env.OPERATOR_PRIVATE_KEY);
web3.eth.accounts.wallet.add(operator);

async function seedNewAllocations() {
  try {
    console.log('Pending ...');
    let defaultAmount = TRANCHES[CURRENT_TRANCHE];

    let result = await AirDropList.find({ tranche: CURRENT_TRANCHE });
    let list = [];

    let totalAmount = result.length * defaultAmount;

    for (let i = 0; i < result.length; i++) {
      list.push([result[i].address, defaultAmount]);
    }

    let tranche = await Merkle.getTranche(...list);

    let tree = await Merkle.createTree(tranche);

    let treeRoot = Merkle.root(tree.tree.layers);

    let merkleRoot = Merkle.hexRoot(treeRoot);

    await PhoneTokenContract.methods
      .mint(operator.address, totalAmount.toString())
      .send({ from: operator.address, gas: process.env.ETH_GAS_LIMIT });

    await PhoneTokenContract.methods
      .approve(PhoneAirdropAddress, totalAmount.toString())
      .send({ from: operator.address, gas: process.env.ETH_GAS_LIMIT });
    await PhoneAirdropContract.methods.seedNewAllocations(merkleRoot, totalAmount.toString()).send({
      from: operator.address,
      gas: process.env.ETH_GAS_LIMIT,
    });
    console.log('Done !');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seedNewAllocations(); // call with each tranche
