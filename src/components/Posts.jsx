import EachPost from "./EachPost"
import { useState, useEffect} from 'react';

import Post from "../models/Post";
import AppUser from '../models/AppUser'
import DbHelper from "../utils/DbHelper";
// import LoadingSpinner from './LoadingSpinner'
function Posts() {
const dbHelper = new DbHelper()
  const post= new Post()
  const user = new AppUser()
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
   
  useEffect(() => {
    const getPosts = async () => {
      if (user !== null) {
        
        let user_id = user.user_id;
        let posts = await dbHelper.getPostsByUserID(user_id);
        setPosts(posts);
      }
      else {

      }
      setLoading(false);
    }

    getPosts();

  }, [user]);


  if (loading) {
    return (
      <div>
    <Navbar />
    <div className="dialog-container">
      <div className="profile-dialog">
        <LoadingSpinner/>
      </div>
    </div> 
  </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto gap-8 h-auto">
     {posts.map((item, index) => (
                <EachPost
                  key={index}
                  post={item}
                />
              ))}
         
    
    </div>
  )
}

export default Posts