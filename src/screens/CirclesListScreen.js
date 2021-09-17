import React, { Component } from 'react';
import { Text, View, FlatList, Image, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { FAB } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import firebase from 'react-native-firebase';
import { apiurl } from '../constants/config';
import CirclesListComponent from '../components/CirclesListComponent';

const { width, height } = Dimensions.get('screen')
export class CirclesListScreen extends Component {
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
      .collection('grouplist');
    const observer = this.newref.onSnapshot(docSnapshot => {
      const data = [];
      docSnapshot.forEach(element => {
        firebase
          .firestore()
          .collection('circles')
          .doc(element.data().groupkey)
          .get()
          .then(snapshot => {
            const datum = snapshot.data();
            // console.log(datum);
            data.push(datum);
            console.log(data);
            this.setState({ chatlist: data });
          });
      });
      console.log(data);
    });
    // console.log(this.newref);

    // axios
    //   .get(`${apiurl}fetch-my-circle-list.php?user_id=${user_id}`)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ chatlist: res.data });
    //   })
    //   .catch(res => console.log(res.data));
  }

  componentWillUpdate() {
    console.log(this.state.chatlist)
  }

  render() {
    const { chatlist } = this.state;
    return (
      <View style={{ height, width, backgroundColor: '#eeeeee', zIndex: -100 }}>
        <FAB
          style={styles.fab}
          icon={() => (
            <FontAwesome5 name="plus" color="red" size={20} style={{ alignSelf: 'center' }} />
          )}
          onPress={() => this.props.navigation.navigate('CreateACircle')}
        />

        <FlatList
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Your inbox is empty</Text>
              <Image
                source={require('../images/EmptyChat.png')}
                style={{ width: 262, height: 192 }}
                resizeMode="contain"
              />
              <Text>Press the '+' button to continue chatting</Text>
            </View>
          }
          contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
          style={{ backgroundColor: '#eeeeee' }}
          data={chatlist}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <CirclesListComponent item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 150,
    zIndex: 50,
    // top: 450,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(CirclesListScreen);
