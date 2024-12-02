import express from 'express'
import { getAllUsers, getUserById, login, logout, register } from '../controller/userController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout);
router.get('/getusers', auth, getAllUsers);
router.get('/:id', auth, getUserById);

export default router;