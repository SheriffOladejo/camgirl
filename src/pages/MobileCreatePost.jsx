import React, { useState } from "react";

function PostContent({ onPostSubmit }) {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Propagate posts
    onPostSubmit(content);
    setContent('');
    // Make the opacity 100 on submit or so
  };

  return (
    <section className=" py-8">
       <form onSubmit={handleSubmit} className=" md:hidden rounded-lg overflow-hidden bg-color-white space-y-8 px-4 pt-4">
      <div className="flex justify-between items-center"> 
        <img className="cursor-pointer" onClick={() => window.history.back()} src="../src/assets/icons/arrow-left.png" alt="go back" /> 
        <button className="bg-color-pink text-color-white text-[0.9rem] font-semibold py-1 px-2 rounded opacity-50" type="submit">Post</button>
      </div>
      <hr  className="border-1 border-color-lightGrey " />
      <div className="flex items-center">
        {/* Dynamic image per user */}
        <img src="" alt="" />
        <textarea
          value={content}
          placeholder="What is happening?"
          onChange={handleContentChange}
          className="w-full outline-none h-24 text-[0.9rem] resize-none ml-2"></textarea>
      </div>
      <hr className="border-1 border-color-lightGrey w-[90%] mx-auto" />
      <div className="flex justify-start space-x-2 items-center">
        <img className="w-4 h-4" src="../src/assets/icons/emoji.png" alt="emoji" />
        <img className="w-4 h-4" src="../src/assets/icons/image.png" alt="image" />
        <img className="w-4 h-4" src="../src/assets/icons/gif.png" alt="GIF" />
        <img className="w-5 h-5" src="../src/assets/icons/video.png" alt="video" />
      </div>
    </form>
    </section>
   
  );
}

export default PostContent;
