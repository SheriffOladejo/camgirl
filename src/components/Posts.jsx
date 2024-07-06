import React, { useState, useEffect, useRef } from 'react';
import EachPost from "./EachPost";
import LoadingSpinner from './LoadingSpinner'; 
import Header from './Header';  
import { placeholderPosts } from '.'; 
import DbHelper from "../utils/DbHelper";
import { getDataFromLocalStorage } from '../utils/Utils';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Posts({ user_id }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    async function getPosts() {
      if (!user_id) {
        setError('User ID is required.');
        return;
      }

      try {
        setLoading(true);
        const fetchedPosts = await new DbHelper().getPostsByUserID(user_id);
        const storedPosts = getDataFromLocalStorage('posts') || [];

        // Combine and sort posts by creation date, assuming posts have a `createdAt` field
        const combinedPosts = [...storedPosts, ...fetchedPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (combinedPosts.length === 0) {
          setPosts(placeholderPosts);
        } else {
          setPosts(combinedPosts);
          setVisiblePosts(combinedPosts.slice(0, 4)); // Show the first 4 posts initially
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

  useEffect(() => {
    const loadMorePosts = () => {
      if (loading) return;

      const totalVisible = visiblePosts.length;
      const morePosts = posts.slice(totalVisible, totalVisible + 4);

      if (morePosts.length > 0) {
        setVisiblePosts((prevPosts) => [...prevPosts, ...morePosts]);
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          loadMorePosts();
        }
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        onEnter: handleScroll,
      }
    });

    return () => {
      tl.kill();
    };
  }, [visiblePosts, posts, loading]);

  if (error) {
    return <div>Error: {error}</div>; 
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
    <div ref={containerRef} className="flex flex-col overflow-y-auto gap-8 h-auto" >
      {visiblePosts.length > 0 ? (
        visiblePosts.map((post) => (
          <EachPost key={post.id} post={post} />
        ))
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
}

export default Posts;
