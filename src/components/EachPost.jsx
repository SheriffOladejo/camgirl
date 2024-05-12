import DbHelper from '../utils/DbHelper'
import usePostDetails from '../hooks/usePostDetails';

import PostCommentModel from '../models/PostCommentModel'

import TextareaAutosize from '../../node_modules/react-textarea-autosize';

import { useRef, useState, useEffect } from 'react';
import TipModal from '../pages/TipModal'
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from '../utils/Utils';
import AppUser from '../models/AppUser';
function EachPost({ post, postReaction }) {

  const dbHelper = new DbHelper();
  let verified = true
  const navigate = useNavigate();
  const textareaRef = useRef(null);


  const { likesCount, commentsCount, likedByUser, updateLikes, setCommentsCount } = usePostDetails(post);
  // const [postOwner, setPostOwner] = useState(dbHelper.getPostsByUserID);

  const [postOwner, setPostOwner] = useState(null)
  const [comment, setComment] = useState('');

  const [showTipModal, setShowTipModal] = useState(false);


  // const makeComment = useCallback(async () => {
  //   const post_comment = new PostCommentModel({
  //     userId: user.getUserId(),
  //     text: comment,
  //     timestamp: Date.now(),
  //     postId: post.getId(),
  //   });

  //   try {
  //     await dbHelper.createComment(post_comment);
  //     setComment("");
  //     setCommentsCount(prev => prev + 1);
  //   } catch (error) {
  //     console.error("Failed to post comment:", error);
  //   }
  // }, [comment, dbHelper, post, setCommentsCount]);

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
      "",
      "",
      user_ids,
      privacy
    );

    await dbHelper.createComment(post_comment);
    setComment("");
    let c = Number(commentsCount) + 1;
    setCommentsCount(`${c}`);
  }
  const openComment = (event) => {
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
        const user = await dbHelper.getAppUserByID(post.getUserId('123'));
        setPostOwner(user);
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
    document.body.style.overflow = ""; // Restore body overflow
  };
  const openTipModal = () => {
    setShowTipModal(true);
    document.body.style.overflow = "hidden";
  };
  const renderPostContent = (post) => {
    if (!post || !post.getAttachmentType) {
      return <div>No post content available.</div>;
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
    <div className='bg-color-white px-2 py-2 rounded-lg'>
      {postOwner && (
        <>
          <TipModal isOpen={showTipModal} onClose={closeTipModal} currency={user.getCurrency()} currency_symbol={user.getCurrencySymbol} />

          <div className="flex flex-shrink-0 p-4 pb-0 justify-between">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center ">
                <div className='p-[1px] bg-color-pink rounded-full'>
                  {/* <img className="inline-block h-8 w-8 rounded-full" src={postOwner.getProfilePicture()} alt="{`${postOwner}'s profile picture`}" /> */}
                  <img className="inline-block h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                </div>
                <div className="ml-3">
                  <p className="text-[14px] leading-6 font-bold text-white flex items-center space-x-1">
                    Sonali Hirave
                    {postOwner.getFirstName()} {postOwner.getLastName()}
                    {verified && <img src='../src/assets/icons/certified.png' className='w-4 h-4' alt='certified' />}
                    <span className="text-[12px] leading-5 font-thin text-color-grey group-hover:text-color- transition ease-in-out duration-150">
                      @ShonaDesign
                      {/* {postOwner.getUserName()} */}
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
      )}
      <div className="px-6 py-6">

        {/* Post Content */}
        {renderPostContent(post)}
        <hr className="border-1 border-color-grey/40 my-[20px]" />
        <div className="flex  items-center">
          <div className="text-[14px]">😀</div>
          <div className="text-[14px] ml-[-8px]">😂</div>
          <div className="text-[14px] ml-[-8px]">😎</div>
          <div className="font-medium text-[14px] ml-1"> Daniel jams and 20 others reacted</div>
          {/* <div className="feeditem-text">{`${post.getLikes()} liked`}</div> */}
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
                <button className=" flex items-center text-color-grey font-medium rounded-full hover:text-color-pink">
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
      <div className="bg-color-2 rounded h-auto w-full flex flex-row items-center">
        <div className='w-full flex flex-row items-center'>
          <img src="/images/profile-picture.png" alt={"Sheriff's Profile"} className="w-8 h-8 rounded-full ml-[15px] my-[10px]" />
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


                if (comment.trim() !== '') { // Check if comment is not empty or whitespace
                  makeComment(); // Call makeComment function
                }

              }}>
              <img
                src="/images/send.png"
                alt="Send"
              />
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default EachPost