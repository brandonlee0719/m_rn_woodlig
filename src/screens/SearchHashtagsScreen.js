import React, { Component } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SingleHashtag from '../components/SingleHashtag';
import { apiurl } from '../constants/config';

export default class SearchHashtagsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const keyword = this.props.navigation.state.params.searchField;
    axios
      .get(`${apiurl}search-tags.php?keyword=${keyword}`)
      .then(res => {
        console.log(res.data, keyword);
        this.setState({ data: res.data });
      })
      .catch(res => console.log(res.data));
  }

  render() {
    const { data } = this.state;
    return (
      <View>
        {data.length !== 0 ? (
          <View>
            {data.status === 'success' ? (
              <FlatList
                data={data.tags}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <SingleHashtag item={item} />}
              />
            ) : (
              <View>
                <Text style={{ fontSize: 20, color: 'black' }}>
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
