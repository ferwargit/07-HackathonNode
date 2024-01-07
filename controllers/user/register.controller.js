import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/register.schema.js';
import userService from '../../services/user/index.service.js';

const main = async (req, res, next) => {
  try {
    // Recibo la información y la valido
    await validateSchema(schema, req.body);
    // La desestructuro
    const { username, password, email } = req.body;
    // Random string
    const registrationCode = randomstring.generate(30);
    // Encripto la contraseña
    const passwordEncoded = await bcrypt.hash(password, 5);
    // Llamo al servicio
    await userService.register(
      username,
      passwordEncoded,
      email,
      registrationCode
    );

    res.send({
      status: 'success',
      message: 'Usuario registrado con exito',
    });
  } catch (error) {
    next(error);
  }
};

export default main;
