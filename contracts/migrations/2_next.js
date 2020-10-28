const PhoneAirdrop = artifacts.require('./PhoneAirdrop.sol');

require('dotenv').config();

module.exports = async function (deployer) {
  const phoneAddress = process.env.PHONE_ADDRESS;
  await deployer.deploy(PhoneAirdrop, phoneAddress);
};
