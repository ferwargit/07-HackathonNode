import errors from './errors.helper.js';

const main = async (schema, body) => {
  try {
    await schema.validateAsync(body);
  } catch (error) {
    console.log(error);
    errors.schemaValidationError();
  }
};

export default main;
