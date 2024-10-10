const express = require('express');
const router = express.Router();

const {c_login_user, c_register_user, c_isSurvey, c_update_Complete_Tasks, c_is_complete_tasks} = require('./controller.js');

router.route('/login').post(c_login_user);
router.route('/register').post(c_register_user);
router.route('/tasks/:userID').get(c_isSurvey);
router.route(`/completeTasks/:userID`).put(c_update_Complete_Tasks);
router.route(`/completeTasks/:userID`).get(c_is_complete_tasks);


module.exports = router;