const Mutation = require("./Mutations");
const Query = require("./Query");
const User = require("./User");

const resolvers = {
  Query,
  Mutation,
  //User,
};

module.exports = resolvers;
