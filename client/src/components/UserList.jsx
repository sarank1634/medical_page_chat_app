import { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import {UserList} from "../assets";

const ListContainer = ({children}) => {
return (
    <div className="user-list___channel">
        <div className="user-list__header">
            <p>User</p>
            <p>Invite</p>
        </div>
        {children}
    </div>
)
}

const UserItem = () => {
    return(
        <div className="user-item__wrapper">
           <div className="user-itme___name-wrapper">
            <Avatar/>
           </div>
            <p></p>
        </div>
    )
}

const UserList = () => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       const getUsers = async () => {
        if(loading) return;

        setLoading(true);

        try {
            const response = await client.queryUsers(
            {id: {$ne: client.userID}},
            {id: 1},
            {limit: 10}
            );

            if(response.users.length) {
                setUsers(response.users);
            }
        } catch (error) {
            
        }
       }

    }, [filter]) 
    
    return(
        <ListContainer>
            <UserList/>
        </ListContainer>
    )
}

export default UserList;