import {Router} from 'express';
import User from '../models/users.js'


const router = new Router ();

//* NOTE: basic route is /users

//* GET '/' -> returns all users

router.get('/', async(req,res)=>{
    const users = await User.find({});
    res.status(200).json(users);
});

//* GET '/:id' -> returns user by id
router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).json({msg: "Resource not found!"});
    else res.json(user);
});


//* POST route
router.post('/new', async (req,res) =>{
    try{
        const user = await User.create(req.body);
    //* can include the below if you want to call on the profile,
    //* such as test to see it is working when you " res.status(201).json(user,profile)"
        res.status(201).json(user);
    
    } catch(err){
            console.log(err);
        }
    });
    


//* PUT route


//* DELETE route


export default router;