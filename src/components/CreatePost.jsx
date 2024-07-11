import { useState, useRef, useEffect } from "react";
import { PUBLICITY_OPTIONS, ATTACHMENT_GIF, ATTACHMENT_IMAGE, ATTACHMENT_VIDEO } from "../utils/Constants";
import PublicityOptions from './PublicityOptions';
import TextareaAutosize from 'react-textarea-autosize';
import ReactPlayer from 'react-player';
import AppUser from '../models/AppUser';
import SelectGif from "./SelectGif";
import DbHelper from '../utils/DbHelper';
import Post from "../models/Post";
import {  addDataIntoCache } from '../utils/Utils';
import EmojiPicker from "emoji-picker-react";
import LoadingSpinner from './LoadingSpinner';

function CreatePost({ addPost }) {
  const dbHelper = new DbHelper();
  const [postText, setPostText] = useState('');
  const textareaRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(new AppUser());
  const [attachmentType, setAttachmentType] = useState('');
  const [attachmentFileName, setAttachmentFileName] = useState('');
  const [attachmentFile, setAttachmentFile] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedPublicity, setSelectedPublicity] = useState(PUBLICITY_OPTIONS[0].title);
  const [selectedPublicityImg, setSelectedPublicityImg] = useState(PUBLICITY_OPTIONS[0].image);
  const [isPublicityDropdownOpen, setIsPublicityDropdownOpen] = useState(false);
  const attachmentRef = useRef();
  const gifRef = useRef();
  const [showGifs, setShowGifs] = useState(false);

  const togglePublicityDropdown = () => {
    setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
  };

  const handleDone = () => {
    setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
  };

  const handlePublicityOptionClick = (option) => {
    setSelectedPublicityImg(option.image);
    setSelectedPublicity(option.title);
    setIsPublicityDropdownOpen(false);
  };

  const handleEmojiSelect = (emoji) => {
    const { selectionStart, selectionEnd } = textareaRef.current;
    const newText = postText.substring(0, selectionStart) + emoji["emoji"] + postText.substring(selectionEnd);
    setPostText(newText);
    const newCursorPosition = selectionStart + emoji["emoji"].length;
    textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    setShowEmojiPicker(false);
  };

  const uploadAttachment = async () => {
    if (attachmentFileName === '') {
      return;
    }
    setLoading(true);
    try {
      const base64String = await fileToBase64(selectedImage || selectedVideo);
      addDataIntoCache('attachmentFile', base64String);
      addDataIntoCache('gif', selectedGif);
      console.log('Upload successful');
      setLoading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setLoading(false);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     var _u = await getAppUser();
  //     setUser(_u);
  //   };
  //   fetchUser();
  // }, []);

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
  };

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
  };

  const handleGifAttachment = (gif) => {
    setSelectedGif(gif);
    setSelectedImage(null);
    setSelectedVideo(null);
    setAttachmentFileName(gif.name);
    setAttachmentType(ATTACHMENT_GIF);
    setShowGifs(false);
  };

  const closeGifSelector = () => {
    setShowGifs(false);
  };

  const openFileChooser = () => {
    attachmentRef.current.click();
  };

  const createPost = async () => {
    setLoading(true);
    try {
      const post = new Post();
      const userId = user.getUserId();
      post.setUserId(userId);
      post.setCaption(postText === '' ? "" : postText);
      post.setAttachmentFile(attachmentFile);
      post.setAttachmentFileName(attachmentFileName);
      post.setAttachmentType(attachmentType);
      post.setPostPrivacy(selectedPublicity);
      post.setCreationDate(Date.now());
      post.setCommentsPrivacy(null);
      post.setLikes(null);
      post.setTips(null);
      await uploadAttachment();
      await dbHelper.createPost(post);
      addPost(post);
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      removeDialogs();
      removeAttachment();
      setPostText('');
      setLoading(false);
    }
  };

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
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="hidden md:flex flex-col rounded-lg overflow-hidden bg-color-white space-y-4 px-4 pt-4">
        <div className="flex items-center ">
          {user ? <img src={user.getProfilePicture()} alt="" /> : <img src='../profileImg.png' className="w-8 h-8 p-[1px] bg-color-5 rounded-full" alt="" />}
          <div className="flex gap-4  ml-[15px] px-[15px] w-max h-6 rounded border border-color-lightGrey items-center cursor-pointer" onClick={togglePublicityDropdown}>
            <img className="w-4 h-4 relative right-1" src={selectedPublicityImg} alt="Image" />
            <p className="text-color-black font-Lato text-sm font-medium items-center">{selectedPublicity}</p>
            <img className="w-3 h-3 relative mt-1 left-0" src="../icons/chevron-down.png" alt="Image" />
          </div>
          {isPublicityDropdownOpen && (
            <div className='w-56 md:w-72 h-auto border border-color-lightGrey bg-color-white rounded m-4 p-4 absolute top-[14%] shadow '>
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
        </div>
        <div> 
          <TextareaAutosize
            className="w-[80%] mt-4 text-[12px] ml-4 font-inter-serif text-left flex flex-col items-center justify-center resize-none pb-2 border-none outline-none shadow-none "
            placeholder="What's happening!?"
            ref={textareaRef}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        {showEmojiPicker ? (
          <div className="home-emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        ) : null}
        {showGifs ? <SelectGif onSelect={handleGifAttachment} onClose={closeGifSelector} /> : null}
        <div className="flex relative max-w-full max-h-[550px] ml-4 mr-12">
          {(selectedImage) ? <img className="w-32 h-32 rounded" src={URL.createObjectURL(selectedImage)} /> : null}
          {selectedVideo && <ReactPlayer url={URL.createObjectURL(selectedVideo)} controls={true} className="w-full max-h-auto" />}
          {attachmentType !== '' && (
            <div className="flex items-center justify-center">
              <div onClick={removeAttachment} className="absolute right-0 top-0 mt-4 w-6 h-6 rounded-full bg-color-grey mr-5 flex items-center justify-center cursor-pointer">
                <img className="w-2 h-2 " src="../icons/close.png" alt="remove attachment and close" />
              </div>
              {(selectedImage || selectedVideo) && (
                <div className="mt-4 cursor-pointer absolute top-0 right-7 w-auto px-2 h-7 rounded-lg bg-color-grey mr-7 flex items-center justify-center">
                  <h4 className="text-[12px] font-normal font-lato text-color-white">Edit</h4>
                </div>
              )}
            </div>
          )}
        </div>
        <hr className="border-1 border-color-lightGrey w-[90%] mx-auto" />
        <div className="flex justify-between py-3">
          <div className="flex justify-between space-x-2 items-center">
            <div className="element" onClick={() => setShowEmojiPicker(true)}>
              <img className="w-4 h-4" src="../icons/emoji.png" alt="emoji" />
            </div>
            <div className="element" onClick={openFileChooser}>
              <img className="w-4 h-4" src="../icons/image.png" alt="image" />
            </div>
            <div className="element" onClick={() => setShowGifs((prev) => !prev)}>
              <img className="w-4 h-4" src="../icons/gif.png" alt="GIF" />
            </div>
            <div className="element">
              <img className="w-5 h-5" src="../icons/video.png" alt="Live Video" onClick={openFileChooser} />
            </div>
          </div>
          <button onClick={createPost} className="bg-color-pink text-color-white text-[0.9rem] font-semibold py-1 px-2 rounded " disabled={postText.trim() === '' && !selectedImage && !selectedVideo && !selectedGif}>Post</button>
          <input type="file" className="hidden" accept="image/gif, video/gif" ref={gifRef} onChange={handleGifAttachment} />
          <input type="file" style={{ display: 'none' }} accept="image/jpeg, image/png, video/mp4" ref={attachmentRef} onChange={handlePostAttachment} />
        </div>
      </div>
    </>
  );
}

export default CreatePost;
