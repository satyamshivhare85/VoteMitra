import Vote from "../models/Vote.js";
import UserFace from "../models/UserFace.js";

export const castVote = async (req,res)=>{

  try{

    const { party } = req.body;

    const voterId=req.user.id;

    if(!party){

      return res.status(400).json({
        success:false,
        message:"Party required"
      });

    }

    const voter=await UserFace.findById(voterId);

    if(!voter){

      return res.status(404).json({
        success:false,
        message:"Voter not found"
      });

    }

    if(voter.hasVoted){

      return res.status(409).json({
        success:false,
        message:"Already voted"
      });

    }

    await Vote.create({
      voter:voterId,
      party
    });

    voter.hasVoted=true;
    voter.votedAt=new Date();

    await voter.save();

    return res.status(201).json({
      success:true,
      message:"Vote cast successfully"
    });

  }catch(err){

    console.error(err);

    return res.status(500).json({
      success:false,
      message:"Server error"
    });

  }
};