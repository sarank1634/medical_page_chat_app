import React from 'react'
// import {ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from "universal-cookie";
import ChannelSearch from './ChannelSearch'
import TeamChannelList from './TeamChannelList'
import TeamChannelPreview from './TeamChannelPreview'
import { ChannelList } from 'stream-chat-react'


import HosPitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

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

const ChannerListContainer = () => {
 const cookies = new Cookies();

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
  return (
   <>
     <SideBar logout={logout} />
     <div className="channel-list__list__wrapper">
     <CompanyHeader />
     <ChannelSearch />
     <ChannelList
       filters={{}}
       channelRenderFilterFn={() =>{}}
       List={(listProps) =>(
           <TeamChannelList 
             {...listProps}
             type='team'
           />
       )} 
       preview={(previewProps) => (
         <TeamChannelPreview 
          {...previewProps}
          type='team'
          />
  )}
       />
<ChannelList
       filters={{}}
       channelRenderFilterFn={() =>{}}
       List={(listProps) =>(
           <TeamChannelList 
             {...listProps}
             type='messaging'
           />
       )} 
       preview={(previewProps) => (
         <TeamChannelPreview 
          {...previewProps}
          type='messaging'
          />
  )}
       />
     </div>
   </>
  )
}

export default ChannerListContainer;