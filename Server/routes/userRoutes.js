import express from 'express'
import { login, logout, register } from '../controller/userController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout);

export default router;