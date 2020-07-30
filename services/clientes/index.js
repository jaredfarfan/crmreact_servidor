const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const getAllClientesService = async () => {
  let getQuery = "SELECT * FROM clientes u";
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

const createClientesService = async ({ input }) => {
  //console.log(input);
  const values = [];
  const {
    name,
    image_url,
    city,
    contacto_principal,
    tel_contacto_principal,
    contacto_secundario,
    tel_contacto_secundario,
    is_active,
    user_at,
  } = input;

  let getQuery = "SELECT u.name FROM clientes u";
  getQuery += ` WHERE u.name LIKE "%${name}%" `;

  let resultFilter = await readPool.query(getQuery, values);
  resultFilter = humps.camelizeKeys(resultFilter[0]);
  //console.log(resultFilter.length);
  if (resultFilter.length > 0) {
    throw new Error("Ya hay un cliente registrado con ese nombre");
  }

  const result = await writePool.query(
    "INSERT INTO clientes (name, image_url,city,contacto_principal,tel_contacto_principal," +
      "contacto_secundario,tel_contacto_secundario,is_active,user_at) VALUES (?, ?,?,?,?,?,?,?,?)",
    [
      name,
      image_url,
      city,
      contacto_principal,
      tel_contacto_principal,
      contacto_secundario,
      tel_contacto_secundario,
      is_active,
      user_at,
    ]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
    name,
    image_url,
    city,
    contacto_principal,
    tel_contacto_principal,
    contacto_secundario,
    tel_contacto_secundario,
    is_active,
    user_at,
  };
};

const getResourceDetails = async ({ id }) => {
  const query = "SELECT * FROM clientes WHERE id = ?";
  const result = await readPool.query(query, [id]);
  if (result.length) {
    return result[0][0];
  }
  return {};
};

const updateClientesService = async ({ id, input }) => {
  let updateQuery = "UPDATE clientes SET";
  const updates = [];
  const updateValues = [];

  const {
    name,
    image_url,
    city,
    contacto_principal,
    tel_contacto_principal,
    contacto_secundario,
    tel_contacto_secundario,
    is_active,
    user_at,
  } = input;

  if (name) {
    updates.push(" name = ? ");
    updateValues.push(name);
  }
  if (image_url) {
    updates.push(" image_url = ? ");
    updateValues.push(image_url);
  }
  if (city) {
    updates.push(" city = ? ");
    updateValues.push(city);
  }
  if (contacto_principal) {
    updates.push(" contacto_principal = ? ");
    updateValues.push(contacto_principal);
  }
  if (tel_contacto_principal) {
    updates.push(" tel_contacto_principal = ? ");
    updateValues.push(tel_contacto_principal);
  }
  if (contacto_secundario) {
    updates.push(" contacto_secundario = ? ");
    updateValues.push(contacto_secundario);
  }
  if (tel_contacto_secundario) {
    updates.push(" tel_contacto_secundario = ? ");
    updateValues.push(tel_contacto_secundario);
  }
  if (is_active) {
    updates.push(" is_active = ? ");
    updateValues.push(is_active);
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

const deleteClientesService = async ({ IdCollection }) => {
  if (!Array.isArray(IdCollection)) return;
  await writePool.query("delete from clientes WHERE id IN (?)", [IdCollection]);
  return "Se eliminó correctamente";
};
module.exports = {
  getAllClientesService,
  createClientesService,
  updateClientesService,
  deleteClientesService,
};
