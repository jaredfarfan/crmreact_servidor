const { getAllUsersService } = require("../../services/users");
const { getAllReviewsService } = require("../../services/reviews");
const { getAllDepartamentosService } = require("../../services/departamentos");
const { getAllClientesService } = require("../../services/clientes");
const {
  getAllRazonesSocialesService,
} = require("../../services/razonesociales");
const { getAllProyectosService } = require("../../services/proyectos");

const users = async (_, { limit, offset, name }, ctx) => {
  const listOfUsers = await getAllUsersService({ limit, offset, search: name });
  return listOfUsers;
};

const reviews = async (_, { limit, offset }) => {
  const listOfReviews = await getAllReviewsService({ limit, offset });
  return listOfReviews;
};

const obtenerUsuario = async (_, {}, ctx) => {
  console.log("ctx.usuario");
  console.log(ctx.usuario);
  return ctx.usuario;
};

const departamentos = async (_, { limit, offset, name }, ctx) => {
  const listofDepartamento = await getAllDepartamentosService({
    limit,
    offset,
  });
  return listofDepartamento;
};

const clientes = async (_, { limit, offset, name }, ctx) => {
  const listClientes = await getAllClientesService({
    limit,
    offset,
  });
  return listClientes;
};

const razonessociales = async (_, { limit, offset, name }, ctx) => {
  const listItems = await getAllRazonesSocialesService({
    limit,
    offset,
  });
  return listItems;
};

const proyectos = async (_, { limit, offset, name }, ctx) => {
  const listItems = await getAllProyectosService({
    limit,
    offset,
  });
  return listItems;
};

module.exports = {
  users,
  reviews,
  obtenerUsuario,
  departamentos,
  clientes,
  razonessociales,
  proyectos,
};
