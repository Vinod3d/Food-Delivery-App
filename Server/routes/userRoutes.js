import express from 'express'
import { getAllUsers, getUser, login, logout, register, updateUserProfile } from '../controller/userController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout);
router.get('/getusers', auth, getAllUsers);
router.get('/', auth, getUser);
router.put('/update/:id', auth, updateUserProfile);

export default router;