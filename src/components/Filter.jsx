import { useState } from "react"

function Filter() {
  const [filter, setFilter] = useState('all')
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the posts based on the selected filter option
  // const filteredPosts = filter === 'all' ? posts : posts.filter(post => filter === 'free' ? !post.isPaid : post.isPaid);


  return (
    <div className="flex justify-end space-x-2 items-center md:pt-4">
      <img src="../src/assets/icons/filter.png" alt="filter" className="w-4 h-4" />
      <p className="text-[0.8rem]">Filter post:</p>
          {/* Filter dropdown menu */}
          <select value={filter} onChange={handleFilterChange} className=" bg-color-lightGrey rounded-full text-[0.8rem] outline-none px-1">
          <option value="all">All</option>
          <option value="free">Free </option>
          <option value="paid">Paid </option>
        </select>
        

    </div>
  )
}

export default Filter