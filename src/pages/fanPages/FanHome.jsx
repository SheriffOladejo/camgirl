import React from 'react'
import Stories from '../../components/Stories'
import Post from '../../components/Post'
import Filter from '../../components/Filter'


function FanHome() {
  return (
    <section className='px-4'>
      <Stories />
      <Post />
      <Filter />
   
      <hr className="border-1 border-color-lightGrey mt-6"/>
    </section>
  )
}

export default FanHome;