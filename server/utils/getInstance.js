const { web3 } = require('./getWeb3');
const PhoneAirdrop = require('../contracts/PhoneAirdrop.json');
const PhoneToken = require('../contracts/PhoneToken.json');

require('dotenv').config();

const PhoneAirdropAddress = PhoneAirdrop.networks[process.env.NETWORK_ID].address;
const PhoneAirdropContract = new web3.eth.Contract(PhoneAirdrop.abi, PhoneAirdropAddress);

const PhoneTokenAddress = PhoneToken.networks[process.env.NETWORK_ID].address;
const PhoneTokenContract = new web3.eth.Contract(PhoneToken.abi, PhoneTokenAddress);

module.exports = {
  PhoneAirdropContract,
  PhoneAirdropAddress,
  PhoneTokenAddress,
  PhoneTokenContract,
};
