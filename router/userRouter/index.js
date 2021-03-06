import login from './login'
import register from './register'
import express from 'express'

const router = express.Router();

router.use('/login',login)
router.use('/register',register)

export default router;
