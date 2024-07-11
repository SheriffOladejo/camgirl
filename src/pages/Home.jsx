import React from 'react'
import Stories from '../components/Stories'
import { useState } from 'react'
import CreatePost from '../components/CreatePost'
import Filter from '../components/Filter'
import Posts from '../components/Posts'
import LoadingSpinner from '../components/LoadingSpinner';
import DbHelper from '../utils/DbHelper'


function Home() {
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifs, setShowGifs] = useState(false);
  const dbHelper = new DbHelper()
  const removeDialogs = async () => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
    }
    if (showGifs) {
      setShowGifs(false);
    }
    
  }
  return (
    <>
    <section onClick={removeDialogs} className='w-full h-full pt-4'>
       { loading && <LoadingSpinner/> }
       { !loading && ( <div>
      <Stories />
      <CreatePost />
      <Filter />

      <hr className="border-1 border-color-grey/40 my-[20px]" />
      <Posts />
      {/*  bottom nav */}
      
      </div>
        )}
    </section>
    </>
  )
}

export default Home;