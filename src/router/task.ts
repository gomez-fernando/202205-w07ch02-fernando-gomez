import { Router } from 'express';
import { getController, getIdController, postController } from '../controller/task.controller.js';

export const taskRouter = Router();

let tasks: Array<any> = [];
taskRouter.get('/', getController);

taskRouter.get('/:id', getIdController);

taskRouter.post('/', postController);

taskRouter.patch('/:id', (req, resp) => {
    let newTask;
    tasks = tasks.map((task) => {
        if (task.id === +req.params.id) {
            newTask = { ...task, ...req.body };
            return newTask;
        } else {
            return task;
        }
    });
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newTask));
});

taskRouter.delete('/:id', (req, resp) => {
    const prevLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== +req.params.id);
    resp.status(prevLength === tasks.length ? 404 : 202);
    resp.end(JSON.stringify({}));
});
