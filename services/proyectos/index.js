const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const getAllProyectosService = async () => {
  let getQuery = "SELECT * FROM proyectos u";
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

const createProyectosService = async ({ input }) => {
  //console.log(input);
  const values = [];
  const {
    name,
    descripcion,
    monto_proyecto,
    cliente_id,
    divisa_id,
    razon_social_id,
    is_active,
    porcentaje_avance,
    url_archivo_proyecto,
    estatus,
    user_at,
  } = input;

  let getQuery = "SELECT u.name FROM proyectos u";
  getQuery += ` WHERE u.name LIKE "%${name}%" `;

  let resultFilter = await readPool.query(getQuery, values);
  resultFilter = humps.camelizeKeys(resultFilter[0]);
  //console.log(resultFilter.length);
  if (resultFilter.length > 0) {
    throw new Error("Ya hay un proyecto registrado con ese nombre");
  }
  const result = await writePool.query(
    "INSERT INTO proyectos (name,descripcion,monto_proyecto, cliente_id," +
      "divisa_id,razon_social_id,porcentaje_avance," +
      "url_archivo_proyecto,estatus,user_at) VALUES (?, ?,?,?,?,?,?,?,?,?)",
    [
      name,
      descripcion,
      monto_proyecto,
      cliente_id,
      divisa_id,
      razon_social_id,
      porcentaje_avance,
      url_archivo_proyecto,
      estatus,
      user_at,
    ]
  );

  //console.log(input.usuario);
  if (!result[0].affectedRows) {
    return {};
  }
  for (const usuario of input.usuario) {
    const { id } = usuario;
    inputPU = {
      proyectoid: result[0].insertId,
      usuarioid: id,
    };
    //instancia de producto

    createProyectoUsuarioService({ inputPU });
  }
  return {
    id: result[0].insertId,
    name,
    descripcion,
    monto_proyecto,
    cliente_id,
    divisa_id,
    razon_social_id,
    is_active,
    porcentaje_avance,
    url_archivo_proyecto,
    estatus,
    user_at,
  };
};

const createProyectoUsuarioService = async ({ inputPU }) => {
  console.log(inputPU);
  const values = [];
  const { proyectoid, usuarioid } = inputPU;

  const result = await writePool.query(
    "INSERT INTO usuario_proyectos (proyectoid, usuarioid) VALUES (?, ?)",
    [proyectoid, usuarioid]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
  };
};

const getResourceDetails = async ({ id }) => {
  const query = "SELECT * FROM proyectos WHERE id = ?";
  const result = await readPool.query(query, [id]);
  if (result.length) {
    return result[0][0];
  }
  return {};
};

const updateProyectosService = async ({ id, input }) => {
  let updateQuery = "UPDATE proyectos SET";
  const updates = [];
  const updateValues = [];

  const {
    name,
    descripcion,
    monto_proyecto,
    cliente_id,
    divisa_id,
    razon_social_id,
    is_active,
    porcentaje_avance,
    url_archivo_proyecto,
    estatus,
    user_at,
  } = input;

  if (name) {
    updates.push(" name = ? ");
    updateValues.push(name);
  }

  if (descripcion) {
    updates.push(" descripcion = ? ");
    updateValues.push(descripcion);
  }
  if (monto_proyecto) {
    updates.push(" monto_proyecto = ? ");
    updateValues.push(monto_proyecto);
  }
  if (cliente_id) {
    updates.push(" cliente_id = ? ");
    updateValues.push(cliente_id);
  }
  if (divisa_id) {
    updates.push(" divisa_id = ? ");
    updateValues.push(divisa_id);
  }
  if (razon_social_id) {
    updates.push(" razon_social_id = ? ");
    updateValues.push(razon_social_id);
  }
  if (is_active) {
    updates.push(" is_active = ? ");
    updateValues.push(is_active);
  }
  if (porcentaje_avance) {
    updates.push(" porcentaje_avance = ? ");
    updateValues.push(porcentaje_avance);
  }
  if (url_archivo_proyecto) {
    updates.push(" url_archivo_proyecto = ? ");
    updateValues.push(url_archivo_proyecto);
  }
  if (estatus) {
    updates.push(" estatus = ? ");
    updateValues.push(estatus);
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

const deleteProyectosService = async ({ IdCollection }) => {
  if (!Array.isArray(IdCollection)) return;
  await writePool.query("delete from proyectos WHERE id IN (?)", [
    IdCollection,
  ]);
  return "Se eliminó correctamente";
};
module.exports = {
  getAllProyectosService,
  createProyectosService,
  updateProyectosService,
  deleteProyectosService,
};
