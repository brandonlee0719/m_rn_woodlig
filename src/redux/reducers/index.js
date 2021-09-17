import { combineReducers } from 'redux';
import register from './register';
import login from './loginAuth';
import roles from './roles';
import accounttype from './accountType';
import individualform from './individualform';
import followerslist from './fetchfollowers';
import newpostnavigation from './newpostnavigation';
import addpost from './handleyourmind';
import userid from './userid';
import castingcallsdata from './postajob';
import profileAlbums from './profileAlbums';
import reviews from './fetchUserProfileReviews';
import followinglist from './fetchfollowing';
import profileposts from './profileActivityPosts';
import taggedposts from './profileTaggedPosts';
import profilepicture from './profilePicture';
import trendinghashtags from './fetchtrendinghashtags';
import exploreusers from './fetchExploreUsers';
import eventtypes from './eventType';
import activitystreamdata from './viewActivityStream';
import viewPostDetail from './viewPostDetails';
import fetchPostComments from './fetchPostComments';
import fetchProductionType from './fetchProductionType';

export default combineReducers({
  register,
  login,
  roles,
  accounttype,
  individualform,
  followerslist,
  newpostnavigation,
  addpost,
  userid,
  profilepicture,
  castingcallsdata,
  profileAlbums,
  reviews,
  followinglist,
  profileposts,
  taggedposts,
  trendinghashtags,
  exploreusers,
  eventtypes,
  activitystreamdata,
  viewPostDetail,
  fetchPostComments,
  fetchProductionType
});
