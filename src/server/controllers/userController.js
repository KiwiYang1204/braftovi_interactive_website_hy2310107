const User = require('../models/user');

const addUser = (req, res) => {
  const username = req.body.username;

  const user = new User({ username });

  user.save()
    .then((result) => {
      return res.status(200).send({
        success: true,
        id: result._id
      });
    });  
};

// const updateUserScore = async (req, res) => {
//   const id = req.body.id;
//   const score = req.body.score;

//   const filter = {
//     _id: id
//   };
  
//   try {
//     await User.findOneAndUpdate(filter, { score });
//     return res.status(200).send({
//       success: true
//     });
//   } catch (e) {
//     return res.status(500).send({
//       success: false,
//       result: e.message
//     });
//   }
// };

const getUsers = async (req, res) => {
  try {
    const result = await User.find({ score: { $exists: true } })
      .sort({ score: -1 })
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

module.exports = {
  addUser,
  // updateUserScore,
  getUsers
};