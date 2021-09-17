import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  TextInput,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../config.json';
import PostAJob from './PostAJob';
import MyPostedJobs from './MyPostedJobs.js';
import AppliedJobs from './AppliedJobs.js';
import CalendarView from './CalendarView';
import NoCastingCalls from './NoCastingCalls';

const Customon = createIconSetFromFontello(fontelloConfig);

const { height, width } = Dimensions.get('window');
// eslint-disable-next-line react/prefer-stateless-function
export default class AddCastingCalls extends Component {
  constructor(props) {
    super(props);
    this.state = { menustate: 'postajob' };
  }

  componentDidMount() {
    const { navigation } = this.props
    const menustatus = navigation.getParam('menustatus');
    this.setState({ menustate: menustatus })
  }

  render() {
    const { menustate } = this.state;
    return (
      <View style={{}}>
        <StatusBar translucent={false} backgroundColor="#eeeeee" barStyle="dark-content" />
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            width,
            backgroundColor: '#ffff',
            borderTopWidth: 0.5,
            borderTopColor: '#f1f1f1',
            elevation: 4,
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}>
          <View style={styles.menubutton}>
            <TouchableOpacity
              onPress={() => this.setState({ menustate: 'postajob' })}
              style={{ alignItems: 'center' }}
            >
              <Customon name="plus-circle" size={17.6} />
              <Text style={styles.menutext}>Post a Job</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menubutton}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => this.setState({ menustate: 'mypostedjobs' })}
            >
              <Customon name="file-upload" size={17.8} />
              <Text style={styles.menutext}>My Posted Jobs</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menubutton}>
            <TouchableOpacity
              onPress={() => this.setState({ menustate: 'appliedjobs' })}
              style={{ alignItems: 'center' }}
            >
              <Customon name="paper-plane" size={16.4} />
              <Text style={styles.menutext}>My Submissions</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lastmenubutton}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => this.setState({ menustate: 'calendarview' })}
            >
              <Customon name="calendar-star" size={17.6} />
              <Text style={{ fontSize: 13 }}>Calendar View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width }}>
          {menustate === 'postajob' && <PostAJob />}
          {menustate === 'mypostedjobs' && <MyPostedJobs />}
          {menustate === 'appliedjobs' && <AppliedJobs />}
          {menustate === 'calendarview' && <NoCastingCalls />}
          {/* <View style={{ height: 200 }} /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menutext: {
    fontSize: 9,
    fontFamily: 'Poppins-Meduim'
  },
  menubutton: { flex: 1, alignItems: 'center' },
  lastmenubutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderTopColor: '#f1f1f1',
    height: 60
  },
  titlestyle: {
    fontSize: 20
  }
});
