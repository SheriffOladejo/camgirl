import DbHelper from '../utils/DbHelper';
import usePostDetails from '../hooks/usePostDetails';
import PostCommentModel from '../models/PostCommentModel';
import TextareaAutosize from 'react-textarea-autosize';
import Menu from './Menu';
import { useRef, useState, useEffect, useContext } from 'react';
import TipModal from './TipModal';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axiosInstance from '../api/axiosInstance';

function EachPost({ post, postReaction, user_id }) {
  const dbHelper = new DbHelper();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const verified = true;

  const { currentUser: comment_maker } = useContext(AuthContext);
  const { likesCount, commentsCount, likedByUser, updateLikes, setCommentsCount } = usePostDetails(post);

  const [postOwner, setPostOwner] = useState(null);
  const [showComment, setShowComment] = useState(false);  const [comment, setComment] = useState('');
  const [showTipModal, setShowTipModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        if (post.user_id) {
          const response = await axiosInstance.get(`users/${post.user_id}`);
          setPostOwner(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchPostOwner();
  }, [post.user_id]);

  useEffect(() => {
    // Fetch user info if needed

    const fetchUser = async () => {
      console.log('Fetching user with ID:', user_id); // Debug log

      try {
        const response = await axiosInstance.get(`users/${user_id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    if (user_id) { // Ensure user_id is not undefined or null
      fetchUser();
    }
  }, [user_id]);
  
  const closeMenu = () => {
    setShowMenu(false);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const makeComment = async () => {
    console.log("Making comment:", comment);
    let user_ids = JSON.stringify([]);
    let privacy = -1;
    let post_comment = new PostCommentModel(
      -1,
      comment_maker.user_id,
      comment,
      Date.now(),
      "false",
      post.id,
      "hey",
      "hy",
      user_ids,
      privacy
    );

    await dbHelper.createComment(post_comment);
    setComment("");
    let c = Number(commentsCount) + 1;
    setCommentsCount(`${c}`);
    console.log("Comment made successfully.");
  };

  const openComment = () => {
    setShowComment(true);
    let post_id = post.id;
    let owner_id = postOwner.user_id;
    navigate('/post-comment', {
      state: {
        post_id,
        owner_id
      }
    });
  };

  const formatCommentCount = () => {
    if (commentsCount <= 1) {
      return `${commentsCount} Comment`;
    } else {
      return `${commentsCount} Comments`;
    }
  };

  const formatLikesCount = (count) => {
    if (count === 1) {
      return `${count} Like`;
    } else {
      return `${count} Likes`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && comment.trim()) {
      event.preventDefault();
      makeComment();
    }
  };

  const closeTipModal = () => {
    setShowTipModal(false);
  };

  const openTipModal = () => {
    setShowTipModal(true);
  };

  const renderPostContent = (post) => {
    if (!post || !post.getAttachmentType) {
      return (
     
        <div>
          
          {post.attachment_type === 'image' && (
            <div className='flex flex-col space-y-3'>
              <p className='text-[12px] font-semibold'>{post.caption}</p>
              <div className="w-[100%] h-[20rem] shadow">
                <img src={post.attachment_file} alt="Post Media" className="object-cover absolute rounded-md w-full h-full" />
              </div>
            </div>
          )}
          {post.attachment_type === 'video' && (
            <div className='flex flex-col space-y-3'>
              <p className='text-[12px] font-semibold'>{post.caption}</p>
              <div className="w-[100%] h-[20rem] shadow">
                <video src={post.attachment_file} alt="Post Media" className="object-cover absolute rounded-md w-full h-full" controls />
              </div>
            </div>
          )}
        </div>
      );
    }

    switch (post.getAttachmentType()) {
      case 'image':
        return (
          <>
            <p>{post.getCaption()}</p>
            {post.getAttachmentFile() !== '' && (
              <div className="media">
                <img src={post.getAttachmentFile()} alt="Post Media" className="post-image" />
              </div>
            )}
          
          </>
        );
      case 'video':
        return (
          <>
            <p>{post.getCaption()}</p>
            {post.getAttachmentFile() !== '' && (
              <div className="media">
                <video controls src={post.getAttachmentFile()} className="post-video">
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
         
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
      {showTipModal === true && <TipModal isOpen={showTipModal} cancel={closeTipModal} currency={user.currency} currency_symbol={user.currency_symbol} />}

      {postOwner ? (
        <div className="flex flex-shrink-0 p-4 pb-0 justify-between">
          <Link to={`/profile/${postOwner.user_id}`} className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div className='p-[1px] bg-color-pink rounded-full'>
                {postOwner ? (
                  <img className="inline-block h-8 w-8 rounded-full" src={postOwner.profile_picture} alt={`${postOwner.firstname}'s profile picture`} />
                ) : (
                  <img className="inline-block h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-[14px] leading-6 font-bold text-white flex items-center space-x-1">
                  {postOwner.firstname} {postOwner.lastname}
                  {verified && <img src='../icons/Certified.png' className='w-4 h-4' alt='certified' />}
                  <span className="text-[12px] leading-5 font-thin text-color-grey group-hover:text-color- transition ease-in-out duration-150">
                    {postOwner.username}
                  </span>
                </p>
                <p className='text-[10px]'>
                  {post ? post.creation_date : '13h ago'}
                </p>
              </div>
            </div>
          </Link>
          <a href="/menu">
            <img src="../icons/menu.png" alt="post-menu" className='w-3 h-3' />
          </a>
        </div>
      ) : (
        <div className="flex pb-0 justify-between items-center w-full">
          {<Link to={`/profile`} className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div className='p-[1px] bg-color-pink rounded-full'>
                <img className="inline-block h-8 w-8 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
              </div>
              <div className="ml-3">
                <p className="text-[14px] leading-6 font-bold text-white flex items-center space-x-1">
               {user ? ` ${user.firstname} ${user.lastname}` : ' Sonali Hirave'}  
                  {verified && <img src='../icons/Certified.png' className='w-4 h-4' alt='certified' />}
                  <span className="text-[12px] leading-5 font-thin text-color-grey group-hover:text-color- transition ease-in-out duration-150">
                    @{user ? ` ${user.username} ` : ' ShonaDesign'}  
                  </span>
                </p>
                <p className='text-[10px]'>{post ? post.creation_date : '9hr ago'}</p>
              </div>
            </div>
          </Link>}
          <div className='relative'>
            <a onClick={openMenu} className='cursor-pointer'>
              <img src="../icons/menu.png" alt="post-menu" className='w-3 h-3' />
            </a>
            {showMenu === true && <Menu isOpen={showMenu} cancel={closeMenu} />}
          </div>
        </div>
      )}

      <div className='w-full relative'>
        {renderPostContent(post)}
      </div>
      <div className="py-6 w-full">
        <hr className="border-1 border-color-grey/40 my-[20px]" />
        <div className="flex items-center">
          <div className="text-[14px]">😀</div>
          <div className="text-[14px] ml-[-8px]">😂</div>
          <div className="text-[14px] ml-[-8px]">😎</div>
          <div className="feeditem-text">
          </div>
        </div>
        {postReaction}

        <div className="flex mt-4">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="reaction" onClick={updateLikes}>
                <button className="flex items-center text-color-grey font-medium hover:text-color-pink">
                  <img src="../icons/like.png" alt="Like" className="w-4 h-4 mr-1" />
                  <span className="text-xs">{likesCount ? formatLikesCount((likesCount)): ' like'}</span>
                 
                </button>
              </div>
              <div onClick={openComment} className="reaction">
                <button className="flex items-center text-color-grey font-medium rounded-full hover:text-color-pink">
                  <img src="../icons/comment.png" alt="comment" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">{formatCommentCount(commentsCount)}</p>
                </button>
              </div>
              <div onClick={openTipModal} className="reaction">
                <button className="flex items-center text-color-grey font-medium rounded-full hover:text-color-pink">
                  <img src="../icons/tip.png" alt="tip user" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">Tip</p>
                </button>
              </div>
              <div>
                <button href="#" className="flex items-center text-color-grey text-base leading-6 font-medium rounded-full hover:text-color-pink">
                  <img src="../icons/post-bookmark.png" alt="bookmark post" className="mr-1 w-4 h-4" />
                  <p className="text-[10px]">Bookmark</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showComment === true ? (
        <div className="bg-color-2 rounded h-auto w-full flex flex-row items-center">
          <div className='w-full flex flex-row items-center'>
            <div className="ml-2">
              {comment_maker ? (
                <img src={comment_maker.profile_picture} alt={comment_maker.firstname}  className="w-8 h-8 p-[1px] bg-color-pink rounded-full"/>
              ) : (
                <img src='../profileImg.png' className="w-8 h-8 p-[1px] bg-color-pink rounded-full" alt="" />
              )}
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
              <button className='pr-[10px]' onClick={() => {
                if (comment.trim() !== '') {
                  makeComment(); // Call makeComment function
                }
              }}>
                <img src='../icons/send.png' alt="Send" />
              </button>
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default EachPost;
