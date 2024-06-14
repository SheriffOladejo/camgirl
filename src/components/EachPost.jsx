import DbHelper from '../utils/DbHelper'
import usePostDetails from '../hooks/usePostDetails';

import PostCommentModel from '../models/PostCommentModel'

import TextareaAutosize from '../../node_modules/react-textarea-autosize';
import Menu from './Menu'
import { useRef, useState, useEffect } from 'react';
import TipModal from './TipModal'
import { useNavigate } from 'react-router-dom';
import { getAppUser, getDataFromLocalStorage } from '../utils/Utils';
import AppUser from '../models/AppUser';
function EachPost({ post, postReaction }) {

  const dbHelper = new DbHelper();
  const user = getAppUser()
  let verified = true
  const navigate = useNavigate();
  const textareaRef = useRef(null);


  const { likesCount, commentsCount, likedByUser, updateLikes, setCommentsCount } = usePostDetails(post);
  // const [postOwner, setPostOwner] = useState(dbHelper.getAppUserByID(user_id));
  const [showComment, setShowComment] = useState(false);

  const [postOwner, setPostOwner] = useState(undefined)
  const [comment, setComment] = useState('');

  const [showTipModal, setShowTipModal] = useState(false);
  const [showMenu , setShowMenu] = useState(false)
 

    // Function to close the menu
    const closeMenu = () => {
      setShowMenu(false);
  
    };
    const openMenu = () => {
      setShowMenu(true);
  
    };
  const makeComment = async (e) => {

    let user_ids = JSON.stringify([]);
    let privacy = -1;
    let post_comment = new PostCommentModel(
      -1,
      user.getUserId(),
      comment,
      Date.now(),
      "false",
      post.getId(),
      "hey",
      "hy",
      user_ids,
      privacy
    );

    await dbHelper.createComment(post_comment);
    setComment("");
    let c = Number(commentsCount) + 1;
    setCommentsCount(`${c}`);
  }
  const openComment = (event) => {
    setShowComment(true);
    let post_id = post.getId();
    let owner_id = postOwner.getUserId();
    navigate('/post-comment', {
      state: {
        post_id,
        owner_id
      }
    });
  }
  const formatCommentCount = () => {
    if (commentsCount <= 1) {
      return `${commentsCount} Comment`;
    } else {
      return `${commentsCount} Comments`;
    }
  };
  const formatLikesCount = (count) => {
    if (count === 1) {
      return `${count} Comment`;
    } else {
      return `${count} Comments`;
    }
  };
  useEffect(() => {
    async function fetchPostOwner() {
      try {
        const owner = await dbHelper.getAppUserByID(post.getUserId());
        setPostOwner(owner);
        console.log(postOwner)
      } catch (error) {
        console.error("Error fetching post owner:", error);
      }
    }

    fetchPostOwner();
  }, [post, dbHelper]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && comment.trim()) {
      event.preventDefault();
      makeComment();
    }
  };
  // Function to close the tip modal
  const closeTipModal = () => {
    setShowTipModal(false);

  };
  const openTipModal = () => {
    setShowTipModal(true);

  };

  const renderPostContent = (post) => {
    if (!post || !post.getAttachmentType) {
      return (
        <div >
          {post.image &&
            <div className='flex flex-col space-y-3 '>
              <p className='text-[12px] font-semibold'>{post.caption}</p>
              <div className="w-[100%] h-[20rem] shadow ">

                <img src={post.image} alt="Post Media" className="object-cover absolute  rounded-md w-full h-full " />
              </div>

            </div>

          }
          {post.video &&
            <div className='flex flex-col space-y-3'>
              <p className='text-[12px] font-semibold'>{post.caption}</p>
              <div className="w-[100%] h-[20rem] shadow">
                <video src={post.video} alt="Post Media" className="object-cover absolute  rounded-md w-full h-full " controls />
              </div>

            </div>

          }
          {/* <p className='text-[12px] font-semibold'>{post.caption}</p> */}
        </div>);
    }

    switch (post.getAttachmentType()) {
      case 'image':
        return (
          <>
            {post.getAttachmentFile() !== '' && (
              <div className="media">
                <img src={post.getAttachmentFile()} alt="Post Media" className="post-image" />
              </div>
            )}
            <p>{post.getCaption()}</p>
          </>
        );
      case 'video':
        return (
          <>
            {post.getAttachmentFile() !== '' && (
              <div className="media">
                <video controls src={post.getAttachmentFile()} className="post-video">
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p>{post.getCaption()}</p>
          </>
        );
      default:
        return (
          <div className="post-text">
            <p>{post.getCaption()}</p>
          </div>
        );
    }
  };


  return (
    <div className='bg-color-white p-4 rounded-lg  flex flex-col space-y-4 relative  w-[100%]'>
      {showTipModal === true && <TipModal isOpen={showTipModal} cancel={closeTipModal} currency={user.currency} currency_symbol={user.currencySymbol} />}


      {postOwner ? (
        <>

          <div className="flex flex-shrink-0 p-4 pb-0 justify-between">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center ">
                <div className='p-[1px] bg-color-pink rounded-full'>
                  {postOwner ? <img className="inline-block h-8 w-8 rounded-full" src={postOwner.profile_picture} alt="{`${postOwner}'s profile picture`}" /> :
                    <img className="inline-block h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />}
                </div>
                <div className="ml-3">
                  <p className="text-[14px] leading-6 font-bold text-white flex items-center space-x-1">
                    {postOwner ? postOwner.getFirstName() + postOwner.getLastName() : 'Sonali Hirave'}


                    {verified && <img src='../src/assets/icons/certified.png' className='w-4 h-4' alt='certified' />}
                    <span className="text-[12px] leading-5 font-thin text-color-grey group-hover:text-color- transition ease-in-out duration-150">
                      {postOwner ? postOwner.getUsername() : '@ShonaDesign'}

                    </span>
                  </p>
                  <p className='text-[10px]'>
                    {post.getCreationDate()}
                    13h ago</p>
                </div>
              </div>
            </a>
            <a href="/menu">
              <img src="../src/assets/icons/menu.png" alt="post-menu" className='w-3 h-3' />
            </a>
          </div>
        </>
      ) :
        <>

          <div className="flex  pb-0 justify-between items-center w-full">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center ">
                <div className='p-[1px] bg-color-pink rounded-full'>

                  <img className="inline-block h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-[14px] leading-6 font-bold text-white flex items-center space-x-1">
                    Sonali Hirave


                    {verified && <img src='../src/assets/icons/certified.png' className='w-4 h-4' alt='certified' />}
                    <span className="text-[12px] leading-5 font-thin text-color-grey group-hover:text-color- transition ease-in-out duration-150">
                      @ShonaDesign

                    </span>
                  </p>
                  <p className='text-[10px]'>

                    13h ago</p>
                </div>
              </div>
            </a>
            <div className='relative'>
            <a  onClick={openMenu} className='cursor-pointer '>
              <img src="../src/assets/icons/menu.png" alt="post-menu" className='w-3 h-3' />
            </a>
            {showMenu === true && <Menu isOpen={showMenu} cancel={closeMenu} />}
            </div>
           
          </div>
        </>}
      {/* Post Content */}
      <div className='w-full relative'>
        {renderPostContent(post)}
      </div>
      <div className=" py-6 w-full">



        <hr className="border-1 border-color-grey/40 my-[20px]" />
        <div className="flex  items-center">
          <div className="text-[14px]">😀</div>
          <div className="text-[14px] ml-[-8px]">😂</div>
          <div className="text-[14px] ml-[-8px]">😎</div>
          {/* <div className="font-medium text-[14px] ml-1"> Daniel jams and 20 others reacted</div> */}
          <div className="feeditem-text">
            {/* {`${post.getLikes()} liked`} */}
          </div>
        </div>
        {postReaction}
        {/* Action Buttons */}
        <div className="flex mt-4">
          <div className="w-full">

            <div className="flex items-center justify-between">
              {/* like */}
              <div className="reaction" onClick={() => updateLikes(user)}>
                <button className=" flex items-center text-color-grey  font-medium hover:text-color-pink">
                  {/* add image for action */}
                  <img src={likedByUser ? '' : "../src/assets/icons/like.png"} alt="Like" className="w-4 h-4 mr-1" />
                  <p className="text-[10px]">{likesCount}Like</p>
                </button>
              </div>
              {/* comment */}
              <div onClick={openComment} className="reaction">
                <button className=" flex items-center text-color-grey  font-medium rounded-full hover:text-color-pink">
                  <img src="../src/assets/icons/comment.png" alt="comment" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">{formatCommentCount(commentsCount)}</p>
                </button>
              </div>
              {/* tip */}
              <div onClick={openTipModal} className="reaction">
                <button className=" flex items-center text-color-grey font-medium rounded-full hover:text-color-pink" >
                  <img src="../src/assets/icons/tip.png" alt="tip user" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">Tip</p>
                </button>
              </div>
              {/* bookmark */}
              <div className=" ">
                <button href="#" className=" flex items-center text-color-grey text-base leading-6 font-medium rounded-full hover:text-color-pink">
                  <img src="../src/assets/icons/post-bookmark.png" alt="bookmark post" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">Bookmark</p>
                </button>
              </div>


            </div>
          </div>


        </div>

      </div>
      {showComment === true ? <div className="bg-color-2 rounded h-auto w-full flex flex-row items-center">
        <div className='w-full flex flex-row items-center'>
          <div className="ml-2">
            {!user ? <img src={user.profile_picture} alt={user.firstname} /> : <img src='../src/assets/profileImg.png' className="w-8 h-8 p-[1px] bg-color-pink rounded-full" alt="" />}
          </div>
          <div className="w-full min-h-[40px] bg-color-white rounded-xl pl-[20px] flex flex-row m-[10px] justify-between items-center">
            <TextareaAutosize
              className="feed-item-input"
              placeholder="Add a comment"
              ref={textareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent default behavior of Enter key
                  if (comment.trim() !== '') { // Check if comment is not empty or whitespace
                    makeComment(); // Call makeComment function
                  }

                }
              }}
            />

            <button className='pr-[10px]' onClick={
              (e) => {


                if (comment.trim() !== '') {
                  makeComment(); // Call makeComment function
                }

              }}>
              <img
                src='../src/assets/icons/send.png'
                alt="Send"
              />
            </button>

          </div>
        </div>
      </div> : ''}


    </div>
  )
}

export default EachPost