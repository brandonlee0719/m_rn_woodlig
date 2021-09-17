import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ActivityStream from '../components/ActivityStream';

// eslint-disable-next-line react/prefer-stateless-function
class ProfileActivityTags extends Component {
  componentDidMount() {
    console.log(this.props.taggedposts);
  }

  render() {
    const { taggedposts } = this.props;
    return (
      <View>
        <FlatList
          data={taggedposts.data}
          initialNumToRender={2}
          removeClippedSubviews
          keyExtractor={item => item.post_id}
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
  taggedposts: state.taggedposts.taggedposts
});

export default connect(mapStateToProps)(ProfileActivityTags);
