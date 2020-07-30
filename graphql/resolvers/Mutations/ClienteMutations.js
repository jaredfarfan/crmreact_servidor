const {
  createClientesService,
  deleteClientesService,
  updateClientesService,
} = require("../../../services/clientes/index");

const clienteMutations = {
  async addCliente(_, { input }) {
    //console.log(input);
    const user = await createClientesService({ input });
    return user;
  },
  async updateCliente(_, { id, input }, ctx) {
    const updatedProduct = await updateClientesService({ id, input });
    return updatedProduct;
  },
  async deleteCliente(_, { id }, ctx) {
    console.log("id");
    console.log(id);
    const deletedProduct = await deleteClientesService({
      IdCollection: [id],
    });
    return deletedProduct;
  },
};

module.exports = clienteMutations;
