const {s_login_user, s_register_user, s_isSurvey, s_update_complete_tasks, s_is_complete_tasks} = require('./service.js');

const c_login_user = async (req, res) => {
    const result = await s_login_user(req.body.userID, req.body.phoneNumber);
    res.json(result); // JSON of isAdmin, userID, phoneNumber
};

const c_register_user = async (req, res) => {
    const result = await s_register_user(req.body.userID, req.body.phoneNumber, req.body.startDate, req.body.protocolType);
    res.sendStatus(result.status);
};

const c_isSurvey = async (req,res) => {
    const result = await s_isSurvey(req.params.userID);
    res.json(result); //JSON of isSurvey 
}

const c_update_Complete_Tasks = async (req, res) => {
    const result = await s_update_complete_tasks(req.params.userID);
    res.sendStatus(result.status);
}

const c_is_complete_tasks = async (req, res) => {
    const result = await s_is_complete_tasks(req.params.userID);
    console.log(result);
    res.json(result);
}

const status = (req, res) => {
    res.status(200).json({ status: 'ok' });
  };

module.exports = {c_login_user, c_register_user, c_isSurvey, c_update_Complete_Tasks, c_is_complete_tasks, status};
