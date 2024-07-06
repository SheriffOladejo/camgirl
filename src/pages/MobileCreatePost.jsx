import { useState, useRef, useEffect, useContext } from "react"
import { PUBLICITY_OPTIONS, ATTACHMENT_GIF, ATTACHMENT_IMAGE, ATTACHMENT_VIDEO } from "../utils/Constants";
import PublicityOptions from '../components/PublicityOptions';
import TextareaAutosize from '../../node_modules/react-textarea-autosize';
import ReactPlayer from 'react-player'
import AppUser from '../models/AppUser';
import SelectGif from "../components/SelectGif";
import DbHelper from '../utils/DbHelper';
import Post from "../models/Post";
import { AuthContext } from '../context/authContext';


import { getAppUser, addDataIntoCache, getDataFromLocalStorage } from '../utils/Utils';
import EmojiPicker from "emoji-picker-react";
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigate } from "react-router-dom";

function MobileCreatePost() {
  const dbHelper = new DbHelper()
  const navigate = useNavigate();
  const { currentUser: user } = useContext(AuthContext);

  const [postText, setPostText] = useState('');
  const textareaRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [Loading, setLoading] = useState(false)
  const [attachmentType, setAttachmentType] = useState('');
  const [attachmentFileName, setAttachmentFileName] = useState('');
  const [attachmentFile, setAttachmentFile] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [posts, setPosts] = useState([]);
  const [selectedPublicity, setSelectedPublicity] = useState(PUBLICITY_OPTIONS[0].title);
  const [selectedPublicityImg, setSelectedPublicityImg] = useState(PUBLICITY_OPTIONS[0].image);
  const [isPublicityDropdownOpen, setIsPublicityDropdownOpen] = useState(false);

  const attachmentRef = useRef();
  const gifRef = useRef();
  const [showGifs, setShowGifs] = useState(false);
  // toggle publicity
  const togglePublicityDropdown = () => {
    setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
  };

  // when user is done choosing
  const handleDone = () => {
    setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
  }

  // clicking on the publicity option
  const handlePublicityOptionClick = (option) => {
    setSelectedPublicityImg(option.image);
    setSelectedPublicity(option.title);
    setIsPublicityDropdownOpen(false);
  };

  // selecting an emoji
  const handleEmojiSelect = (emoji) => {
    const { selectionStart, selectionEnd } = textareaRef.current;

    const newText =
      postText.substring(0, selectionStart) +
      emoji["emoji"] +
      postText.substring(selectionEnd);

    setPostText(newText);

    const newCursorPosition = selectionStart + emoji["emoji"].length;
    textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);

    setShowEmojiPicker(false);
  };
  // uploading file
  const uploadAttachment = async () => {
    if (!selectedImage && !selectedVideo && !selectedGif) {
      return;
    }

    setLoading(true);

    try {
      let attachmentFile = null;
      let attachmentFileName = '';

      if (selectedImage) {
        attachmentFile = await fileToBase64(selectedImage);
        attachmentFileName = selectedImage.name;
      } else if (selectedVideo) {
        attachmentFile = await fileToBase64(selectedVideo);
        attachmentFileName = selectedVideo.name;
      } else if (selectedGif) {
        attachmentFile = selectedGif;
        attachmentFileName = selectedGif.name;
      }

      setAttachmentFile(attachmentFile);
      setAttachmentFileName(attachmentFileName);

      console.log('Upload successful');
    } catch (error) {
      console.error('Upload error:', error);
      // Handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };


  // Function to convert a File object to a Base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  // remove file
  const removeAttachment = () => {
    setSelectedVideo(null);
    setSelectedImage(null);
    setSelectedGif(null);
    setAttachmentType('');
    setAttachmentFile('');
    setAttachmentFileName('');

    if (attachmentRef.current) {
      attachmentRef.current.value = '';
    }

    if (gifRef.current) {
      gifRef.current.value = '';
    }
  }

  // handle post file
  const handlePostAttachment = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;

      const isImage = fileType.startsWith('image/');
      const isVideo = fileType.startsWith('video/');

      if (isImage) {
        setSelectedImage(selectedFile);
        setSelectedVideo(null);
        setSelectedGif(null);
        setAttachmentType(ATTACHMENT_IMAGE);
        setAttachmentFileName(selectedFile.name);
      } else if (isVideo) {
        setSelectedVideo(selectedFile);
        setSelectedImage(null);
        setSelectedGif(null);
        setAttachmentType(ATTACHMENT_VIDEO);
        setAttachmentFileName(selectedFile.name);
      } else {
        console.error('Invalid file type. Please select an image or a video.');
      }
    }
  }

  // handle gif
  const handleGifAttachment = (e) => {
    const gif = e.target.value
    setSelectedGif(gif);
    setSelectedImage(null);
    setSelectedVideo(null);
    setAttachmentFileName(gif.name);
    setAttachmentType(ATTACHMENT_GIF);
    setShowGifs(false);
  };
  // close gif
  // Function to close GIF selector
  const closeGifSelector = () => {
    setShowGifs(false);
  };
  // open file
  const openFileChooser = () => {
    attachmentRef.current.click();
  };
  // open file
  const openGifChooser = () => {
    gifRef.current.click();
  };

  const createPost = async () => {
    console.log('postText:', postText);
    console.log('selectedImage:', selectedImage);
    console.log('selectedVideo:', selectedVideo);
    console.log('selectedGif:', selectedGif);
    console.log('User:', user); // Log the entire user object to see what it contains

    setLoading(true);

    try {
      const postId = new Date().getTime();
      const userId = dbHelper.getUserId();
      console.log(userId)

      if (!userId) {
        alert("Error: User ID not found.");
        setLoading(false);
        return;
      }

      // Create a new post object using the Post class constructor
      const post = new Post(
        postId,
        userId,
        postText === '' ? "" : postText,
        null, null, null,
        attachmentFile,
        attachmentFileName,
        attachmentType,
        null,
        selectedPublicity,
        null,
        Date.now(),
        null, // commentsPrivacy
        null, null,
        null, // likes
        null  // tips
      );

      console.log(post);

      await uploadAttachment();
      await dbHelper.createPost(post);

      const storedPosts = dbHelper.getPostsByUserID(userId);
      addDataIntoCache('posts', storedPosts);
      setPosts(storedPosts); // Update state
      navigate('/home');
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      removeDialogs();
      removeAttachment();
      setPostText('');
      setLoading(false);
    }
  };





  if (showEmojiPicker) {
    setShowEmojiPicker(true);
    setShowGifs(false);
  }
  const removeDialogs = async () => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
    }
    if (showGifs) {
      setShowGifs(false);
    }
    if (isPublicityDropdownOpen) {
      setIsPublicityDropdownOpen(false);
    }

  }




  return (
    <> {Loading && <LoadingSpinner />}
      <section className="h-[100vh] py-8">
        <div className=" md:hidden rounded-lg overflow-hidden bg-color-white space-y-8 px-4 pt-4">
          <div className="flex justify-between items-center">
            <img className="cursor-pointer" onClick={() => window.history.back()} src="../public/icons/arrow-left.png" alt="go back" />
            <button onClick={createPost} className="bg-color-pink text-color-white text-[0.9rem] font-semibold py-1 px-2 rounded opacity-50 " type="submit" disabled={postText.trim() === '' ? !selectedImage && !selectedVideo && !selectedGif : 'opacity-100'}>Post</button>
          </div>
          <hr className="border-1 border-color-lightGrey " />
          <div className="flex items-center ">
            {/* Dynamic image per user */}
            <div className="-mt-[35px]">
              {user ? <img src={user.getProfilePicture()} alt={user.firstname} className="w-12 h-12 p-[1px] bg-color-pink rounded-full object-cover"/> : <img src='../public/profileImg.png' className="w-8 h-8 p-[1px] bg-color-pink rounded-full" alt="" />}
            </div>

            <div> <div className="flex gap-4  ml-[15px] px-[15px] w-max h-6 rounded border border-color-lightGrey items-center cursor-pointer" onClick={togglePublicityDropdown}>
              <img className="w-4 h-4 relative right-1 cursor-pointer" src={selectedPublicityImg} alt="Image" />
              <p className="text-color-black font-Lato text-sm font-medium items-center cursor-pointer">{selectedPublicity}</p>
              <img className="w-3 h-3 relative mt-1 left-0" src="../public/icons/chevron-down.png" alt="Image" />
            </div> <div> <TextareaAutosize
              className="w-[80%] mt-4 text-[12px] ml-4 font-inter-serif text-left flex flex-col items-center justify-center resize-none pb-2 border-none outline-none shadow-none "
              placeholder="What's happening!?"
              ref={textareaRef}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            /></div></div>

            {isPublicityDropdownOpen && (
              <div className='w-[80%] md:w-72 h-auto border border-color-lightGrey bg-color-white rounded m-4 p-4 absolute top-[14%] shadow '>
                <p className='text-sm font-bold font-inter text-color-black'>Who can see your post?</p>
                <p className='text-sm font-medium font-inter text-color-7'>Your post will show up in Feed, on your profile and in search results.<br /><br />Your default audience is set to Public, but you can change the audience of this specific post.</p>
                <div className="bg-color-white rounded">
                  {PUBLICITY_OPTIONS.map((option, index) =>
                    <PublicityOptions title={option.title} desc={option.desc} image={option.image}
                      key={index} handlePublicityOptionClick={handlePublicityOptionClick} />
                  )}
                </div>
                <div className="flex items-center justify-between py-3">
                  <button className="bg-color-white text-color-black py-2 px-5 cursor-pointer rounded" onClick={handleDone}>
                    Cancel
                  </button>
                  <button className="bg-color-pink text-color-white py-2 px-5 cursor-pointer rounded" onClick={handleDone}>
                    Done
                  </button>
                </div>
              </div>
            )}
            {showEmojiPicker && (
              <div className="home-emoji-picker">
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                />
              </div>
            )}
            {showGifs && <SelectGif onSelect={handleGifAttachment} onClose={closeGifSelector} />}
          </div>
          <div className="flex relative max-w-full max-h-[550px] ml-4 mr-12">

            {(selectedImage) ?
              <img className="w-32 h-32 rounded"
                src={URL.createObjectURL(selectedImage)} /> : null
            }
            {selectedVideo &&
              <ReactPlayer
                url={URL.createObjectURL(selectedVideo)}
                controls={true}
                className="w-full max-h-auto"
              />
            }

            {attachmentType !== '' &&
              <div className="flex items-center justify-center">
                <div onClick={removeAttachment} className="absolute right-0 top-0 mt-4 w-6 h-6 rounded-full bg-color-grey mr-5 flex items-center justify-center cursor-pointer">
                  <img className="w-2 h-2 " src="../public/icons/close.png" alt="remove attatchment and close" />
                </div>
                {(selectedImage || selectedVideo) && <div className="mt-4 cursor-pointer absolute top-0 right-7 w-auto px-2 h-7 rounded-lg bg-color-grey mr-7 flex items-center justify-center"><h4 className="text-[12px] font-normal font-lato text-color-white">Edit</h4></div>}
              </div>
            }
          </div>

          <hr className="border-1 border-color-lightGrey w-full mx-auto" />
          <div className="flex justify-start space-x-2 items-center">
            <div className="element" onClick={() => setShowEmojiPicker((prev) => !prev)}>
              <img className="w-4 h-4" src="../public/icons/emoji.png" alt="emoji" />
            </div>
            <div className="element" onClick={openFileChooser}>
              <img className="w-4 h-4" src="../public/icons/image.png" alt="image" />
            </div>
            <div className="element" onClick={() => setShowGifs((prev) => !prev)}>
              <img className="w-4 h-4" src="../public/icons/gif.png" alt="GIF" />
            </div>
            <input type="file" className="hidden" accept="image/gif, video/gif" ref={gifRef} onChange={handleGifAttachment} />

            <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, video/mp4" ref={attachmentRef} onChange={handlePostAttachment} />
          </div>
        </div>
      </section>
    </>
  );
}

export default MobileCreatePost;
