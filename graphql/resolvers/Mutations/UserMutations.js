const {
  createUsersService,
  autenticarUsersService,
} = require("../../../services/users/index");

const userMutations = {
  async addUser(_, { input }) {
    //console.log(input);
    const user = await createUsersService({ input });
    return user;
  },
  async autenticarUsuario(_, { input }) {
    const token = await autenticarUsersService({ input });
    return token;
  },
};

module.exports = userMutations;
