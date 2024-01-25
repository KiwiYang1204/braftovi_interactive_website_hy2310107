const Record = require("../models/record");

const getRecords = async (req, res) => {
  
  try {
    const result = await Record.find()
      .sort({ score: -1, createdAt: -1 })
      .populate('user')
      .exec();

    let rank = 1;
    let temp = result.map((data, i) => {
      if (i === 0) {
        return { _id: data._id, rank: rank, user: { _id: data.user._id, username: data.user.username }, score: data.score };
      } else {
        if (data.score < result[i - 1].score) {
          rank += 1;
          return { _id: data._id, user: { _id: data.user._id, username: data.user.username }, score: data.score, rank: rank };
        } else {
          return { _id: data._id, user: { _id: data.user._id, username: data.user.username }, score: data.score, rank: rank };
        }
      }
    });

    // console.log(temp);
    // console.log(result);
    return res.status(200).send({
      success: true,
      result: temp
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