import sendMail from '../../helpers/email.helper.js';

const main = async (email, registrationCode) => {
  const emailSubject = 'Registro de usuario';
  const emailBody = `
        <h1>Bienvenido</h1>
        Gracias por registrarte en Diario de Viajes. Para activar tu cuenta, haz clic en el siguiente enlace:

        <a href="http://localhost:8080/users/validate/${registrationCode}">Activar mi cuenta</a>
        `;
  const result = await sendMail(email, emailSubject, emailBody);
  return result;
};

export default main;
