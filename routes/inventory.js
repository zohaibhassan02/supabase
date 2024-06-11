import express from 'express';
import inventory from '../controllers/inventory.js';
import tokenValidation from '../middleware/tokenValidation.js';

const router = express.Router();

router.post('/add', tokenValidation, inventory.addItem);
router.get('/list/:user_id', tokenValidation, inventory.getItems);
router.put('/update', tokenValidation, inventory.updateItem);
router.delete('/delete', tokenValidation, inventory.deleteItem);

export default router;
