const userMutations = require("./UserMutations");
const departamentoMutations = require("./DepartamentoMutations");
const clienteMutations = require("./ClienteMutations");
const razonsocialMutations = require("./RazonSocialMutations");
const proyectoMutations = require("./ProyectoMutations");

//const ItemMutatios = { ...userMutations, DepartamentoMutations };
module.exports = {
  ...userMutations,
  ...departamentoMutations,
  ...clienteMutations,
  ...razonsocialMutations,
  ...proyectoMutations,
};
