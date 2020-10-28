const BN = require('bn.js');
// tranche and default amount claim for user
module.exports.TRANCHES = {
  0: new BN('10000000000000000000'),
  1: new BN('20000000000000000000'),
  2: new BN('30000000000000000000'),
};

module.exports.AMOUNT_TRANCHES = {
  0: '10000000000000000000',
  1: '20000000000000000000',
  2: '30000000000000000000',
};

module.exports.CURRENT_TRANCHE = '0';
