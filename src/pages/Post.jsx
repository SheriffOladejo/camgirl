import { useState } from "react"
function Post({ onPostSubmit }) {

  const [content, setContent] = useState('');
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // propagate posts
    onPostSubmit(content);
    setContent('')
  }
  return (
    <form onSubmit={handleSubmit} className="rounded bg-color-white">
      <div className="flex ">
        {/* dynamic image per user */}
        <img src="" alt="" />
        <textarea
          value={content}
          placeholder="What is happening?"
          onChange={handleContentChange}
          cols="30" rows="10" className=""></textarea>
      </div>
      <hr />
      <div>
        <div>
          <img src="../src/assets/icons/emoji.png" alt="emoji" />
          <img src="../src/assets/icons/image.png" alt="image" />
          <img src="../src/assets/icons/gif.png" alt="GIF" />
          <img src="../src/assets/icons/video.png" alt="video" />
        </div>
        <button type="submit"></button>
      </div>
    </form>
  )
}

export default Post