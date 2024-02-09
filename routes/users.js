import {Router} from 'express';
import User from '../models/users.js'
import Workout from "../models/workouts.js"
import { workouts } from '../seed/workouts.js';


const router = new Router ();

//* NOTE: basic route is /users

router.get('/', async(req,res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

//* GET '/:id' -> returns user by id
router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({msg: "user not found!"});
    else res.json(user);
});


//* POST route
router.post('/new', async (req,res) =>{
    try{
        const user = await User.create(req.body);
        for(let workout of workouts) {
            await Workout.create ({user_id: user._id, ...workout})
        }

    //* can include the below if you want to call on the profile,
    //* such as test to see it is working when you " res.status(201).json(user,profile)"
        res.status(201).json(user);
    
    } catch(err){
            console.log(err);
        }
    });
    


//* PUT route
router.put('/:id/update', async (req, res) =>{
    try{
        const{id}= req.params;
        const{body} = req;
        const updatedUser = await User.findByIdAndUpdate(id,body,{new: true});
            // adding {new:true} asks to have only the update data be returned
            res.json(updatedUser);
        } catch(err){
            console.log(err);
            res.json({msg: "User not found!"})
        }
    });


//* DELETE route
router.delete('/:id', async(req,res)=>{
    const {id}= req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({msg:"User deleted", deletedUser});
    } catch(err){
        console.log(err);
    }
});


export default router;