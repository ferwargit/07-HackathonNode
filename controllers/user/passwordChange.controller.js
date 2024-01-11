import bcrypt from 'bcrypt';
import validateSchema from '../../helpers/validate.helper.js';
import schema from '../../schemas/user/passwordChange.schema.js';
import userService from '../../services/user/index.service.js';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
  try {
    //Validamos
    await validateSchema(schema, req.body);
    const { oldPass, newPass } = req.body;
    const user = req.user;

    // Comparamos la contraseña actual con la que nos envía el usuario
    const validPassword = await bcrypt.compare(oldPass, user.password);

    // Si no coincide, lanzamos un error
    if (!validPassword) {
      errors.notAuthorizedError(
        'Credenciales incorrectas',
        'INVALID_CREDENTIALS'
      );
    }

    // Si coincide, actualizamos la contraseña
    user.password = await bcrypt.hash(newPass, 5);
    // Guardamos el usuario con la contraseña actualizada
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
