const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const getAllRazonesSocialesService = async () => {
  let getQuery = "SELECT * FROM razones_sociales u";
  const values = [];
  const search = "";
  const offset = 0;
  const limit = 5;
  if (search) {
    getQuery += ` WHERE u.nombre LIKE "%${search}%" `;
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

const createRazonesSocialesService = async ({ input }) => {
  //console.log(input);
  const values = [];
  const {
    nombre,
    rfc,
    direccion,
    cp,
    telefono_uno,
    telefono_dos,
    user_at,
  } = input;

  let getQuery = "SELECT u.rfc FROM razones_sociales u";
  getQuery += ` WHERE u.rfc LIKE "%${rfc}%" `;

  let resultFilter = await readPool.query(getQuery, values);
  resultFilter = humps.camelizeKeys(resultFilter[0]);
  //console.log(resultFilter.length);
  if (resultFilter.length > 0) {
    throw new Error("Ya hay una razón social registrado con ese RFC");
  }

  const result = await writePool.query(
    "INSERT INTO razones_sociales (nombre, rfc,direccion,cp,telefono_uno,telefono_dos,user_at) " +
      "VALUES (?, ?,?,?,?,?,?)",
    [nombre, rfc, direccion, cp, telefono_uno, telefono_dos, user_at]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
    nombre,
    rfc,
    direccion,
    cp,
    telefono_uno,
    telefono_dos,
    user_at,
  };
};

const getResourceDetails = async ({ id }) => {
  const query = "SELECT * FROM razones_sociales WHERE id = ?";
  const result = await readPool.query(query, [id]);
  if (result.length) {
    return result[0][0];
  }
  return {};
};

const updateRazonesSocialesService = async ({ id, input }) => {
  let updateQuery = "UPDATE razones_sociales SET";
  const updates = [];
  const updateValues = [];

  const {
    nombre,
    rfc,
    direccion,
    cp,
    telefono_uno,
    telefono_dos,
    user_at,
  } = input;

  if (nombre) {
    updates.push(" nombre = ? ");
    updateValues.push(nombre);
  }

  if (rfc) {
    updates.push(" rfc = ? ");
    updateValues.push(rfc);
  }
  if (direccion) {
    updates.push(" direccion = ? ");
    updateValues.push(direccion);
  }
  if (cp) {
    updates.push(" cp = ? ");
    updateValues.push(cp);
  }
  if (telefono_uno) {
    updates.push(" telefono_uno = ? ");
    updateValues.push(telefono_uno);
  }
  if (telefono_dos) {
    updates.push(" telefono_dos = ? ");
    updateValues.push(telefono_dos);
  }

  if (user_at) {
    updates.push(" user_at = ? ");
    updateValues.push(user_at);
  }

  updateQuery = `${updateQuery} ${updates.join()}  WHERE id = ?`;
  await writePool.query(updateQuery, [...updateValues, id]);
  const updatedDepartamento = await getResourceDetails({ id });
  return updatedDepartamento;
};

const deleteRazonesSocialesService = async ({ IdCollection }) => {
  if (!Array.isArray(IdCollection)) return;
  await writePool.query("delete from razones_sociales WHERE id IN (?)", [
    IdCollection,
  ]);
  return "Se eliminó correctamente";
};
module.exports = {
  getAllRazonesSocialesService,
  createRazonesSocialesService,
  updateRazonesSocialesService,
  deleteRazonesSocialesService,
};
