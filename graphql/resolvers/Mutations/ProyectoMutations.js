const {
  createProyectosService,
  deleteProyectosService,
  updateProyectosService,
} = require("../../../services/proyectos");

const proyectoMutations = {
  async addProyecto(_, { input }) {
    //console.log(input);
    const user = await createProyectosService({ input });
    return user;
  },
  async updateProyecto(_, { id, input }, ctx) {
    const updatedProduct = await updateProyectosService({ id, input });
    return updatedProduct;
  },
  async deleteProyecto(_, { id }, ctx) {
    console.log("id");
    console.log(id);
    const deletedProduct = await deleteProyectosService({
      IdCollection: [id],
    });
    return deletedProduct;
  },
};

module.exports = proyectoMutations;
