import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { apiurl } from '../constants/config';
import GalleryPosts from '../components/GalleryPosts';

export default class GalleryTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    console.log(navigation.state);
    const { type } = navigation.state.params;
    const { id } = navigation.state.params.item;
    const { address } = navigation.state.params.item;
    if (type === 'hashtags') {
      axios
        .get(`${apiurl}fetch-tag-album.php?id=${id}`)
        .then(res => {
          console.log(res.data);
          this.setState({ data: res.data });
        })
        .catch(res => console.log(res.data));
    } else if (type === 'places') {
      axios
        .get(`${apiurl}fetch-place-album.php?place=${address}`)
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
      <View style={{flex: 1}}>
        {data.length !== 0 ? (
          <View>
            {data.status === 'success' ? (
              <FlatList
                data={data.medias}
                numColumns={4}
                keyExtractor={item => item.post_id}
                renderItem={({ item }) => <GalleryPosts data={item} />}
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
