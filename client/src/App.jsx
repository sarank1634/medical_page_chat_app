import './App.css'
import Cookies  from 'universal-cookie'
import {Auth} from './components'

const cookies = new Cookies();
const authToken = cookies.get('token');

function App() {
  if(!authToken) return <Auth />
  
  return (
    <>
    <div className="app__wrapper">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: '#f7f6f8'
      }}>
        <h1 style={{color: '#005fff', marginBottom: '20px'}}>Welcome to Medical Chat!</h1>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <p>Hello, {cookies.get('fullname') || cookies.get('username')}!</p>
          <p>You have successfully logged in.</p>
          <button 
            onClick={() => {
              cookies.remove('token');
              cookies.remove('userId');
              cookies.remove('username');
              cookies.remove('fullname');
              cookies.remove('phone');
              cookies.remove('hashedPassword');
              window.location.reload();
            }}
            style={{
              background: '#005fff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
