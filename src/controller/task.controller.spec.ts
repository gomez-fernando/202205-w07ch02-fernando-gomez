// import { request } from 'express';
import { app } from '../app';
// import * as controllers from './task.controller'
// import { taskRouter } from '../router/task';
import request from "supertest";
// import express from "express";
// const app = express();

const data = {
    "cosas": [
        { "id": 2, "name": "updated", "prioridad": "baja" },
        { "id": 3, "name": "updated", "prioridad": "baja" },
        { "id": 5, "name": "new", "prioridad": "baja" }
    ]
}

describe('Given the task controllers', () => {
    describe('Given the getController', () => {
        test("index route works", done => {
            request(app)
              .get("/task")
              .expect("Content-Type", /json/)
              .expect(data)
              .expect(200, done);
          });
    });
});