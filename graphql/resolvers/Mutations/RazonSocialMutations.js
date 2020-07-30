const {
  createRazonesSocialesService,
  deleteRazonesSocialesService,
  updateRazonesSocialesService,
} = require("../../../services/razonesociales");

const razonsocialMutations = {
  async addRazonSocial(_, { input }) {
    //console.log(input);
    const user = await createRazonesSocialesService({ input });
    return user;
  },
  async updateRazonSocial(_, { id, input }, ctx) {
    const updatedProduct = await updateRazonesSocialesService({ id, input });
    return updatedProduct;
  },
  async deleteRazonSocial(_, { id }, ctx) {
    console.log("id");
    console.log(id);
    const deletedProduct = await deleteRazonesSocialesService({
      IdCollection: [id],
    });
    return deletedProduct;
  },
};

module.exports = razonsocialMutations;
