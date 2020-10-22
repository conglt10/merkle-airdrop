const BN = require('bn.js');
// tranche and default amount claim for user
module.exports.TRANCHES = {
  0: new BN('100000000000000000000'),
  1: new BN('200000000000000000000'),
  2: new BN('300000000000000000000'),
};

module.exports.AMOUNT_TRANCHES = {
  0: '100000000000000000000',
  1: '200000000000000000000',
  2: '300000000000000000000',
};

module.exports.CURRENT_TRANCHE = '0';
