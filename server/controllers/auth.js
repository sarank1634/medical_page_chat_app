const { connect} = require(`getstream`);
const bcrypt = require(`bcrypt`);
const { StreamChat } = require(`stream-chat`);
const crypto = require(`crypto`);

require(`dotenv`).config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
    try {
       const {fullname, username, phone, password} = req.body;

       // Validate required fields
       if (!fullname || !username || !phone || !password) {
           return res.status(400).json({message: "All fields are required"});
       }

       const userId = crypto.randomBytes(16).toString(`hex`);

       const serverClient = connect(api_key, api_secret, app_id);
       const client = StreamChat.getInstance(api_key, api_secret);

       const hashedPassword = await bcrypt.hash(password, 10);

       // Create user in Stream Chat first
       console.log('Creating user in Stream Chat:', { userId, username, fullname });
       const userResponse = await client.upsertUser({
           id: userId,
           name: username,
           fullname: fullname,
           phone: phone,
           hashedPassword: hashedPassword
       });
       console.log('User created successfully:', userResponse);
       
       // Create token using the same userId that was used for user creation
       const token = serverClient.createUserToken(userId);
       console.log('Token created for user:', userId, 'Token length:', token.length);
       
       // Verify token is valid by decoding it
       try {
           const jwt = require('jsonwebtoken');
           const decoded = jwt.decode(token);
           console.log('Token payload:', decoded);
       } catch (e) {
           console.log('Token decode failed:', e.message);
       }

       res.status(200).json({token, userId, fullname, username, phone, hashedPassword});
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({message: error.message || 'Signup failed'});
    }
};

const login = async(req, res) => {
    try {
        const {username, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const {users} = await client.queryUsers({name : username });

        if(!users.length) return res.status(400).json({message: "No user found"});

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
             res.status(200).json({token, userId: users[0].id, fullname: users[0].fullname, username: users[0].name});
        } else {
             res.status(500).json({message: "Incorrect password"});
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({message: error});
    }
};

module.exports = { login, signup };
