import React from 'react'
import Stories from '../../components/Stories'
import CreatePost from '../../components/CreatePost'
import Filter from '../../components/Filter'
import Posts from '../../components/Posts'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { scrollToTop } from '../../utils/Utils';
import MobileFooterNav from '../../components/MobileFooterNav'
import AppUser from '../../models/AppUser';
import DbHelper from '../../utils/DbHelper';
import { initializeApp } from "firebase/app";
import { getAppUser, addDataIntoCache, getDataFromLocalStorage } from '../../utils/Utils';
function Home() {
 
  return (
    <section className='w-full '>
      <Stories />
      <CreatePost />
      <Filter />

      <hr className="border-1 border-color-grey/40 my-[20px]" />
      <Posts />
      {/*  bottom nav */}
      
    </section>
  )
}

export default Home;