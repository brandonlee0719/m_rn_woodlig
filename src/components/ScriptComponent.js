import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import { Avatar, Menu, Divider } from 'react-native-paper';
import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { postValues } from '../redux/actions/handleYourMind';
import fontelloConfig from '../config.json';

const Customon = createIconSetFromFontello(fontelloConfig);
const defaultStyles = getDefaultStyles();

const { width, height } = Dimensions.get('window');

class ScriptComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      // value: [getInitialObject()],
      visible: false,
      privacy: 'public',
      type: 'script',
      synopsis: [getInitialObject()],
      synopsis_author: '',
      title: ''
    };

    this.editor = null;
  }

  componentDidUpdate() {
    const synopsis = this.state.synopsis[0].content[0].text;
    const { privacy, synopsis_author, title, type } = this.state;
    const datum = { privacy, synopsis, synopsis_author, title, type };
    this.props.postValues(datum);
  }

  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = synopsis => {
    this.setState({
      synopsis
    });
  };

  render() {
    const { privacy, synopsis, synopsis_author, title, type } = this.state;
    return (
      <ScrollView contentContainerStyle={{ height, padding: 0 }}>
        <View
          style={{
            backgroundColor: '#eeeeee',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0
          }}>
          <View
            style={{
              height: '90%',
              width: '95%',
              marginTop: '-7%',
              backgroundColor: 'white',
              borderRadius: 25
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image
                  size={50}
                  source={require('../images/Avatar_invisible_circle_1.png')}
                />
                <Text style={{ color: '#bcc5d3', fontFamily: 'Poppins-Medium', fontSize: 10 }}>
                  @Humphrey_jerome
                </Text>
              </View>

              {/*<Customon name="quill_outline" color="grey" size={20} style={{ paddingRight: 20 }} />*/}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingRight: 30
                }}>
                <Menu
                  visible={this.state.visible}
                  onDismiss={() => this.setState({ visible: false })}
                  anchor={
                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => this.setState({ visible: true })}>
                      <FontAwesome5 name={privacy === 'private' ? 'lock' : 'lock-open'} size={16} />
                      <Text
                        style={{
                          textAlignVertical: 'center',
                          textTransform: 'capitalize',
                          marginHorizontal: 3,
                          fontFamily: 'Poppins-Meduim',
                          fontSize: 13,
                          marginLeft: 5,
                          color: '#808080'
                        }}>
                        {privacy}
                      </Text>
                      <FontAwesome5 name="caret-down" size={16} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                  }>
                  <Menu.Item
                    onPress={() => this.setState({ privacy: 'public', visible: false })}
                    title="public"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => this.setState({ privacy: 'private', visible: false })}
                    title="private"
                  />
                </Menu>
              </View>
            </View>
            <View style={{ flex: 3 }}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Script Title</Text>
                <TextInput
                  placeholder="write the title of your script here"
                  style={styles.inputStyles}
                  value={title}
                  onChangeText={title => this.setState({ title })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Script Synopsis By:</Text>
                <TextInput
                  placeholder="write the your synopsis here"
                  onChangeText={synopsis_author => this.setState({ synopsis_author })}
                  value={synopsis_author}
                  style={styles.inputStyles}
                />
              </View>
            </View>
            <View style={{ flex: 6, paddingHorizontal: 10 }}>
              <View style={{ flex: 1 }}>
                <CNToolbar
                  size={28}
                  bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
                  italic={<Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>}
                  underline={<Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>}
                  lineThrough={
                    <Text style={[styles.toolbarButton, styles.lineThroughButton]}>S</Text>
                  }
                  body={<Text style={styles.toolbarButton}>T</Text>}
                  title={<Text style={styles.toolbarButton}>h1</Text>}
                  heading={<Text style={styles.toolbarButton}>h3</Text>}
                  ul={<Text style={styles.toolbarButton}>ul</Text>}
                  ol={<Text style={styles.toolbarButton}>ol</Text>}
                  selectedTag={this.state.selectedTag}
                  selectedStyles={this.state.selectedStyles}
                  onStyleKeyPress={this.onStyleKeyPress}
                />
              </View>
              <View style={styles.main}>
                <CNRichTextEditor
                  ref={input => (this.editor = input)}
                  onSelectedTagChanged={this.onSelectedTagChanged}
                  onSelectedStyleChanged={this.onSelectedStyleChanged}
                  value={synopsis}
                  style={{ backgroundColor: '#fff' }}
                  styleList={defaultStyles}
                  onValueChanged={this.onValueChanged}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputStyles: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginTop: -10,
    fontFamily: 'Poppins-Meduim',
    fontSize: 10
  },
  inputLabel: {
    color: '#414141',
    fontSize: 20,
    fontFamily: 'Poppins-Meduim'
  },

  inputContainer: {
    paddingHorizontal: 10,
    marginBottom: 10
  },
  main: {
    flex: 7,
    // height: 150,
    borderWidth: 1,
    borderColor: '#dedede',
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'stretch'
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center'
  },
  italicButton: {
    fontStyle: 'italic'
  },
  boldButton: {
    fontWeight: 'bold'
  },
  underlineButton: {
    textDecorationLine: 'underline'
  },
  lineThroughButton: {
    textDecorationLine: 'line-through'
  }
});

export default connect(
  null,
  { postValues }
)(ScriptComponent);
