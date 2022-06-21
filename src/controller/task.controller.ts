import { Request, Response } from 'express';
import fs from 'fs/promises';

const dataFilePath: string = './data/data.json';

const res =  JSON.parse( await fs.readFile(dataFilePath, {
    encoding: 'utf-8'

}));

let array = res.cosas;

export const getController =  async (req: Request, resp: Response) => {
    req;
    const result = await fs.readFile(dataFilePath, {
        encoding: 'utf-8',
    })
    resp.setHeader('Content-type', 'application/json');
    resp.end(result);
};

export const getIdController = async (req: Request, resp: Response) => {
    const result = array.find((item: any) => item.id === +req.params.id)
    resp.setHeader('Content-type', 'application/json');

    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    console.log('body: ' + req.body);

    const newTask = { ...req.body, id: array[array.length - 1].id + 1 };

    array.push(newTask);

    const newContent = {
        cosas: array
    }

    await fs.writeFile(dataFilePath, JSON.stringify(newContent));
    
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    resp.end(JSON.stringify(newTask));
}

export const patchController = async (req: Request, resp: Response) => {
    let tasks: any[] = [];
    let newTask = {};

    tasks = array.map((task: any) => {
        if (task.id === +req.params.id) {
            newTask = { ...task, ...req.body };
            return newTask;
        } else {
            return task;
        }
    });
    const newContent = {
        cosas: tasks
    }

    await fs.writeFile(dataFilePath, JSON.stringify(newContent));
    resp.setHeader('Content-type', 'application/json');
    resp.end(JSON.stringify(newTask));
}

export const deleteController = async (req: Request, resp: Response) => {
    const prevLength = array.length;

    array = array.filter((task: any) => task.id !== +req.params.id);
    const newContent = {
        cosas: array
    }

    await fs.writeFile(dataFilePath, JSON.stringify(newContent));

    resp.status(prevLength === array.length ? 404 : 202);
    resp.end(JSON.stringify({}));
}