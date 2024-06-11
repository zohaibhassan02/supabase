import express from 'express';
import menu from '../controllers/menu.js';
import tokenValidation from '../middleware/tokenValidation.js';

const router = express.Router();

router.get('/generate-qr-code', tokenValidation, menu.generateQRCode);

export default router;
