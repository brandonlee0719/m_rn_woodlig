import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import { apiurl } from '../constants/config';
import ViewCastingCalls from '../components/ViewCastingCalls';

export default class MyPostedJobs extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillMount() {
    axios
      .get(`${apiurl}fetch-user-posted-jobs.php?user_id=3`)
      .then(res => this.setState({ data: res.data.data }))
      .catch(res => console.table(res.data));
  }

  componentDidUpdate() {
    console.log(this.state.data);
  }

  render() {
    const { data } = this.state;
    return (
      <View style={{ marginBottom: 120, backgroundColor: '#eeeeee' }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#eeeeee',
            marginVertical: 20
          }}>
          {data.map((item, index) => (
            <ViewCastingCalls
              key={index}
              title={item.title}
              roles_count={item.roles_count}
              production_type={item.production_type}
              formatted_address={item.country}
              description={item.description}
              skill={item.skill}
              active={item.active}
              postid={item.id}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
