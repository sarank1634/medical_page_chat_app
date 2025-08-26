import React from 'react'
// import {ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from '../components/ChannelSearch'


import HosPitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

const SideBar = () => (
  
   <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
       <div className="icon1_inner">
        <img src={HosPitalIcon} alt="Hospital" width={30} />
       </div>
    </div>
    <div className="channel-list__sidebar__icon2">
       <div className="icon2_inner">
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
  return (
   <>
     <SideBar />
     <div className="channel-list__list__wrapper">
     <CompanyHeader />
     <ChannelSearch />
     <TeamChannelList
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
     </div>
   </>
  )
}

export default ChannerListContainer;