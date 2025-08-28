import './App.css'
import {useState, useEffect} from 'react'
import {StreamChat} from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies  from 'universal-cookie'
import {ChannelListContainer , ChannelContainer, Auth} from './components'

// import 'stream-chat-react/dist/index.css'

const cookies = new Cookies();

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey)

function App() {
  const[createType, setCreateType] = useState('');
  const[isCreating, setIsCreating] = useState(false);
  const[isEditing, setIsEditing] = useState(false);
  const[authToken, setAuthToken] = useState(cookies.get('token'));
  const[isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = cookies.get('token');
    const userId = cookies.get('userId');
    
    // Prevent duplicate connections in React strict mode
    if (token && userId && !client.userID && !isConnected) {
      console.log('Connecting user to Stream Chat:', { userId, token: token.substring(0, 10) + '...' });
      
      // Set connecting state immediately to prevent duplicates
      setIsConnected(true);
      
      client.connectUser({
        id: userId,
        name: cookies.get('username'),
        phone: cookies.get('phone'),
        fullname: cookies.get('fullname'),
      }, token)
      .then(() => {
        console.log('Successfully connected to Stream Chat');
      })
      .catch((error) => {
        console.error('Failed to connect to Stream Chat:', error);
        // Reset connection state on failure
        setIsConnected(false);
        // Clear invalid tokens
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullname');
        cookies.remove('phone');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        setAuthToken(null);
        window.location.reload();
      });
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (client.userID) {
        client.disconnectUser();
      }
    };
  }, []);
 
  if(!authToken) return <Auth />
  return (
    <>
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
          <ChannelListContainer 
           isCreating={isCreating}
           setIsCreating={setIsCreating}
           setCreateType={setCreateType}
           createType={setIsEditing }   
        />
        <ChannelContainer 
           isCreating={isCreating}
           setIsCreating={setIsCreating}
           isEditing={isEditing}
           setIsEditing={setIsEditing}    
           createType={createType}
        />
      </Chat>
    </div>
    </>
  )
}

export default App
