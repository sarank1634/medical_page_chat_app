import React, { useState } from 'react'
import {useChatContext} from 'stream-chat-react'

import {useList, UserList} from './'
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

const CreateChannel = ({createType, setIsCreating}) => {
  const [channelName, setChannelName] = useState('');
  const {client, setActiveChannel} = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
  

  return (
    <div className='create-channel__container'> 
     <div className="create-channel__header">
      <p> {createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}  </p>
      <CloseCreateChannel setIsCreating={setIsCreating}/>
     </div>
     {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/> }
     <UserList setSelectedUsers={setSelectedUsers}/>

    </div>
  )
}

export default CreateChannel