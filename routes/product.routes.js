import express from 'express';

const router = express.Router();

router.get('/products', (req, res) => {
  res.send('Hola Mundo Products!');
});

export default router;
