import React, { useState, useEffect }  from 'react'
import {SearchIcon} from '../assets'
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './';

const ChannelSearch = ({setToggleContainer}) => {
  const {client, setActiveChannel} = useChatContext();
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const getChannels = async (text) => {
      try {
        const channelResponse =  client.queryChannels({
          type: 'team', 
          name: { $autocomplete: text},
          members: {$in : [client.userID]}
        });
        const userResponse =   client.queryChannels({
          id: {$ne: client.userID},
          name: {$autocomplete: text}
        })

        const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

        if(channels.length) setTeamChannels(channels);
        if(users.length) setDirectChannels(users);
      } catch (error) {
          setQuery('')
      } 
    }

    const onSearch = (event) => {
     event.preventDefault() 

     setLoading(true)
     setQuery(event.target.value);
     getChannels(event.target.value)
    }

    const setChannel = (channel) => {
      setActiveChannel('');
      setActiveChannel(channel);
    }

   useEffect(() => {
     if(!query) {
       setTeamChannels([]);
       setDirectChannels([]);
     }
   }, [query, setActiveChannel]);

  return (
    <div className='channel-search__container'>
        <div className='channel-search__input__wrapper'>
            <div className='channel-search__input__icon'>
                <SearchIcon />
            </div>
            <input 
            className="channel-search__input__text"
             type='text' 
             placeholder='Search'
             value={query}
             onChange={onSearch} />
        </div>
        {query && (
          <ResultsDropDown
            teamChannels={teamChannels}
            directChannels={directChannels}
            loading={loading}
            setToggleContainer = {setToggleContainer}
            setQuery={setQuery}
            setChannel = {setChannel}
            />
        )}
    </div>
  )
}

export default ChannelSearch;