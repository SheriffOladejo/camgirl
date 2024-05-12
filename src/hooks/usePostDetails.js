import { useState, useEffect, useCallback } from 'react';
import DbHelper from '../utils/DbHelper';
import { getAppUser, calculateTimeAgo } from '../utils/Utils';
import AppUser from '../models/AppUser';
import Post from '../models/Post';
const usePostDetails = () => {
  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");
  const [likedByUser, setLikedByUser] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');
  const [user, setUser] = useState(new AppUser());
  const dbHelper = new DbHelper();
  
  useEffect(() => {
    const post = new Post();
    if (post.getLikes()) {
      const likes = JSON.parse(post.getLikes()).length;
      setLikesCount(likes > 0 ? `${likes}` : '');
      setLikedByUser(JSON.parse(post.getLikes()).includes(post.getUserId()));
    }
    
    const fetchCommentsCount = async () => {
      const count = await dbHelper.getCommentCountByPostID(post.getId());
      setCommentsCount(count !== 0 ? `${count.length}` : '');
    };
    fetchCommentsCount();
    
    const fetchUser = async () => {
      let user = await getAppUser();
      if (user !== null) {
        user.setCurrency(user.currency || 'NGN');
        user.setCurrencySymbol(user.currency_symbol || "\u20A6");
        setUser(user);
      }
    };
    fetchUser();
    
    setTimeAgo(calculateTimeAgo(post.getCreationDate()));
    
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
    getUser();
  }, []);

  const updateLikes = async () => {
    if (!user || !user.getUserId()) {
      console.error("User or user ID is not available.");
      return;
    }
    // Update likes logic
  };

  const fetchUser = useCallback(async () => {
    let user = await getAppUser();
    if (user !== null) {
      user.setCurrency(user.currency || 'NGN');
      user.setCurrencySymbol(user.currency_symbol || "\u20A6");
      setUser(user);
    }
  }, []);

  return { likesCount, commentsCount, likedByUser, updateLikes, setUser, setTimeAgo, fetchUser, setCommentsCount };
};

export default usePostDetails;



