import React from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from 'react-native-firebase';
import { apiurl } from '../constants/config';

const { height, width } = Dimensions.get('window');
class MessagingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('user', 'User');
    return {
      title: name.name
    };
  };

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

  componentDidMount() {
    StatusBar.setTranslucent(false);
    const { user_id, navigation } = this.props;
    const theirid = navigation.getParam('theirid');
    const user = navigation.getParam('user');
    console.log(user);
    this.ref = firebase
      .firestore()
      .collection('users')
      .doc(user_id)
      .collection('chats')
      .doc(theirid)
      .collection('messages');

    this.chatlistref = firebase
      .firestore()
      .collection('users')
      .doc(user_id)
      .collection('chatlist')
      .doc(theirid);

    this.theirchatlistref = firebase
      .firestore()
      .collection('users')
      .doc(theirid)
      .collection('chatlist')
      .doc(user_id);

    const unsubscribe = this.ref.orderBy('createdAt', 'desc').onSnapshot(
      querySnapshot => {
        const messages = [];
        querySnapshot.forEach(element => {
          console.log(element.data());
          messages.push(element.data());
        });
        this.setState({ messages });
        const listings = messages.filter(e => e.user._id !== user_id);
        if (messages[0] !== undefined) {
          const { text, createdAt } = messages[0];
          const datum = { text, createdAt, user };
          this.chatlistref.set(datum);
        }
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );

    const subscribe = this.ref.orderBy('createdAt', 'desc').onSnapshot(
      querySnapshot => {
        const messages = [];
        querySnapshot.forEach(element => {
          console.log(element.data());
          messages.push(element.data());
        });
        this.setState({ messages });
        const listings = messages.filter(e => e.user._id !== user_id);
        if (messages[0] !== undefined) {
          const { text, createdAt } = messages[0];
          const datum = { text, createdAt, user };
          this.theirchatlistref.set(datum);
        }
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  componentDidUpdate() {
    // console.log(this.state.messages);
  }

  onSend(messages = []) {
    const { user_id, navigation } = this.props;
    const theirid = navigation.getParam('theirid');
    // const key = navigation.getParam('key');

    this.ref = firebase
      .firestore()
      .collection('users')
      .doc(user_id)
      .collection('chats')
      .doc(theirid)
      .collection('messages');

    this.theirref = firebase
      .firestore()
      .collection('users')
      .doc(theirid)
      .collection('chats')
      .doc(user_id)
      .collection('messages');

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
    this.theirref.add(newMessage).then(documentReference => {
      const { firestore } = documentReference;
      console.log(`Root location for document is ${firestore.formattedName}`);
    });
    // this.ref.add(chats);
    // this.chatlistref.set(messages[0]);
  }

  render() {
    const { user_id, username } = this.props;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        //   showUserAvatar
        renderAvatar={null}
        renderTime={this.renderTime}
        renderUsernameOnMessage
        user={{
          _id: user_id,
          name: username,
          avatar: 'https://facebook.github.io/react/img/logo_og.png'
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture,
  username: state.profilepicture.username
});

export default connect(mapStateToProps)(MessagingScreen);
