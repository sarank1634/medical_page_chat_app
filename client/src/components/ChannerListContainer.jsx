import React, {useState} from 'react'
// import {ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from "universal-cookie";
import ChannelSearch from './ChannelSearch'
import TeamChannelList from './TeamChannelList'
import TeamChannelPreview from './TeamChannelPreview'
import { ChannelList } from 'stream-chat-react'


import HosPitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'
import { ChannelListContainer } from '.';

const SideBar = ({logout}) => (
  
   <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
       <div className="icon1_inner">
        <img src={HosPitalIcon} alt="Hospital" width={30} />
       </div>
    </div>
    <div className="channel-list__sidebar__icon2">
       <div className="icon2_inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width={30} />
       </div>
    </div>
   </div>
  );

const  CompanyHeader = () => ( 
   <div className="channel-list__header">
    <p className="channel-list__header___text">Medical Pager</p>
   </div>
)

const customChannelTeamfilter = (channel) => {
  return ChannelSearch.filter((channel) => channel.type === 'team');
}

const customChannelMessagefilter = (channel) => {
  return ChannelSearch.filter((channel) => channel.type === 'messaging');
}

const ChannerListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer={setToggleContainer}}) => {
 const cookies = new Cookies();
const {client} = useChatContext();

 const logout = () => {
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('phone');
    cookies.remove('fullname');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('token');

    window.location.reload();
 }

  const filters = { members :  { $in : [client.userID || '']}}

  return (
   <>
     <SideBar logout={logout} />
     <div className="channel-list__list__wrapper">
     <CompanyHeader />
     <ChannelSearch setToggleContainer=/>
     <ChannelList
       filters={filters}
       channelRenderFilterFn={customChannelTeamfilter}
       List={(listProps) =>(
           <TeamChannelList 
             {...listProps}
             type='team'
             isCreating={isCreating}
             setIsCreating={setIsCreating}
             setCreateType={setCreateType}
             setIsEditing={setIsEditing}
           />
       )} 
       preview={(previewProps) => (
         <TeamChannelPreview 
          {...previewProps}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          type='team'
          />
  )}
       />
<ChannelList
       filters={filters}
       channelRenderFilterFn={customChannelMessagefilter}
       List={(listProps) =>(
           <TeamChannelList 
             {...listProps}
             type='messaging'
             isCreating={isCreating}
             setIsCreating={setIsCreating}
             setCreateType={setCreateType}
             setIsEditing={setIsEditing}
             setToggleContainer={setToggleContainer}
           />
       )} 
       preview={(previewProps) => (
         <TeamChannelPreview 
          {...previewProps}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
          />
  )}
       />
     </div>
   </>
  )
}

const channelListContainer = ({  setIsCreating, setCreateType, setIsEditing}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
    <div className="channel-list__container">
      <ChannerListContent setIsCreating={setIsCreating} setCreateType={setCreateType} setIsEditing={setIsEditing}/>
    </div>
    <div className="channel-lsit__container-responsive"
       style={{left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}>

    </div>
    <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prev) => !prev)}></div>
    <ChannelListContainer
     setIsCreating={setIsCreating}
     setCreateType={setCreateType}
     setIsEditing={setIsEditing}
     setToggleContainer={setToggleContainer}
     />
 
    </>
  )
}

export default ChannelListContainer;


 