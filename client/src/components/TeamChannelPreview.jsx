import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';


const TeamChannelPreview = ({channel, type}) => {
   const {channel: activeChannel, clinet} = useChatContext();

   const ChannelPreview = () => {
    return (
    <p className="channel-preview__item">
      #{channel?.data?.name || channel?.data?.id}
    </p>
    )
     }

   const DirectPreivew = () => {
    const members =  Object.values(channel.state.members).filter(({ user}) => user.id !== clinet.user.id);

    return (
      <div className="channel-preview__item single">
        <Avatar 
         image={members[0].user?.image}
         name={members[0].user?.fullName}
         size={24}
        />
        <p> name={members[0].user?.fullName}  </p>
      </div>
    )
   }

  return (
    <div className={channel?.id === activeChannel?.id 
                 ? "channel-preview__wrapper__selected" 
                 : "channel-preview__wrapper" 
                }
                onClick={() => {
                  console.log(channel)
                }}
                >
                  {type === 'team' ? <ChannelPreview /> : <DirectPreivew />}
                </div>
  )
}

export default TeamChannelPreview;  