import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { WhiteSpace } from '@ant-design/react-native';
import LinearGradient from 'react-native-linear-gradient';

class SegmentedView extends Component<*, *> {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      selectedIndices: [0],
      customStyleIndex: 0
    };
  }

  handleSingleIndexSelect = (index: number) => {
    this.setState(prevState => ({ ...prevState, selectedIndex: index }));
  };

  handleMultipleIndexSelect = (index: number) => {
    const { selectedIndices } = this.state;

    if (selectedIndices.includes(index)) {
      this.setState(prevState => ({
        ...prevState,
        selectedIndices: selectedIndices.filter(i => i !== index)
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        selectedIndices: [...selectedIndices, index]
      }));
    }
  };

  handleCustomIndexSelect = (index: number) => {
    this.setState(prevState => ({ ...prevState, customStyleIndex: index }));
  };

  render() {
    const { selectedIndex, selectedIndices, customStyleIndex } = this.state;
    return (
      <LinearGradient
        colors={['pink', 'white']}
        style={{ flex: 1, justifyContent: 'center', borderRadius: 30 }}>
        <View style={styles.container}>
          <SegmentedControlTab
            values={['INDIVIDUAL', 'BUSINESS']}
            selectedIndex={customStyleIndex}
            onTabPress={this.handleCustomIndexSelect}
            tabsContainerStyle={{ height: 50 }}
            tabStyle={{
              borderWidth: 1,
              borderColor: 'transparent',
              backgroundColor: 'transparent'
            }}
            tabTextStyle={{
              color: '#444444',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
              opacity: 0.5
            }}
            activeTabTextStyle={{ color: '#ffff', fontSize: 20, opacity: 1 }}
            activeTabStyle={{ backgroundColor: 'transparent' }}
            tabsContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 1 }}
          />
          {customStyleIndex === 0 && <Text style={styles.tabContent}> Tab one</Text>}
          {customStyleIndex === 1 && <Text style={styles.tabContent}> Tab two</Text>}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    borderRadius: 10,
    margin: 'auto'
  },
  tabViewText: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 50,
    fontSize: 18
  },
  titleText: {
    color: '#444444',
    padding: 20,
    fontSize: 14,
    fontWeight: '500'
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: '#444444'
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24
  },
  activeTabStyle: {
    backgroundColor: '#D52C43'
  },
  tabTextStyle: {
    color: '#D52C43'
  }
});

export default SegmentedView;
