const travelGroup = require('../Model/travelGroup');

const createGroup = async(body) => {
    const group = new travelGroup(body);          
    await group.save();
    return group;
};

const joinPublicGroup = async(groupName,userId) => {
    const group = await travelGroup.findOne({name:groupName});
    if(!group){
        throw new Error('Group not found');
    }
    if(!group.isPublic){
        throw new Error('Private groups require an invitation');
    }
    if(group.members.includes(userId)){
        throw new Error('User is already a member')
    }

    group.members.push(userId);
    await group.save();
    return group;
};

const inviteUserToGroup = async(groupId, senderId, inviteeId) => {
    const group = await travelGroup.findById(groupId);
    if(!group){
        throw new Error('Group not found');
    }
    if(group.isPublic){
        throw new Error('Private groups do not require invitations');
    }
    if(!group.members.includes(senderId)){
        throw new Error('Only members can invite others')
    }
    group.invitations.push({user:inviteeId});
    await group.save();
    return group;
};

const acceptInvitation = async ( groupId) => {
    const group = await travelGroup.findOne({groupId:groupId});
    if(!group){
        throw new Error('Group not found');
    }
    const invitation = group.invitations.find(invite =>  invite.user.equals(userId) && invite.status === 'pending');
    if(!invitation){
        throw new Error('No pending invitation found');
    }
    invitation.status =  'accepted';
    group.members.push(userId);
    await group.save();
    return group;
}

const sendMessage = async (groupName,sender,text)=>{
    const group = await travelGroup.findOne({name:groupName});
    if(!group){
        throw new Error('Group not found');
    }
    group.messages.push({sender,text});
    await group.save();
    return group;
};

const getGroupByName = async (name) => {
    const group = await travelGroup.findOne({ name: name });
    if (!group) {
        throw new Error('Group not found');
    }
    return group;
};


module.exports = { createGroup, sendMessage, acceptInvitation, inviteUserToGroup, joinPublicGroup, getGroupByName};