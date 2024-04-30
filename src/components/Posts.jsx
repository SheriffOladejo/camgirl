import EachPost from "./EachPost"
import { Post } from "."

function Posts() {
  return (
    <div className="flex flex-col gap-8">
      {Post.map((post) => {
        <EachPost post={post} key={post.index}/>
      })}
    </div>
  )
}

export default Posts