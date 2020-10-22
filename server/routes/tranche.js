const router = require('express').Router();
const TRANCHE = require('../constants/tranches');

router.get('/', async (req, res) => {
  try {
    const currentTranche = TRANCHE.CURRENT_TRANCHE;
    const amount = TRANCHE.AMOUNT_TRANCHES[currentTranche];

    return res.status(200).json({ amount });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
