import {Router} from 'express';
import User from '../models/users.js'
import Workout from "../models/workouts.js"
import { workouts } from '../seed/workouts.js';
import Profile from '../models/profile.js';


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
        await Profile.create({user_id: user._id});


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

    // app.put('/api/tweets/add-comment/:id', async (req, res) => {
    //     const {id} = req.params;
    //     try {
    //         const tweetToUpdate = await Tweet.findById(id);
    //         tweetToUpdate.comments.push(req.body);
    //         const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {new: true});
    //         res.send(updatedTweet);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // });

    router.put('/user/:id', async (req, res) => {
        const {id} = req.params;
        try {
            const newUser = await User.findById(id);
            newUser.push(req.body);
            const updatedNewUser = await Tweet.findByIdAndUpdate(id, newUser, {newUser: false});
            res.send(updatedNewUser);
        } catch (e) {
            console.log(e);
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

//* POST sign in
router.post('/signin', async(req,res)=>{
    const {email, password} = req.body;

  // find user with the provided email
  const user = await User.findOne({email});

  if (!user) {
    return res.status(401).json({msg: "Invalid Credentials"});
  }

  // verify provided password with password hash from db
//   const passwordMatched = await bcrypt.compare(password, user.password);
  const passwordMatched = (password === user.password);

  if (!passwordMatched) {
    return res.status(401).json({msg: "Invalid Credentials password"})
  }

  // TODO: generate a jwt token and send it to the client
  res.json(user);
})


export default router;