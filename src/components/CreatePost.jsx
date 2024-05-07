import { useState } from "react"
import { PUBLICITY_OPTIONS, ATTACHMENT_GIF, ATTACHMENT_IMAGE, ATTACHMENT_VIDEO } from "../utils/Constants";
import TextareaAutosize from '../../node_modules/react-textarea-autosize';
import ReactPlayer from 'react-player'
import SelectGif from '../SelectGif/SelectGif';
function CreatePost({ onPostSubmit }) {

  const [content, setContent] = useState('');
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // propagate posts
    onPostSubmit(content);
    setContent('')
  // make the opacity 100 on submit or so
  }
  return (
    <form onSubmit={handleSubmit} className="hidden md:flex flex-col rounded-lg overflow-hidden bg-color-white space-y-4 px-4 pt-4">
      <div className="flex ">
        {/* dynamic image per user */}
        <img src="" alt="" />
        <textarea
          value={content}
          placeholder="What is happening?"
          onChange={handleContentChange}
          className="w-full outline-none h-6 text-[0.9rem]"></textarea>
      </div>
      <hr className="border-1 border-color-lightGrey w-[90%] mx-auto" />
      <div className="flex justify-between py-3">
        <div className="flex justify-between space-x-2 items-center">
          <img className="w-4 h-4" src="../src/assets/icons/emoji.png" alt="emoji" />
          <img className="w-4 h-4" src="../src/assets/icons/image.png" alt="image" />
          <img className="w-4 h-4" src="../src/assets/icons/gif.png" alt="GIF" />
          <img className="w-5 h-5" src="../src/assets/icons/video.png" alt="video" />
        </div>
        
        <button className="bg-color-pink text-color-white text-[0.9rem] font-semibold py-1 px-2 rounded opacity-50" type="submit" >Post</button>
      </div>
    </form>
  )
}

export default CreatePost