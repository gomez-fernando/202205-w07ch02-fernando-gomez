import { Request, Response } from 'express';
import fs from 'fs/promises';

// const tasks: Array<any> = [];
const dataFilePath: string = './data/data.json';

// console.log(result);

export const getController =  async (req: Request, resp: Response) => {
    req;
    const result = await fs.readFile(dataFilePath, {
        encoding: 'utf-8',
    })
    console.log(JSON.parse(result).cosas);
    resp.setHeader('Content-type', 'application/json');
    resp.end(result);
};

export const getIdController = async (req: Request, resp: Response) => {
    
    const res =  JSON.parse( await fs.readFile(dataFilePath, {
        encoding: 'utf-8'
    
    }));
    const res1 = res.cosas;
    const result = res1.find((item: any) => item.id === +req.params.id)
    console.log(result);
    resp.setHeader('Content-type', 'application/json');

    if (result) {
        resp.end(JSON.stringify(result));
    } else {
        resp.status(404);
        resp.end(JSON.stringify({}));
    }
};

export const postController = async (req: Request, resp: Response) => {
    const res =  JSON.parse( await fs.readFile(dataFilePath, {
        encoding: 'utf-8'
    
    }));
    let array = res.cosas;
    console.log(array);
    array.push(req.body);
    console.log(array);

    await fs.writeFile(dataFilePath, JSON.stringify(array));
    
    // tasks.push(newTask);
    resp.setHeader('Content-type', 'application/json');
    resp.status(201);
    // resp.end(JSON.stringify(newTask));
}