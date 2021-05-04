import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from "@material-ui/core";
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt('Please enter an email address for the user you wish to chat with');

        if(!input) return false;

        if(EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email) {
            db.collection('chats').add({
                users:[user.email, input]
            });
        }
    }

    const chatAlreadyExist = (email) => 
        !!chatsSnapshot?.docs.find(
            chat => chat.data().users.find(user => user === email)?.length > 0
        );
    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* List of chats */}
            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    )
}

export default Sidebar;

const Container  = styled.div`
    flex:0.45;
    flex-basis:30%;
    border-right:1px solid whitesmoke;
    height:100vh;
    overflow-y:scroll;
    max-width:350px;
    min-width:280px;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
        display:none;
    }
    scrollbar-width:none;
`;

const Header = styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:80px;
    border-bottom:1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor:pointer;
    :hover {
        opacity:0.8;
    }
`; 

const IconsContainer = styled.div``;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:20px;
    border-radius:2px;
`;

const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
`;

const SidebarButton = styled(Button)`
    width:100%;

    &&& {
        border-bottom:1px solid whitesmoke;
        border-top:1px solid whitesmoke;
    }
`;