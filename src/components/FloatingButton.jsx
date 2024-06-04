import { useNavigate } from "react-router-dom"


function FloatingButton() {
  const navigate = useNavigate()
  const createPost = () => {
    navigate('/create-post')
  }
  return (
    <div className="fixed  right-4 bottom-20 ">
      <button onClick={createPost} className="rounded-full flex items-center justify-center bg-color-pink w-8 h-8 shadow">
        <img className="h-2 w-2" src="../src/assets/icons/plus.png" alt="create post"

        />
      </button>
    </div>
  )
}

export default FloatingButton