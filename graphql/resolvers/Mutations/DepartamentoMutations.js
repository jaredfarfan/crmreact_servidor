const {
  createDepartamentoService,
  deleteDepartamentosService,
  updateDepartamentosService,
} = require("../../../services/departamentos/index");

const departamentoMutations = {
  async addDepartamento(_, { input }) {
    //console.log(input);
    const user = await createDepartamentoService({ input });
    return user;
  },
  async updateDepartamento(_, { id, input }, ctx) {
    const updatedProduct = await updateDepartamentosService({ id, input });
    return updatedProduct;
  },
  async deleteDepartamento(_, { id }, ctx) {
    console.log("id");
    console.log(id);
    const deletedProduct = await deleteDepartamentosService({
      IdCollection: [id],
    });
    return deletedProduct;
  },
};

module.exports = departamentoMutations;
