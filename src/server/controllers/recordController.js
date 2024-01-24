const Record = require("../models/record");

const getRecords = async (req, res) => {
  
  try {
    const result = await Record.find()
      .sort({ score: -1, createdAt: -1 })
      .populate('user')
      .exec();

    return res.status(200).send({
      success: true,
      result
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      result: e.message
    });
  }
};

const createRecord = (req, res) => {
  try {
    const record = new Record({
      user: req.body.id,
      score: req.body.score,
      createdAt: new Date()
    });

    record.save()
      .then(result => {
        return res.status(200).send({
          success: true,
          result
        });
      });
  } catch (e) {
    return res.status(500).send({
      success: false,
      result: e.message
    });
  }
};

module.exports = {
  getRecords,
  createRecord
};