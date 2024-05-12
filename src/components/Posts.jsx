import React, { useState, useEffect } from 'react';
import EachPost from "./EachPost";
import LoadingSpinner from './LoadingSpinner';  // Assuming you'll use it
import Header from './Header'  // Assuming Navbar is used here

import DbHelper from "../utils/DbHelper";

function Posts({ user_id }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    async function getPosts() {
      if (!user_id) {
        // Optionally handle the case where user_id is absent
        setError('User ID is required.');
        return;
      }

      try {
        setLoading(true);
        const posts = await new DbHelper().getPostsByUserID(user_id);
        if (posts.length === 0) {
          setError('No posts found.'); // Handling no posts found
        } else {
          setPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, [user_id]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="dialog-container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto gap-8 h-auto">
      {posts.length > 0 ? (
        posts.map((post) => (
          <EachPost key={post.user_id} post={post} />
        ))
      ) : (
        <div>No posts available.</div> // Handling case where there are no posts
      )}
    </div>
  );
}

export default Posts;
