import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ActivityStream from '../components/ActivityStream';

// eslint-disable-next-line react/prefer-stateless-function
class ProfileActivityPosts extends Component {
  componentDidMount() {
    console.log(this.props.posts);
  }

  componentWillReceiveProps(b) {
    console.log(b.posts);
  }

  // componentDidUpdate() {
  //     console.log(this.props)
  // }
  render() {
    const { posts } = this.props;
    return (
      <View>
        <FlatList
          data={posts.data}
          initialNumToRender={2}
          removeClippedSubviews
          keyExtractor={item => item.post_id}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50
          }}
          renderItem={({ item }) => (
            <ActivityStream
              full_name={item.full_name}
              username={item.username}
              text={item.body}
              type={item.type}
              address={item.address}
              path={item.path}
              event_type={item.event_type}
              likes={item.likes}
              comments={item.comments}
              theirid={item.the_main}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.profileposts.profileposts
});

export default connect(mapStateToProps)(ProfileActivityPosts);
