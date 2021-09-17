import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import axios from 'axios';
import firebase from 'react-native-firebase';
import { apiurl } from '../constants/config';

class GroupMessagingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('circle_name', 'Group')
    };
  };

  state = {
    messages: []
  };

  componentDidMount() {
    StatusBar.setTranslucent(false);
    const { navigation } = this.props;
    const groupKey = navigation.getParam('groupkey');
    console.log(groupKey);
    this.ref = firebase
      .firestore()
      .collection('circles')
      .doc(groupKey)
      .collection('messages');

    const unsubscribe = this.ref.orderBy('createdAt', 'desc').onSnapshot(
      querySnapshot => {
        const messages = [];
        querySnapshot.forEach(element => {
          console.log(element.data());
          messages.push(element.data());
        });
        this.setState({ messages });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  onSend(messages = []) {
    const { navigation } = this.props;
    const groupkey = navigation.getParam('groupkey');

    this.ref = firebase
      .firestore()
      .collection('circles')
      .doc(groupkey)
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
  }

  render() {
    const { user_id, username } = this.props;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderAvatar={null}
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

export default connect(mapStateToProps)(GroupMessagingScreen);
