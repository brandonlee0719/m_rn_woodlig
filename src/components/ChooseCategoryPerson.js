import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import fontelloConfig from "../config.json";
import { imageurl } from "../constants/config.js";
import { selectedBusinessRoles } from "../redux/actions/rolesAction.js";

const Customon = createIconSetFromFontello(fontelloConfig);

export default class ChooseCategoryPerson extends Component {
  state = {
    added: false
  };

  //   componentDidUpdate() {
  //     const { item, addUser } = this.props;
  //     addUser(item);
  //   }

  addPerson = () => {
    const { item, addUser } = this.props;
    const { added } = this.state;
    addUser(item);
    if (added === false) {
      this.setState({ added: true });
    } else {
      this.setState({ added: false });
    }
  };

  render() {
    const { item } = this.props;
    const { added } = this.state;
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.addedView}>
          <View style={styles.profileSection}>
            <Image
              source={
                item.profile_thumb === ""
                  ? require("../images/Avatar_invisible_circle_1.png")
                  : {
                      uri: `${imageurl}/${item.profile_thumb}`
                    }
              }
              style={styles.img}
            />
            <Text style={styles.title}>{item.full_name}</Text>
            {added === false ? (
              <TouchableOpacity onPress={this.addPerson}>
                <Customon style={styles.arrowback3} name="plus" size={16} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.addPerson}>
                <View style={styles.addFunds2}>
                  <Text style={styles.addFundsBtn}>Added</Text>
                </View>
              </TouchableOpacity>
            )}
            <View style={styles.lineBottom} />
          </View>
        </View>
        <View style={styles.lineBottom2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc"
  },
  lineBottom: {
    marginTop: 10,
    width: 60,
    height: 1,
    borderColor: "#e7e4e9",
    borderStyle: "solid",
    borderWidth: 1
  },

  lineBottom2: {
    width: 1,
    marginLeft: -20,
    height: 110,
    borderRightColor: "#e7e4e9",
    // borderStyle: 'solid',
    borderWidth: 0.5,
    marginTop: 20
  },

  title: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Poppins-Medium",
    color: "#000"
  },
  profileSection: {
    padding: 5,
    width: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  addFundsBtn: {
    fontFamily: "Poppins-Medium",
    // textAlign: 'center',
    color: "#ffffff",
    // marginTop: 75,
    // marginLeft: 8,
    fontSize: 8
  },

  addFunds2: {
    padding: 3,
    width: 45,
    marginTop: 5,
    height: 16,
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fb0201"
  },

  img: {
    width: 60,
    height: 60,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 50
  },
  addedView: {
    padding: 15
    // marginTop: 15,
  },
  line: {
    width: 117,
    height: 1,
    borderColor: "#e7e4e9",
    borderStyle: "solid",
    borderWidth: 2,
    marginTop: 10
  },
  search: {
    width: 343,
    height: 41,
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowOffset: { width: 3, height: 0 },
    shadowRadius: 6,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0
  },
  header2: {
    width: Dimensions.get("window").width,
    // height: 60,
    backgroundColor: "#ffff",
    //  justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    padding: 15,
    shadowOffset: { width: 3, height: 0 },
    elevation: 5
  },
  header: {
    // width: Dimensions.get('window').width,
    //  height: 60,
    // backgroundColor: '#ffff',
    justifyContent: "space-between",
    // alignItems: 'center',
    flexDirection: "row",
    // padding: 15,
    shadowOffset: { width: 3, height: 0 }
    //  elevation: 5,
  },
  titleHeader: {
    //  width: 375,
    // marginTop: 20,
    height: 112,
    backgroundColor: "#ffffff",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width
  },

  arrowback3: {
    color: "#fb0201"
  },
  arrowback: {
    color: "#000"
  }
});
