import { Router } from "express";
import Profile from "../models/profile.js";

const router = new Router

router.get('/', async(req,res)=>{
    const profiles = await Profile.find({}).populate({path:"user_id"});
    res.json(profiles);
});

router.get('/:id', async(req,res)=>{
    const profile = await Profile.findById(req.params.id);

    if(!profile) return res.status(404).json({msg: "Profile not found!"});
    else res.json(profile);
});

export default router;