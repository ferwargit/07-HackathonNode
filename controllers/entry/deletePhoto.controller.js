import entryService from '../../services/entry/index.service.js';
import fileService from '../../services/files/index.service.js';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
  try {
    // Comprobamos que la foto exista y que pertenezca a la entrada
    const photos = await entryService.getPhotoById(req.params.photoId);
    // Si no existe la foto, lanzamos un error
    if (photos.length === 0) {
      errors.notFoundError('Foto no encontrada', 'PHOTO_NOT_FOUND');
    }
    // Si la foto no pertenece a la entrada, lanzamos un error
    if (photos[0].entryId !== req.entry.id) {
      errors.forbiddenError(
        'No tienes permisos para eliminar esta foto',
        'FORBIDDEN_DELETE_PHOTO'
      );
    }
    // Eliminamos la foto
    await fileService.deleteFile(photos[0].name);
    // Eliminamos la referencia de la foto en la base de datos
    await entryService.deletePhoto(photos[0]);
    // Devolvemos la <respuesta></respuesta>
    res.send({
      status: 'success',
      message: 'Foto eliminada con éxito',
    });
  } catch (error) {
    next(error);
  }
};

export default main;
