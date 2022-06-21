import { Router } from 'express';

const router = Router();

router.get('/', (req, resp) => {
    req;
    resp.end('App Cosas que he aprendido');
});

export default router;
