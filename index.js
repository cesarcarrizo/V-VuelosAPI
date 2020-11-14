import express from 'express';
import apiRouter from './routes/apiRoutes';
import db from './database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', apiRouter(db));

app.listen(PORT, () => {
    console.log('Success.');
    // let test = await db('/t_usuarios/1/');
    // console.dir(test);
});