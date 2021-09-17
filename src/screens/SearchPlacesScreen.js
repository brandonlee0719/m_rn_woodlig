import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, Image, ActivityIndicator, FlatList } from 'react-native';
import SinglePlace from '../components/SinglePlace';
import { apiurl } from '../constants/config';

export default class SearchPlacesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const place = this.props.navigation.state.params.searchField;
    axios
      .get(`${apiurl}search-places.php?place=${place}`)
      .then(res => {
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
                data={data.places}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <SinglePlace item={item} />}
              />
            ) : (
              <View>
                <Text style={{ fontSize: 20, color: 'black' }}>
                  Your search does not match any place
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
