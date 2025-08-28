import React from 'react'
import {Channel, useChatContext, } from 'stream-chat-react'

import {Channelnner, CreateChannel, EditChannel, TeamMessage } from './'

const ChannelContainer = ({ isCreating, setIsCreate, isEditing, setIsEditing, createType,}) => {
  const {channel} = useChatContext();

  if(isCreating) {
    return(
       <div className="channel___container">
          <CreateChannel createType={createType} setIsCreating={setIsCreating} />
       </div>
    )
  } 

  const EmptyState = () => {
    return(
      <div className="channel-empty__container">
        <p className='Channel-empty__first'>This is the neginning ofyour chat history.</p>
        <p className='Channel-empty__second'>Send messges, attachments, links, emojis, and more!</p>
      </div>
      
    )
  }

  if(isEditing) {
    return(
    <div className="channel___container">
      <EditChannel setIsEditing={setIsEditing} />
    </div>
  )
  }

  return (
    <div className='channel___container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        MessageList={(messageProps, i) => <TeamMessage key={i} {...messageProps} />}
      >
        <Channelnner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  )
}

export default ChannelContainer;