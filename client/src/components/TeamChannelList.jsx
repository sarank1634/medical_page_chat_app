import React from 'react'
import { AddChannel } from '../assets'

const TeamChannelList = ({children,error=false,loading, type, isCreating, setIsCreating, setCreateType, createType}) => {

    if(error){
        return type === 'team' ? (
          <div className="team-channel-list">
            <p className="team-channel-list__message">
                Connection error, please wait a moment and try again.
            </p>
          </div>
        ): null;
    }

    if(loading){
        return (
            <div className="team-channel-list">
              <p className="team-channel-list__message loading ...">
                {type === 'team' ? 'Channels': 'Message'} loading ...
              </p>
            </div>
        )
    }
  return (
    <div className='team-channel-list'>
        <div className="team-channels-lsit__header">
            <p className='team-channel-list__header__titile'>
            {type === 'team' ? 'Channels': 'Message'}
            </p>
            <AddChannel 
             isCreating={isCreating}
             setIsCreating={setIsCreating}
             setCreateType={setCreateType}
             createType={createType}
             type = {type === 'team' ? 'team' : 'messaging'}/>
        </div>
           {children}
           </div>
  )
}

export default TeamChannelList;