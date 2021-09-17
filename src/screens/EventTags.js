import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { apiurl } from '../constants/config';
import ActivityStream from '../components/ActivityStream';

class EventTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { navigation, user_id } = this.props;
    const { id } = navigation.state.params.item;
    const { type } = navigation.state.params;
    const { address } = navigation.state.params.item;
    if (type === 'hashtags') {
      axios
        .get(`${apiurl}fetch-tag-events.php?id=${id}&user_id=${user_id}`)
        .then(res => {
          console.log(res.data);
          this.setState({ data: res.data });
        })
        .catch(res => console.log(res.data));
    } else if (type === 'places') {
      axios
        .get(`${apiurl}fetch-place-events.php?place=${address}&user_id=${user_id}`)
        .then(res => {
          console.log(res.data);
          this.setState({ data: res.data });
        })
        .catch(res => console.log(res.data));
    }
  }

  render() {
    const { data } = this.state;
    return (
      <View>
        {data.length !== 0 ? (
          <View>
            {data.status === 'success' ? (
              <FlatList
                data={data.events}
                keyExtractor={item => item.post_id}
                renderItem={({ item }) => (
                  <ActivityStream
                    full_name={item.full_name}
                    username={item.username}
                    text={item.body}
                    type="event"
                    address={item.address}
                    path={item.path}
                    event_type={item.event_type}
                    likes={item.likes}
                    like_status={item.like_status}
                    comments={item.comments}
                    profile_thumb={item.profile_thumb}
                    theirid={item.post_user_id}
                    caption={item.caption}
                    postid={item.post_id}
                    datecreated={item.date_created}
                    likestatus={item.like_status}
                    productname={item.product_name}
                    productpurpose={item.product_purpose}
                    productprice={item.product_price}
                    producttype={item.product_type}
                    productid={item.product_id}
                    Item={item}
                  />
                )}
              />
            ) : (
              <View style={{padding: 10}}>
                <Text style={{ fontSize: 15, color: 'black', fontFamily: 'poppins-Medium'}}>
                  Your search does not match any saved tags
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(EventTags);
