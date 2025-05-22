const express = require('express');
const authMiddleware = require('../Utilities/authMiddleware');
const {authenticateUser} = require('../Utilities/travelGroup');
const {createGroup, sendMessage, acceptInvitation, inviteUserToGroup, joinPublicGroup, getGroupByName} = 
require('../Services/travelGroup');
const router = express.Router();
const travelGroup = require('../Model/travelGroup'); // Correct import


router.post('/create', async(req,res)=>{
    try{
        // const {groupId,name, description, isPublic} = ;        
        const group = await createGroup(req.body);  
        console.log(group);
              
        res.status(201).json(group);
    }catch(error){
        res.status(400).json({message:error.message});
    }
});

router.post('/join/:groupName', async(req,res) => {
    try {
        console.log(req.params.groupName);
        
        const group = await joinPublicGroup(req.params.groupName,req.params.userId);
        console.log(group);
        
        res.json({message: 'Joined group successfully', group});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});


router.post('/invite/:groupId', async(req,res) => {
    try {
        const {inviteeId} = req.body;
        const group = await inviteUserToGroup(req.params.groupId, inviteeId);
        res.json({message:'Invitation sent', group});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

router.post('/accept-invite/:groupId', async(req,res) => {
    try {
        console.log(req.params.groupId);
        
        const group = await acceptInvitation(req.params.groupId);
        res.json({message:'Invitation accepted', group});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

router.post('/groups/:groupName/message', async(req,res) => {
    try {
        const {groupName} = req.params;
        const {sender,text} = req.body;
        if(!sender || !text){
            return res.status(400).json({message:"sender and text are Required"})
        }
        const group = await travelGroup.findOne({name:groupName});
        if(!group){
            return res.status(404).json({message:"Group not Found"});
        }
        group.messages.push({sender,text});
        await group.save();
        res.json({message:"Message sent Successfully",group});
       
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/groups/:groupName', async(req,res) => {
    try {
       const group=await travelGroup.findOne({name:req.params.groupName});
       if(!group){
        return res.status(404).json({message:"Group Not Found"});
       }
       res.json(group);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


router.get('/view/all', async (req, res) => {
    try {
        const groups = await travelGroup.find({});
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);  // Debugging line
        res.status(500).json({ message: 'Error fetching groups', error: error.message });
    }
});

router.get('/view/:name', async (req, res) => {
    try {
        console.log(`Fetching group with name: ${req.params.name}`);
        const group = await getGroupByName(req.params.name);
        res.status(200).json(group);
    } catch (error) {
        console.error('Error fetching group:', error);
        res.status(404).json({ message: error.message });
    }
});

// Get the groups the user has joined
router.get('/user/:userId/groups', async (req, res) => {
    try {
      const userId = req.params.userId;
      const groups = await travelGroup.find({ members: userId });  // Fetch groups where userId is a member
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user groups', error: error.message });
    }
  });
  


module.exports = router;