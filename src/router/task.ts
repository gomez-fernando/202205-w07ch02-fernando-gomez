import { Router } from 'express';
import { deleteController, getController, getIdController, patchController, postController } from '../controller/task.controller.js';

export const taskRouter = Router();


export default taskRouter.get('/', getController);

taskRouter.get('/:id', getIdController);

taskRouter.post('/', postController);

taskRouter.patch('/:id', patchController);

taskRouter.delete('/:id', deleteController);
