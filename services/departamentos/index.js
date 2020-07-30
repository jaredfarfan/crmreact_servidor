const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const getAllDepartamentosService = async () => {
  let getQuery = "SELECT * FROM departamentos u";
  const values = [];
  const search = "";
  const offset = 0;
  const limit = 5;
  if (search) {
    getQuery += ` WHERE u.name LIKE "%${search}%" `;
    // values.push(search);
  }

  if (limit && (offset || offset === 0)) {
    getQuery += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }

  const result = await readPool.query(getQuery, values);
  //console.log(humps.camelizeKeys(result[0]));
  return humps.camelizeKeys(result[0]);
};

const createDepartamentoService = async ({ input }) => {
  //console.log(input);
  const values = [];
  const { name, user_at, razon_social_id } = input;

  let getQuery = "SELECT u.name FROM departamentos u";
  getQuery += ` WHERE u.name LIKE "%${name}%" `;

  let resultFilter = await readPool.query(getQuery, values);
  resultFilter = humps.camelizeKeys(resultFilter[0]);
  //console.log(resultFilter.length);
  if (resultFilter.length > 0) {
    throw new Error("Ya hay un departamento registrado con ese nombre");
  }

  const result = await writePool.query(
    "INSERT INTO departamentos (name, user_at,razon_social_id) VALUES (?, ?,?)",
    [name, user_at, razon_social_id]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
    name,
    user_at,
    razon_social_id,
  };
};

const getResourceDetails = async ({ id }) => {
  const query = "SELECT * FROM departamentos WHERE id = ?";
  const result = await readPool.query(query, [id]);
  if (result.length) {
    return result[0][0];
  }
  return {};
};

const updateDepartamentosService = async ({ id, input }) => {
  let updateQuery = "UPDATE departamentos SET";
  const updates = [];
  const updateValues = [];

  const { name, user_at, razon_social_id } = input;

  if (name) {
    updates.push(" name = ? ");
    updateValues.push(name);
  }

  if (user_at) {
    updates.push(" user_at = ? ");
    updateValues.push(user_at);
  }
  if (razon_social_id) {
    updates.push(" razon_social_id = ? ");
    updateValues.push(razon_social_id);
  }

  updateQuery = `${updateQuery} ${updates.join()}  WHERE id = ?`;
  await writePool.query(updateQuery, [...updateValues, id]);
  const updatedDepartamento = await getResourceDetails({ id });
  return updatedDepartamento;
};

const deleteDepartamentosService = async ({ IdCollection }) => {
  if (!Array.isArray(IdCollection)) return;
  await writePool.query("delete from departamentos WHERE id IN (?)", [
    IdCollection,
  ]);
  return "Se eliminó correctamente";
};
module.exports = {
  getAllDepartamentosService,
  createDepartamentoService,
  updateDepartamentosService,
  deleteDepartamentosService,
};
