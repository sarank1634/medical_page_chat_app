import './App.css'
import {StreamChat} from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies  from 'universal-cookie'
import {ChannelListContainer , ChannelContainer, Auth} from './components'

const cookies = new Cookies();

const apiKey =  process.env.STREAM_API_KEY
const authToken = cookies.get('token');


const client = StreamChat.getInstance(apiKey)

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    phone: cookies.get('phone'),
    full_name: cookies.get('fullname'),
    avatar_url: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  })
}

function App() {

  if(!authToken) return <Auth />
  return (
    <>
    <div className="app__wrapper">
      <Chat client={client} theme='team light'>
        <ChannelListContainer 
        
        />

        <ChannelContainer 
        />
      </Chat>
    </div>
    </>
  )
}

export default App
