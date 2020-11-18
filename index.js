import express from 'express';
import usuarios from './routes/apiRoutes/usuarios';
import consecutivos from './routes/apiRoutes/usuarios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/api', usuarios);
app.use('/api', consecutivos);

app.listen(PORT,  () => {
    console.log('Success.');
    //console.dir(test);
});