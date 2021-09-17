import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

export default class TestChat extends Component {
  state = {
    messages: []
  };

  renderTime(props) {
    return (
      <Time
        {...props}
        textStyle={{
          right: {
            color: 'black'
          },
          left: {
            color: 'white'
          }
        }}
      />
    );
  }

  ref = firebase
    .firestore()
    .collection('users')
    .doc('3')
    .collection('chats')
    .doc('4')
    .collection('messages');

  newref = firebase
    .firestore()
    .collection('users')
    .doc('3')
    .collection('chatlist');

  chatlistref = firebase
    .firestore()
    .collection('users')
    .doc('3')
    .collection('chatlist')
    .doc('7');

  componentDidMount() {
    const unsubscribe = this.ref.orderBy('createdAt', 'desc').onSnapshot(
      querySnapshot => {
        const messages = [];
        querySnapshot.forEach(element => {
          messages.push(element.data());
        });
        this.setState({ messages });
        const listings = messages.filter(e => e.user._id !== 3);
        if (messages[0] !== undefined) {
          const { text, createdAt } = messages[0];
          //   const { user } = listings[0];
          const user = {
            user_id: 3,
            picture:
              'https://www.sccpre.cat/mypng/detail/214-2144186_alpesh-m-avatar-thumbnail.png',
            name: 'coming soon'
          };
          const datum = { text, createdAt, user };
          this.chatlistref.set(datum);
          //   const observer = this.newref.onSnapshot(docSnapshot =>
          //     docSnapshot.forEach(element => {
          //       console.log(element.data());
          //     })
          //   );
          console.log(messages[0]);
          console.log(listings[0]);
        }
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  //   componentDidUpdate() {
  //     console.log(this);
  //   }

  onSend(messages = []) {
    console.log(messages);
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages)
    // }));

    const chats = messages[0];
    const newMessage = {
      createdAt: Date.now(),
      text: chats.text,
      user: chats.user,
      _id: chats._id
    };
    console.log(newMessage);
    this.ref.add(newMessage).then(documentReference => {
      const { firestore } = documentReference;
      console.log(`Root location for document is ${firestore.formattedName}`);
    });
    // this.ref.add(chats);
    // this.chatlistref.set(messages[0]);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          //   showUserAvatar
          renderAvatar={null}
          renderTime={this.renderTime}
          renderUsernameOnMessage
          user={{
            _id: 4,
            name: 'Andrew Bamidele',
            avatar: 'https://facebook.github.io/react/img/logo_og.png'
          }}
        />
      </View>
    );
  }
}
