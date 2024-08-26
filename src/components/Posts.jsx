import React, { useState, useEffect, useRef, useContext } from 'react';
import PostCard from './PostCard';
import LoadingSpinner from './LoadingSpinner';
import Header from './Header';
import DbHelper from '../utils/DbHelper';
import { getDataFromLocalStorage } from '../utils/Utils';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { placeholderPosts } from '.';
import { AuthContext } from '../context/authContext';

// gsap.registerPlugin(ScrollTrigger);

function Posts({ addPost, posts= [], setPosts }) {
  const [loading, setLoading] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () =>  {
      setLoading(true);
      try {
        const dbHelper = new DbHelper()
        const fetchedPosts = await dbHelper.getPosts();

        if (fetchedPosts.length === 0) {
          setPosts(placeholderPosts);
        } else {
          setPosts(fetchedPosts);
        }
        
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <div>
       
        <div className="dialog-container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col overflow-y-auto gap-8 h-auto">
       {posts.map((post) => {
       return(
        <PostCard key={post.id} post={post} user_id={currentUser?.id} />)
      })}
       {placeholderPosts.map((placeholder) => {
         return <PostCard key={placeholder.id} post={placeholder} user_id={currentUser?.id} />
       })}
     

    </div>
  );
}

export default Posts;
