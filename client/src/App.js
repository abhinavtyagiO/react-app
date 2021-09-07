import React,{useState} from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer , ChannelListContainer,Auth } from './components';
import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies=new Cookies();

const apikey="fe8k9htj59dd";
const authToken=cookies.get('token');

const client= StreamChat.getInstance(apikey);

if(authToken){
  client.connectUser({
        id: cookies.get('userID'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatar'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
  },authToken);
}

function App() {
  const [createType,setCreateType]=useState('');
  const [isCreating,setIsCreating]=useState(false);
  const [isEditing,setIsEditing]=useState(false);

  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
    <Chat client={client} theme="team light">
    <ChannelListContainer
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}
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
  );
}

export default App;
