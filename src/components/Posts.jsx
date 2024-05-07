import EachPost from "./EachPost"
import { useState, useRef, useEffect } from 'react';
import DbHelper from "../utils/DbHelper";
import AppUser from "../models/AppUser";
import { getAppUser } from "../utils/Utils";
import Post from "../models/Post";

// import LoadingSpinner from './LoadingSpinner'
function Posts() {
  const dbHelper = new DbHelper();
  const post= new Post()
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const [user, setUser] = useState(new AppUser());
    const [attachmentType, setAttachmentType] = useState('');
    const [attachmentFileName, setAttachmentFileName] = useState('');
    const [attachmentFile, setAttachmentFile] = useState('');

    const [posts, setPosts] = useState([]);

    const attachmentRef = useRef();
    const gifRef = useRef();
    const [selectedPublicity, setSelectedPublicity] = useState(PUBLICITY_OPTIONS[0].title);
    const [isPublicityDropdownOpen, setIsPublicityDropdownOpen] = useState(false);

    const [showGifs, setShowGifs] = useState(false);

    const togglePublicityDropdown = () => {
      setIsPublicityDropdownOpen(!isPublicityDropdownOpen);
    };

    const toggleShowGifs = () => {
      setShowGifs(!showGifs);
    }
    const handlePublicityOptionClick = (option) => {
      setSelectedPublicity(option);
      setIsPublicityDropdownOpen(false);
    };
    const showFilterOptions = (event) => {
      event.preventDefault();
  }
  const uploadAttachment = async () => {
    if (attachmentFileName === '') {
      return;
    }
    setLoading(true);
    const firebaseApp = initializeApp(FIREBASE_CONFIG);
    const storage = getStorage(firebaseApp);
    var storageRef;
    var uploadTask;
    if (selectedGif !== null) {
      storageRef = ref(storage, `attachmentFiles/${selectedGif.name}`);
      uploadTask = uploadBytesResumable(storageRef, selectedGif);
    }
    else if (selectedImage !== null) {
      storageRef = ref(storage, `attachmentFiles/${selectedImage.name}`);
      uploadTask = uploadBytesResumable(storageRef, selectedImage);
    }
    else if (selectedVideo !== null) {
      storageRef = ref(storage, `attachmentFiles/${selectedVideo.name}`);
      uploadTask = uploadBytesResumable(storageRef, selectedVideo);
    }
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% complete`);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        toast("Upload error");
        console.error('Upload error:', error);
      },
      () => {
        console.log('Upload successful!');
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAttachmentFile(downloadURL);
          setLoading(false);
        });
      }
    );
  }
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
  
  useEffect(() => {
    if (attachmentFile !== '') {
      createPost();
    }
  }, [attachmentFile]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      var _u = await getAppUser();
      setUser(_u);
    };
    fetchUser();
  }, []);

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

  const handleGifAttachment = (selectedGif) => {
    setSelectedGif(selectedGif);
    setAttachmentFileName(ATTACHMENT_GIF);
    setAttachmentType(ATTACHMENT_GIF);
    setShowGifs(false);
  };


  const openFileChooser = () => {
    attachmentRef.current.click();
  };

  const openGifChooser = () => {
    gifRef.current.click();
  };

  const createPost = async () => {
    if (attachmentFile === '' && attachmentFileName !== '') {
      uploadAttachment();
    }
    else {
      setLoading(true);
      const post = new Post();
      post.setUserId(user.getUserId());
      post.setCaption(postText === null ? "" : postText);
      post.setAttachmentFile(attachmentFile);
      post.setAttachmentFileName(attachmentFileName);
      post.setAttachmentType(attachmentType);
      post.setPostPrivacy(null);
      post.setCreationDate(Date.now());
      post.setCommentsPrivacy(null);
      post.setLikes(null);
      post.setTips(null);
      dbHelper.createPost(post);
      setAttachmentFile('');
      setAttachmentFileName('');
      setAttachmentType('');
      setSelectedGif(null);
      setSelectedImage(null);
      setSelectedVideo(null);
      setPostText('');
      setLoading(false);
    }
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

  const bottomNavHomeClicked = () => {
    
  }

  return (
    <div className="flex flex-col overflow-y-auto gap-8 h-auto">
     
        <EachPost  post={post} /> 
    
    </div>
  )
}

export default Posts