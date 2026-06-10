const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAll, create, updateStatus, remove, getStats
} = require('../controllers/complaintController');

router.get('/',         auth, getAll);
router.get('/stats',    auth, getStats);
router.post('/',        auth, create);
router.put('/:id',      auth, updateStatus);
router.delete('/:id',   auth, remove);

module.exports = router;