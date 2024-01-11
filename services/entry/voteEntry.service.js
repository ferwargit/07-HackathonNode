import getPool from '../../db/getPool.js';
import errors from '../../helpers/errors.helper.js';

const main = async (vote, user, entry) => {
  try {
    const pool = await getPool();

    const sqlQuery =
      'INSERT INTO entryvotes (value, userId, entryId) VALUES (?, ?, ?)';
    const values = [vote, user.id, entry.id];

    const [response] = await pool.query(sqlQuery, values);

    if (response.affectedRows !== 1) {
      errors.conflictError(
        'Error al insertar nuevo voto',
        'INSERT_ENTRYVOTES_ERROR'
      );
    }

    console.log(response);

    return response.insertId;
  } catch (error) {
    errors.internalServerError(error.message, 'DATA_INSERT_ERROR');
  }
};

export default main;
