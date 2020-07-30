const humps = require("humps");
const { writePool, readPool } = require("../../config/db");

const getAllReviewsService = async ({ search, limit, offset }) => {
  let getQuery = "SELECT * FROM product_reviews pr";
  const values = [];

  if (search) {
    getQuery += ` WHERE pr.title LIKE "%${search}%" `;
    // values.push(search);
  }

  if (limit && (offset || offset === 0)) {
    getQuery += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit, 10), parseInt(offset, 10));
  }

  const result = await readPool.query(getQuery, values);
  return humps.camelizeKeys(result[0]);
};

module.exports = { getAllReviewsService };
