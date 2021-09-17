/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { apiurl } from '../constants/config';
import ViewCastingCalls from '../components/ViewCastingCalls';

export default class AppliedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {
    axios
      .get(`${apiurl}fetch-user-applied-jobs.php?user_id=3`)
      .then(res => this.setState({ data: res.data.casting_call }))
      .catch(res => console.log(res.data));
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <ScrollView contentInsetAdjustmentBehavior="always">
          <View style={{ marginTop: 20 }}>
            {data.map((item, index) => (
              <ViewCastingCalls
                key={index}
                title={item.title}
                roles_count={item.roles_count}
                production_type={item.production_type}
                formatted_address={item.formatted_address}
                description={item.description}
                skill={item.skill}
                active={item.active}
                postid={item.id}
              />
            ))}
          </View>
          {/* <View style={{ height: 40 }} />  */}
        </ScrollView>
      );
    }
    return <ActivityIndicator color="black" size="large" />;
  }
}
