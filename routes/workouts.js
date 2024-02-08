import {Router} from 'express';
import Workout from '../models/workouts.js';


const router = new Router ();
//* Get route
//* GET '/' -> returns all users

router.get('/', async(req,res)=>{
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
});


//* POST route



//* PUT route


//* DELETE route


export default router;