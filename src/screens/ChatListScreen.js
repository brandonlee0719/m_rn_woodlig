import React, { Component } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FAB } from 'react-native-paper';
import axios from 'axios';
import firebase from 'react-native-firebase';
import ChatListComponent from '../components/ChatListComponent';
import { apiurl } from '../constants/config';

export class ChatListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatlist: []
    };
  }

  componentDidMount() {
    const { user_id } = this.props;
    this.newref = firebase
      .firestore()
      .collection('users')
      .doc(user_id)
      .collection('chatlist');
    const observer = this.newref.onSnapshot(docSnapshot => {
      const data = [];
      docSnapshot.forEach(element => {
        console.log(element.data());
        data.push(element.data());
      });
      console.log(data);
      this.setState({ chatlist: data });
    });
    // axios
    //   .get(`${apiurl}fetch-chat-list.php?user_id=${user_id}`)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ chatlist: res.data });
    //   })
    //   .catch(res => console.log(res.data));
  }

  // componentDidUpdate() {
  //   console.log(this.state.chatlist);
  // }

  render() {
    const { chatlist } = this.state;
    if (chatlist.length !== 0) {
      return (
        <View style={{ backgroundColor: '#eeeeee' }}>
          <FlatList
            data={chatlist}
            keyExtractor={item => item.createdAt}
            contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
            style={{ backgroundColor: '#eeeeee' }}
            keyExtractor={item => item.recipient_id}
            renderItem={({ item }) => <ChatListComponent item={item} />}
          />
        </View>
      );
    }
    if (chatlist.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FAB
            style={styles.fab}
            icon={() => (
              <FontAwesome5 name="plus" color="red" size={20} style={{ alignSelf: 'center' }} />
            )}
            onPress={() => this.props.navigation.navigate('ViewPeopleToMessage')}
          />
          <Text>Your inbox is empty</Text>
          <Image
            source={require('../images/EmptyChat.png')}
            style={{ width: 262, height: 192 }}
            resizeMode="contain"
          />
          <Text>Press the '+' button to continue chatting</Text>
        </View>
      );
    }
    return <ActivityIndicator />;
  }
}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 150,
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(ChatListScreen);
