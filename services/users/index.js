const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crearToken = (usuario, secreta, expiresIn) => {
  // console.log(usuario);
  const { id, email, name, city } = usuario;
  //payload=informacion que se agregara a la cabezera del webtoken
  return jwt.sign({ id, email, name, city }, secreta, { expiresIn });
};

const getAllUsersService = async () => {
  let getQuery = "SELECT * FROM users u";
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
  return humps.camelizeKeys(result[0]);
};

const createUsersService = async ({ input }) => {
  //console.log(input);
  const values = [];
  const {
    name,
    email,
    city,
    image_url,
    contrasenia,
    user_at,
    departamento_id,
  } = input;

  let getQuery = "SELECT * FROM users u";
  getQuery += ` WHERE u.email LIKE "%${email}%" `;

  let resultFilter = await readPool.query(getQuery, values);
  resultFilter = humps.camelizeKeys(resultFilter[0]);
  //console.log(resultFilter.length);
  if (resultFilter.length > 0) {
    throw new Error("Ya hay un usuario registrado con ese email");
  }

  const salt = await bcryptjs.genSalt(10);
  let newcontrasenia = await bcryptjs.hash(contrasenia, salt);
  const result = await writePool.query(
    "INSERT INTO users (name, email,image_url ,city,user_at,contrasenia,departamento_id) VALUES (?, ?, ?, ?,?,?,?)",
    [name, email, city, image_url, newcontrasenia, user_at, departamento_id]
  );
  if (!result[0].affectedRows) {
    return {};
  }
  return {
    id: result[0].insertId,
    name,
    email,
    city,
    image_url,
  };
};

const autenticarUsersService = async ({ input }) => {
  const { email, contrasenia } = input;
  const values = [];
  //validar si existe el usuario
  let getQuery = "SELECT * FROM users u";
  getQuery += ` WHERE u.email LIKE "%${email}%" `;

  let result = await readPool.query(getQuery, values);
  result = humps.camelizeKeys(result[0]);

  console.log("result");
  console.log(result[0]);
  if (result.length <= 0) {
    throw new Error("El usuario no existe");
  }
  console.log(contrasenia);
  const passwordCorrecto = await bcryptjs.compare(
    contrasenia,
    result[0].contrasenia
  );
  if (!passwordCorrecto) {
    throw new Error("El Password es Incorrecto");
  }

  return {
    token: crearToken(result[0], process.env.SECRETA, "8h"),
  };
};

const reviewsOfUsers = async ({ userId, limit, offset }) => {
  let query = "SELECT * FROM product_reviews WHERE user_id =? ";
  const values = [userId];

  if (limit && (offset || offset === 0)) {
    query += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }
  const result = await readPool.query(query, values);
  return humps.camelizeKeys(result[0]);
};

module.exports = {
  getAllUsersService,
  createUsersService,
  reviewsOfUsers,
  autenticarUsersService,
};
