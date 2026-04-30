import { Router } from 'express';
import { dashboard, login } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = Router();
router.post('/login', login);
router.get('/dashboard', verifyAdmin, dashboard);

export default router;
