const PhoneToken = artifacts.require('./PhoneToken.sol');
const PhoneAirdrop = artifacts.require('./PhoneAirdrop.sol');

require('dotenv').config();

module.exports = async function (deployer) {
  await deployer.deploy(PhoneToken);
  await deployer.deploy(PhoneAirdrop, PhoneToken.address);
};
