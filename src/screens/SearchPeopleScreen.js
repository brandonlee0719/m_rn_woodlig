import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { apiurl } from '../constants/config';
import ExploreCards from '../components/ExploreCards';

export default class SearchPeopleScreen extends Component {
  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   const params = navigation.state;
  //   console.log(params);
  // };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const val = this.props.navigation.state.params.searchField;
    axios
      .get(`${apiurl}search-people.php?name=${val}`)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(res => console.log(res.data));
  }

  componentWillReceiveProps(b) {
    console.log(b.navigation);
  }

  render() {
    const { data } = this.state;
    return (
      <View>
        {data.length !== 0 ? (
          <View>
            {data.status === 'success' ? (
              <FlatList
                numColumns={4}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      backgroundColor: '#dedede, height: 400',
                      width: 20
                    }}
                  />
                )}
                data={data.people.sort(function(a, b) {
                  return 0.5 - Math.random();
                })}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ExploreCards
                    userType="follow"
                    full_name={item.full_name}
                    premium={item.premium}
                    data={item}
                    basedOn="nothing"
                    user_id={item.user_id}
                  />
                )}
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
