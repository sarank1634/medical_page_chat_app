import React,{useState} from 'react'
import {useChatContext} from 'stream-chat-react'

import {UserList} from './';
import { CloseCreateChannel } from '../assets';


const ChannelNameInput = ({channelName, setChannelName}) => {
  const handleChange = (event) => {
     event.preventDefault();
 
     setChannelName(event.target.value);
   }
     return (
       <div className='channel-name__input__wrapper'>
         <p>Name</p>
         <input
             placeholder="Channel name"
             value={channelName}
             onChange={(e) => setChannelName(e.target.value)}
         />
         <p>Add Member</p>
       </div>
     )
 }

const EditChannel = ({setIsEditing}) => {
const {channel} = useChatContext();
const [channelName, setChannelName] = useState(channel?.name || '');
const [selectedUsers, setSelectedUsers] = useState(channel?.members?.map((member) => member.id) || []);

const updateChannel = async(e) => {
  e.preventDefault();

  const nameChanged = channel !== (channel.data.anme || channel .data.id)

   if(nameChanged){
    await channel.update({name: channelName}, {text: `Channel name changed to ${channelName}`});
   }

if(selectedUsers.length) {
  await channel.addMembers(selectedUsers); 
 }

 setChannelName(null);
setIsEditing(false);
setSelectedUsers([]);

  return (
    <div className='edit-channel__container'> 
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing}/>
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={updateChannel}>
        <p>Update Channel</p>
      </div>
    </div>
  )
}

export default EditChannel;