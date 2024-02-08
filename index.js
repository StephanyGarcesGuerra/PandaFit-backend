import express from 'express';
import './loadEnv.js';
import {conn} from './db/conn.js'; conn();
import morgan from 'morgan';
import cors from 'cors';


//*Import the routes you want to use
import usersRoutes from './routes/users.js';
import workoutsRoutes from './routes/workouts.js';

const app = express();
const port = process.env.port || 4000;

app.use (morgan('dev'));
app.use(cors());
app.use(express.json());


//* Call on the routes you want to use (that have been imported)
app.use('/users', usersRoutes);
app.use('/workouts', workoutsRoutes);


app.get("/", (req, res) =>{
    res.send ("welcome to PandaFit");
});



app.listen(port, () =>{
    console.log(`server up and running on port ${port}`)
});