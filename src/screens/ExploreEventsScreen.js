import React, { Component } from 'react';
import { Text, View, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FAB, Portal, Modal, Button } from 'react-native-paper';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiurl } from '../constants/config';
import { eventType } from '../redux/actions/eventTypes';
import ActivityStream from '../components/ActivityStream';

class ExploreEventsScreen extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    const user_id = 3;
    const { navigation } = this.props;
    const event_type = navigation.getParam('eventType');
    const data = { event_type, user_id };
    this.props.eventType(data);
    // axios
    //   .get(`${apiurl}fetch-explore-event-type.php?user_id=3&event_type=${eventType}`)
    //   .then(res => console.log(res.data))
    //   .catch(res => console.log(res.data));
  }

  componentWillReceiveProps(b) {
    console.log(b.event);
  }

  _showModal = () => this.setState({ visible: true });

  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { navigation, event } = this.props;
    const eventType = navigation.getParam('eventType');
    return (
      <View style={{ flex: 1 }}>
        <FAB
          style={styles.fab}
          small={false}
          color="black"
          icon={() => <FontAwesome5 name="sort-amount-up" color="black" size={26} />}
          onPress={() => this.setState({ visible: true })}
        />
        <Portal>
          <Modal visible={visible} onDismiss={this._hideModal}>
            <View style={styles.modalStyle}>
              <View style={{ flex: 3, justifyContent: 'space-around' }}>
                <View
                  style={{
                    width: 251,
                    borderBottomWidth: 2,
                    borderBottomColor: '#dedede',
                    alignSelf: 'center'
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: '700',
                      color: '#000000'
                    }}>
                    Customize search result
                  </Text>
                </View>
                <Text style={{ marginLeft: 17, color: '#212121' }}>Change location</Text>
                <View style={styles.inputStyle}>
                  <TextInput
                    style={{ fontSize: 10, width: 210, paddingLeft: 14 }}
                    placeholder="Abuja, Nigeria"
                  />
                  <FontAwesome5
                    name="search"
                    size={12}
                    style={{ marginHorizontal: 14, alignSelf: 'center' }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={{ fontSize: 12, color: '#ffffff' }}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Portal>
        <View
          style={{
            height: 30,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            elevation: 5
          }}>
          <FontAwesome5
            name="calendar-alt"
            style={{ marginHorizontal: 10 }}
            color="#000"
            size={18}
          />
          <Text
            style={{
              textTransform: 'capitalize',
              fontSize: 12,
              fontWeight: '700'
            }}>
            {eventType}
          </Text>
        </View>
        <View>
          <FlatList
            data={event}
            // ListEmptyComponent={<EmptyActivityStream />}
            refreshing
            initialNumToRender={2}
            removeClippedSubviews
            keyExtractor={item => item.post_id}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50
            }}
            renderItem={({ item }) => (
              <ActivityStream
                full_name={item.full_name}
                username={item.username}
                text={item.body}
                type={item.type}
                address={item.address}
                path={item.path}
                event_type={item.event_type}
                likes={item.likes}
                comments={item.comments}
                theirid={item.user_id}
                likestatus={item.like_status}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    margin: 16,
    right: 0,
    bottom: 0
  },
  modalStyle: {
    width: 285,
    height: 198,
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 8,
    borderRadius: 8,
    backgroundColor: '#f7f8f9'
  },
  inputStyle: {
    width: 251,
    height: 31,
    alignSelf: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  applyButton: {
    width: 58,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    shadowColor: 'rgba(0, 0, 0, 0.39)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    borderRadius: 6
  }
});

const mapStateToProps = state => ({
  event: state.eventtypes.event
});

export default connect(
  mapStateToProps,
  { eventType }
)(ExploreEventsScreen);
