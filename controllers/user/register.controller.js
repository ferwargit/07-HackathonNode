import randomstring from 'randomstring';
import bcrypt from 'bcrypt';
import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/register.schema.js';
import userService from '../../services/user/index.service.js';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
  try {
    // Recibo la información y la valido
    await validateSchema(schema, req.body);
    // La desestructuro
    const { username, password, email } = req.body;
    // Random string
    const registrationCode = randomstring.generate(30);
    // Llamo al servicio getByUsernameOrEmail para
    // comprobar que no exista un usuario con el mismo
    // username o email
    const users = await userService.getByUsernameOrEmail(username, email);
    if (users.length > 0) {
      errors.conflictError(
        'El username o email ya se encuentra registrado',
        'USER_REGISTER_ERROR'
      );
    }
    // Encripto la contraseña
    const passwordEncoded = await bcrypt.hash(password, 5);
    // Llamo al servicio para registrar el usuario
    await userService.register(
      username,
      passwordEncoded,
      email,
      registrationCode
    );
    // Llamo al servicio para enviar el email
    await userService.registerSendEmail(email, registrationCode);

    res.send({
      status: 'success',
      message: 'Usuario registrado con exito',
    });
  } catch (error) {
    next(error);
  }
};

export default main;
