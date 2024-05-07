import { useState, useEffect } from 'react';
import DbHelper from '../utils/DbHelper';
import { getAppUser, calculateTimeAgo } from '../utils/Utils';
import AppUser from '../models/AppUser';
const usePostDetails = (post) => {

  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");
  const [likedByUser, setLikedByUser] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');
  const [user, setUser] = useState(new AppUser());
  const dbHelper = new DbHelper();

  useEffect(() => {
    if (post.getLikes()) {
      const likes = JSON.parse(post.getLikes()).length;
      setLikesCount(likes > 0 ? `${likes}` : '');
      setLikedByUser(JSON.parse(post.getLikes()).includes(post.getUserId()));
    }
  }, [post]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
      const count = await dbHelper.getCommentCountByPostID(post.getId());
      console.log("Comment count:", count); // Log the value here
      setCommentsCount(count !== 0 ? `${count.length}` : '');
    };

    fetchCommentsCount();
  }, [post.getId()]);


  const updateLikes = async () => {
    if (!user || !user.getUserId()) {
      console.error("User or user ID is not available.");
      return;
  }
    let likes = JSON.parse(post.getLikes() || "[]");
    if (likes.includes(user.getUserId())) {
      likes = likes.filter(id => id !== user.getUserId());
      setLikedByUser(false);
    } else {
      likes.push(user.getUserId());
      setLikedByUser(true);
    }
    post.setLikes(JSON.stringify(likes));
    await dbHelper.updatePost(post);
    setLikesCount(`${likes.length}`);
  };
  const fetchUser = async () => {
    let user = await getAppUser();
  
    // Check if user is null before accessing properties
    if (user !== null) {
      user.setCurrency(user.currency || 'NGN');
      user.setCurrencySymbol(user.currency_symbol || "\u20A6");
      setUser(user);
    }
  };
  fetchUser();
  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
    setTimeAgo(calculateTimeAgo(post.getCreationDate()));
  }, []);

  const getUser = async () => {
    var _u = await dbHelper.getAppUserByID(post.getUserId());
    if (_u !== null) {
      var likes = post.getLikes();
      var likesArray = JSON.parse(likes);
      if (likesArray !== null) {
        if (likesArray.includes(_u.getUserId())) {
          setLikedByUser(true);
        }
      }
      setPostOwner(_u);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return { likesCount, commentsCount, likedByUser, updateLikes, getUser, setTimeAgo, fetchUser, setCommentsCount };
};

export default usePostDetails;
