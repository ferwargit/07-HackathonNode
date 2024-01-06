import errors from './errors.helper.js';

const main = async (schema, body) => {
  try {
    await schema.validateAsync(body);
  } catch (error) {
    console.log(error);
    errors.schemaValidationError(error.details[0]?.message);
  }
};

export default main;
