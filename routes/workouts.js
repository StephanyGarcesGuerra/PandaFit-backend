import {Router} from 'express';
import Workout from '../models/workouts.js';


const router = new Router ();
//* Get route
//* GET '/' -> returns all users

//* main route   /workouts

router.get('/', async(req,res)=>{
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
});

router.get('/:id', async(req,res)=>{
    const workout = await Workout.findById(req.params.id);

    if(!workout) return res.status(404).json({msg: "Resource not found!"});
    else res.json(workout);
});

router.get('/:user_id/user-workouts', async (req,res) =>{
    const workout = await Workout.find({user_id:req.params.user_id});

    if(!workout) return res.status(404).json({msg: "Resource not found!"});
    else res.json(workout);
})

//* POST route
router.post('/new', async (req,res) =>{
    try{
        const workouts = await Workout.create(req.body);
    //* can include the below if you want to call on the profile,
    //* such as test to see it is working when you " res.status(201).json(user,profile)"
        res.status(201).json(workouts);
    
    } catch(err){
            console.log(err);
        }
    });
    


//* PUT route
router.put('/:id/update', async (req, res) =>{
    try{
        const{id}= req.params;
        const{body} = req;
        const updatedWorkout = await Workout.findByIdAndUpdate(id,body,{new: true});
            // adding {new:true} asks to have only the update data be returned
            res.json(updatedWorkout);
        } catch(err){
            console.log(err);
            res.json({msg: "Workout not found!"})
        }
    });

//* DELETE route
router.delete('/:id', async(req,res)=>{
    const {id}= req.params;
    try{
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        res.json({msg:"Workout deleted", deletedWorkout});
    } catch(err){
        console.log(err);
    }
});


export default router;