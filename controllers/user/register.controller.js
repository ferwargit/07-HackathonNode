import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/register.schema.js';

const main = async (req, res, next) => {
  try {
    // Recibo la información y la valido
    await validateSchema(schema, req.body);
    // La desestructuro
    const { email, username, password } = req.body;
  } catch (error) {
    next(error);
  }
};
