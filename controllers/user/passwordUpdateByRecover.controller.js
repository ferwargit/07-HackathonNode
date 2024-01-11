import bcrypt from 'bcrypt';
import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/passwordUpdateByRecover.schema.js';
import userService from '../../services/user/index.service.js';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
  try {
    // Validamos
    await validateSchema(schema, req.body);
    const { email, recoverPassCode, newPass } = req.body;

    // Buscamos el usuario
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

    // Si el usuario no tiene el código de recuperación
    if (!user.recoverPassCode) {
      errors.conflictError(
        'El usuario no solicitó una recuperación de contraseña.',
        'INVALID_RECOVER_PASS_ERROR'
      );
    }

    // Si el código de recuperación no coincide
    if (user.recoverPassCode !== recoverPassCode) {
      errors.notAuthorizedError(
        'El código de recuperación es incorrecto.',
        'RECOVER_PASS_CODE_ERROR'
      );
    }

    // Encriptamos el nuevo password
    user.password = await bcrypt.hash(newPass, 5);

    // Actualizamos el password del usuario
    await userService.passwordUpdate(user);

    // Enviamos la respuesta
    res.send({
      status: 'success',
      message: 'Contraseña actualizada con éxito',
    });
  } catch (error) {
    next(error);
  }
};

export default main;
