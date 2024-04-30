import { useContext } from "react"
import { AuthContext } from "../context/authContext"

function EachPost({ post }) {

  const { currentUser } = useContext(AuthContext)

  return (
    <div >
      <div className="p-[20px]">
        {/* user */}
        <div className="flex items-center justify-between">
          {/* user info */}
          <div className=" flex gap-[20px]">
            <img src={currentUser.profilePicture} alt="profile picture" className="w-[40px] h-[40px] rounded-[50%] object-cover" />
            {/* details */}
            <div className="flex flex-col">
              <Link to={`/profile/${currentUser.userId}`}></Link>
              <span className="">{currentUser.name}</span>


              {/* time */}
              <span>14sec ago</span>
            </div>
            {/* username */}
            <p>@{currentUser.username}</p>
          </div>
          <img src="../src/assets/icons/menu.png" alt="post-menu" />
        </div>
        {/* content */}
        <div className="my-[20px] ">
          <p>{post.description}</p>
          <img src={post.img} alt="post picture" className="w-full max-h-[500px] object-cover mt-[20px]" />
        </div>
        {/* likes, tips.etc */}
        <div></div>
      </div>
    </div>
  )
}

export default EachPost