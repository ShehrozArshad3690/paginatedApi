import express from 'express';
import { viewAllController, viewByIdController, addUserController, updateUserController, deleteUserController } from '../controllers/viewController'

const router = express.Router();


router.get('/users', viewAllController);
router.get('/user/:id', viewByIdController);
router.post('/user/add', addUserController);
router.put('/user/update/:id', updateUserController);
router.delete('/user/delete/:id', deleteUserController);



export { router }