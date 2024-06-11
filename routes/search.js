import express from 'express';
import search from '../controllers/search.js';
import tokenValidation from '../middleware/tokenValidation.js';

const router = express.Router();

router.post('/search', tokenValidation, search.searchItems);

export default router;
