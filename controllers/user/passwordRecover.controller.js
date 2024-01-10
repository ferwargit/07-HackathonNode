import randomstring from 'randomstring';
import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/passwordRecover.schema.js';
import userService from '../../services/user/index.service.js';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
  try {
    // Validacion
    await validateSchema(schema, req.body);

    // Obtenemos el usuario por el email
    const { email } = req.body;
    const users = await userService.getByUsernameOrEmail('', email);

    // Si no existe el usuario
    if (users.length === 0) {
      errors.notFoundError('Usuario no encontrado', 'USER_NOT_FOUND');
    }

    // Si existen más de un usuario
    if (users.length > 1) {
      errors.conflictError(
        'Por alguna razón existen más de un usuario',
        'MANY_USERS_ERROR'
      );
    }

    // Si existe el usuario
    const user = users[0];
    // Generamos el recoverPassCode
    const recoverPassCode = randomstring.generate(10);
    // Actualizamos el recoverPassCode
    await userService.updateRecoverPassCode(user, recoverPassCode);
    // Enviamos el email
    await userService.passwordRecoverSendMail(user.email, recoverPassCode);

    // Respuesta
    res.send({
      status: 'success',
      message: 'RecoverPassCode enviado con éxito',
    });
  } catch (error) {
    next(error);
  }
};

export default main;
