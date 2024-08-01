import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import EachPost from '../components/EachPost';
import { creatorGallery } from '.';

function MediaPosts({ userId }) {
  const [mediaPosts, setMediaPosts] = useState([]);


  useEffect(() => {
    async function fetchMediaPosts(userId) {
      try {
        const response = await axiosInstance.get(`/posts/user_id=${userId}`);
        // no attachment file in the post json
        const media = response.data.filter(post => post.attachment_file); 
        if (media.length === 0) {
          setMediaPosts(creatorGallery); // Use default media if no posts are found
        } else {
          setMediaPosts(media);
        }
      } catch (error) {
        console.error("Error fetching media posts:", error);
      }
    }


    if (userId) {
      fetchMediaPosts();
    }
  }, [userId]);

  return (
    <div className="space-y-4">
      {mediaPosts.length > 0 ? (
        mediaPosts.map((post, index) => (
          <EachPost key={index} post={post}   user_id={userId}/> // Pass the user data to EachPost
        ))
      ) : (
        <p>No media posts available.</p>
      )}
    </div>
  );
}

export default MediaPosts;
