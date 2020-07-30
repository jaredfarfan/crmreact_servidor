const { reviewsOfUsers } = require("../../services/users");

const reviews = async (user) => {
  console.log(user);
  const reviews = await reviewsOfUsers({ userId: user.id });
  return reviews;
};

module.exports = { reviews };
