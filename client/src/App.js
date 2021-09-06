import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer , ChannelListContainer,Auth } from './components';
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
  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
    <Chat client={client} theme="team light">
    <ChannelListContainer />
    <ChannelContainer />
    </Chat>
    </div>
  );
}

export default App;
