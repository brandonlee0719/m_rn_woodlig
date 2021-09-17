import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image
} from "react-native";
import axios from "axios";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { Dropdown } from "react-native-material-dropdown";
import { Switch } from "react-native-paper";
import { connect } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import fontelloConfig from "../config.json";
import { apiurl } from "../constants/config.js";

const Customon = createIconSetFromFontello(fontelloConfig);

class SettingsNotifications extends Component {
  state = {
    settingsData: [],
    post_like: "0",
    post_comment: "0",
    post_share: "0",
    comment_like_reply: "0",
    message_notification: "0",
    requests: "0",
    follows: "0",
    ratings: "0",
    subscribe: "0"
  };

  componentDidMount() {
    const { user_id } = this.props;
    axios
      .get(`${apiurl}fetch-setting-notifications.php?user_id=${user_id}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          settingsData: res.data,
          post_like: res.data.user_notification_settings.post_like,
          post_comment: res.data.user_notification_settings.post_comment,
          post_share: res.data.user_notification_settings.post_share,
          comment_like_reply:
            res.data.user_notification_settings.comment_like_reply,
          message_notification:
            res.data.user_notification_settings.message_notification,
          requests: res.data.user_notification_settings.requests,
          follows: res.data.user_notification_settings.follows,
          ratings: res.data.user_notification_settings.ratings,
          subscribe: res.data.user_notification_settings.subscribe
        });
      })
      .catch(res => console.log(res.data));
  }

  postLike = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ post_like: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=post_like&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ post_like: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=post_like&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  postComment = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ post_comment: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=post_comment&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ post_comment: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=post_comment&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  postShare = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ post_share: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=post_share&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ post_share: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=31&type=post_share&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  commentReply = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ comment_like_reply: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=comment_like_reply&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ comment_like_reply: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=comment_like_reply&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  messageNotification = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ message_notification: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=message_notification&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ message_notification: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=message_notification&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  requests = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ requests: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=requests&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ requests: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=requests&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  follows = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ follows: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=follows&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ follows: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=follows&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  ratings = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ ratings: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=ratings&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ ratings: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=ratings&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  subscribe = value => {
    const { user_id } = this.props;
    if (value === false) {
      this.setState({ subscribe: "0" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=subscribe&value=0`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    } else {
      this.setState({ subscribe: "1" });
      axios
        .get(
          `${apiurl}update-setting-notification.php?user_id=${user_id}&type=subscribe&value=1`
        )
        .then(res => console.log(res.data))
        .catch(res => console.log(res.data));
    }
  };

  render() {
    const {
      isSwitchOn,
      settingsData,
      post_like,
      post_comment,
      post_share,
      comment_like_reply,
      message_notification,
      requests,
      follows,
      ratings,
      subscribe
    } = this.state;
    if (settingsData.status === 'success') {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerArrow}>
              <TouchableOpacity>
                <Customon
                  style={styles.arrowback}
                  name="long-arrow-left"
                  size={15}
                  onPress={() => this.props.navigation.goBack()}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitle}>
              <Text style={styles.title}> Setting > Notifications</Text>
            </View>
          </View>

          <ScrollView>
            <View style={styles.greyComponent}>
              <Text style={styles.greyText}>Activity Stream </Text>
            </View>

            <View style={styles.activeComponent}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Post Like</Text>
                <Text style={styles.activeText2}>
                  Get notified when someone likes your post
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.postLike}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={post_like !== "0"}
                />
              </View>
            </View>

            <View style={styles.activeComponent}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Post Comment</Text>
                <Text style={styles.activeText2}>
                  Get notified when someone comments your post
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.postComment}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={post_comment !== "0"}
                />
              </View>
            </View>

            <View style={styles.activeComponent}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Share</Text>
                <Text style={styles.activeText2}>
                  Get notified when someone shares your post
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.postShare}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={post_share !== "0"}
                />
              </View>
            </View>

            <View style={styles.activeComponent2}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Comment Like & Reply</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.commentReply}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={comment_like_reply !== "0"}
                />
              </View>
            </View>

            <View style={styles.greyComponent}>
              <Text style={styles.greyText}>Messages </Text>
            </View>

            <View style={styles.activeComponent3}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Message Notification</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.messageNotification}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={message_notification !== "0"}
                />
              </View>
            </View>

            <View style={styles.greyComponent}>
              <Text style={styles.greyText}>Connect </Text>
            </View>

            <View style={styles.activeComponent3}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Requests</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.requests}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={requests !== "0"}
                />
              </View>
            </View>

            <View style={styles.activeComponent3}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Follows</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.follows}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={follows !== "0"}
                />
              </View>
            </View>

            <View style={styles.activeComponent3}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Ratings</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.ratings}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={ratings !== "0"}
                />
              </View>
            </View>

            <View style={styles.greyComponent}>
              <Text style={styles.greyText}>Email Notifications </Text>
            </View>

            <View style={styles.activeComponent4}>
              <View style={styles.wrapper}>
                <Text style={styles.verifyText}>Subscribe</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch
                  onValueChange={this.subscribe}
                  onTintColor="#0ce0b5"
                  style={{
                    height: 15,
                    marginRight: 10
                  }}
                  thumbTintColor="#cccc"
                  tintColor="#000"
                  value={subscribe !== "0"}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  greyComponent: {
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 10
  },

  wrapper: {
    paddingLeft: 10
  },

  activeComponent2: {
    width: Dimensions.get("window").width,

    height: 47,
    borderColor: "#eeeeee",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  activeComponent3: {
    width: Dimensions.get("window").width,

    height: 47,
    borderColor: "#eeeeee",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 10,

    flexDirection: "row",
    justifyContent: "space-between"
  },

  activeComponent4: {
    width: Dimensions.get("window").width,

    height: 47,
    borderColor: "#eeeeee",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between"
  },

  activeComponent: {
    width: Dimensions.get("window").width,

    height: 78,
    borderColor: "#eeeeee",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  activeText2: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#808080"
  },

  buttoncontainer3: {
    width: 80,
    height: 25,
    borderRadius: 25,
    borderColor: "#0ce0b5",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#dedede",
    justifyContent: "center",
    alignItems: "center"
  },

  greyText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#808080"
  },
  header: {
    width: Dimensions.get("window").width,
    height: 60,
    backgroundColor: "#ffff",
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: "row",
    padding: 15,

    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },

  title: {
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontSize: 16
  },

  arrowback: {
    color: "#000"
  },
  headerArrow: {
    flex: 1
  },

  headerTitle: {
    flex: 4,
    marginLeft: 35
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  verifyText: {
    color: "#000",
    fontFamily: "Poppins-Medium",
    fontSize: 15
    // width: 195,
    // flexWrap: 'wrap',
  },

  verify: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    marginTop: 15,
    height: 47,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "#ffff",
    padding: 10
  },

  buttoncontainer: {
    width: 71,
    height: 24,
    backgroundColor: "#fb0201",
    shadowRadius: 2,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000"
  }
});

const mapStateToProps = state => ({
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(mapStateToProps)(SettingsNotifications);
