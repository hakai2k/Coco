import express from 'express'
import * as UserLoginController from '../controllers/LoginController'

const router = express.Router()

router.get('/', UserLoginController.getAllUsers)
router.get('/:id', UserLoginController.getOneuser)
router.post('/', UserLoginController.createUser)
router.patch('/:id', UserLoginController.updateUserDetails)

export default router