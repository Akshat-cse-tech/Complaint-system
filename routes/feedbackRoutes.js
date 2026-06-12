const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  submitFeedback, getFeedback, getMyFeedback, getStats
} = require('../controllers/feedbackController');

router.post('/',        auth, submitFeedback);
router.get('/',         auth, getFeedback);
router.get('/my',       auth, getMyFeedback);
router.get('/stats',    auth, getStats);

module.exports = router;
