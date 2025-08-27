const { connect} = require(`getstream`);
const bcrypt = require(`bcrypt`);
const StreamChat = require(`getstream`).StreamChat;
const crypto = require(`crypto`);

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
    try {
       const {fullname, username, phoneNumber, password} = req.body;

       const userId = crypto.randomBytes(16).toString(`hex`);

       const serverClient = connect(api_key, api_secret, app_id);

       const hashedPassword = await bcrypt.hash(password, 10);
  
       const token = serverClient.createToken(userId);

       res.status(200).json({token, userId, fullname, username, phoneNumber, hashedPassword});
    } catch (error) {
        console.log(error);

        res.status(500).json({message: error.message});
    }
}

const login = async(req, res) => {
    try {
        
        const {username, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const {users} = client.queryUsers({name : username });

        if(!users.length) return res.status(400).json({message: "No user found"});

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createToken(users[0].id);

        if(success) {
            return res.status(200).json({token, userId: users[0].id, fullname: users[0].fullname, username: users[0].name});
        } else {
            return res.status(500).json({message: "Incorrect password"});
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({message: error.message});
    }
};




module.exports = { login, signup };
