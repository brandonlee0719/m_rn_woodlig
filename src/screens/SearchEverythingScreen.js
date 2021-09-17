import React, { Component } from 'react';
import { Text, View, StatusBar, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
export default class SearchEverythingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const { searchField } = this.state;
    this.props.navigation.navigate('SearchTabBar', {
      searchField
    });
  }

  searchSuggestions(text) {
    // console.log(text);
    // const { searchField } = this.state;
    // this.setState({ searchField: text });
    this.props.navigation.navigate('SearchTabBar', {
      searchField: text
    });
  }

  render() {
    const { searchField } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} />
        <View style={styles.headerStyle}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome5
              name="times"
              size={20}
              color="#000"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={{ flex: 5 }}>
            <TextInput
              placeholder="Search people, hastags etc"
              // multiline
              value={searchField}
              onChangeText={text => this.setState({ searchField: text })}
              onSubmitEditing={this.handleSearch}
            />
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <Text
              style={{ color: '#000', fontSize: 15, fontWeight: '700' }}
              onPress={this.handleSearch}>
              Search
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 50 }}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Suggestions</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
              {['act', 'actress', 'lugbe', 'kaduna', 'abuja'].map(e => (
                <Text
                  key={e}
                  style={styles.contentItem}
                  onPress={this.searchSuggestions.bind(this, e)}>
                  {e}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Previous searches</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 3, height: 0 },
    elevation: 3,
    shadowRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#ffffff'
  },
  contentHeader: {
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  contentTitle: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700'
  },
  contentItem: {
    color: '#0052ff',
    fontFamily: 'Poppins',
    fontSize: 12,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontWeight: '400'
  }
});
