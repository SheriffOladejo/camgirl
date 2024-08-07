import { useState, useEffect, useCallback } from 'react';
import DbHelper from '../utils/DbHelper';
// import { getAppUser, calculateTimeAgo } from '../utils/Utils';
import AppUser from '../models/AppUser';
import axiosInstance from '../api/axiosInstance'
const usePostDetails = ({post}) => {
  const [likesCount, setLikesCount] = useState("");
  const [commentsCount, setCommentsCount] = useState("");
  const [likedByUser, setLikedByUser] = useState(false);
  const [timeAgo, setTimeAgo] = useState('');
  const [user, setUser] = useState(new AppUser());
  const dbHelper = new DbHelper();
  
  // useEffect(() => {
  //   const post = new Post();
  //   if (post.getLikes()) {
  //     const likes = JSON.parse(post.getLikes()).length;
  //     setLikesCount(likes > 0 ? `${likes}` : '');
  //     setLikedByUser(JSON.parse(post.getLikes()).includes(post.getUserId()));
  //   }
    
  //   const fetchCommentsCount = async () => {
  //     const count = await dbHelper.getCommentCountByPostID(post.getId());
  //     setCommentsCount(count !== 0 ? `${count.length}` : '');
  //   };
  //   fetchCommentsCount();
    
  //   const fetchUser = async () => {
  //     let user = await getAppUser();
  //     if (user !== null) {
  //       user.setCurrency(user.currency || 'NGN');
  //       user.setCurrencySymbol(user.currency_symbol || "\u20A6");
  //       setUser(user);
  //     }
  //   };
  //   fetchUser();
    
  //   setTimeAgo(calculateTimeAgo(post.getCreationDate()));
    
  //   const getUser = async () => {
  //     const userId = post.getUserId()
  //     if (userId == null) return
  //     var _u = await dbHelper.getAppUserByID(post.getUserId());
  //     if (_u !== null) {
  //       var likes = post.getLikes();
  //       var likesArray = JSON.parse(likes);
  //       if (likesArray !== null) {
  //         if (likesArray.includes(_u.getUserId())) {
  //           setLikedByUser(true);
  //         }
  //       }
  //       setPostOwner(_u);
  //     }
  //   };
  //   getUser();
  // }, []);
  // useEffect(() => {
  //   const fetchPostDetails = async () => {
  //     try {
  //       // Fetch user data
  //       const userResponse = await axiosInstance.get(`users/${post.user_id}`);
  //       const userData = userResponse.data;
  //       const appUser = new AppUser(userData);
  //       setUser(appUser);

  //       // Set likes count and liked by user
  //       if (post.likes) {
  //         const likesArray = JSON.parse(post.likes);
  //         setLikesCount(likesArray.length > 0 ? `${likesArray.length}` : '');
  //         setLikedByUser(likesArray.includes(appUser.getUserId()));
  //       }

  //       // Fetch comments count
  //       const commentsCount = await dbHelper.getCommentCountByPostID(post.getId());
  //       setCommentsCount(commentsCount !== 0 ? `${commentsCount}` : '');

  //       // Calculate time ago
  //       setTimeAgo(calculateTimeAgo(post.creation_date));

  //     } catch (error) {
  //       console.error('Error fetching post details:', error);
  //     }
  //   };

  //   fetchPostDetails();
  // }, [post, dbHelper]);

  
  
  // const updateLikes = async () => {
  //   try {
  //     // Determine the user ID, use 123 as default if user ID is not available
  //     const userId = user.getUserId() || 123;
      
  //     const response = await axiosInstance.post(`/posts/${post.getId()}/likes`, {
  //       userId: userId,
  //     });
  
  //     if (response.status === 200) {
  //       // Update the likes count and liked status
  //       setLikesCount(response.data);
  //       setLikedByUser(response.data.likedByUser);
  //     }
  //   } catch (error) {
  //     console.error('Error updating likes:', error);
  //   }
  // };
  
  const updateLikes = () => {
    try {
      // // Determine the user ID, use 123 as default if user ID is not available
      // const userId = user.getUserId() || 123;
  
      // Increment the likes count locally
      const newLikesCount = Number(likesCount) + 1;
  
      // Update the likes count and liked status locally
      setLikesCount(newLikesCount);
      setLikedByUser(true);
  
      // // Optionally log the user ID for debugging
      // console.log('User ID:', userId);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };
  
  // const fetchUser = useCallback(async () => {
  //   let user = await getAppUser();
  //   if (user !== null) {
  //     user.setCurrency(user.currency || 'NGN');
  //     user.setCurrencySymbol(user.currency_symbol || "\u20A6");
  //     setUser(user);
  //   }
  // }, []);

  return { likesCount, commentsCount, likedByUser, updateLikes, setUser, setTimeAgo,  setCommentsCount };
};

export default usePostDetails;



