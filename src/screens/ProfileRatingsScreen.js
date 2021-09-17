import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ProfileRating from '../components/ProfileRating';
import { fetchUserProfileReviews } from '../redux/actions/fetchUserProfileReview';

class ProfileRatingsScreen extends Component {
  componentWillMount() {
    const { user_id, theirid } = this.props;
    // const user_id = 3;
    const user_profile_id = theirid;
    const data = { user_id, user_profile_id };
    this.props.fetchUserProfileReviews(data);
  }

  // componentDidMount() {
  //   console.log(this.props.reviews);
  // }

  // componentDidUpdate(a) {
  //   console.log(this.props.reviews);
  // }

  render() {
    const { reviews } = this.props;
    return (
      <View style={{ flex: 1, marginVertical: 20 }}>
        <FlatList
          data={reviews.user_review}
          initialNumToRender={2}
          keyExtractor={(item, index) => item + index}
          //   onViewableItemsChanged={this.onContentSizeChange}
          renderItem={({ item }) => (
            <ProfileRating
              rating={item.rating}
              review={item.review}
              fullname={item.full_name}
              username={item.username}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews.reviews,
  user_id: state.userid.id,
  profilepicture: state.profilepicture.picture
});

export default connect(
  mapStateToProps,
  { fetchUserProfileReviews }
)(ProfileRatingsScreen);
