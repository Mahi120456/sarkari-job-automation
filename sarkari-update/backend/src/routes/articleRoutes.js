import { Router } from 'express';
import { addArticle, deleteArticle, getArticle, listArticles } from '../controllers/articleController.js';
import { verifyAdmin, verifyApiKey } from '../middleware/auth.js';

const router = Router();

router.post('/add', verifyApiKey, addArticle);
router.get('/', listArticles);
router.get('/:id', getArticle);
router.delete('/:id', verifyAdmin, deleteArticle);

export default router;
