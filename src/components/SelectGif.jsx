// SelectGif.jsx
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useState, useEffect } from 'react';
import { Grid } from '@giphy/react-components';
import { GIPHY_API_KEY } from '../utils/Constants';


function SelectGif({ onSelect, onClose }) {

  const giphyFetch = new GiphyFetch(GIPHY_API_KEY);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryGifs, setCategoryGifs] = useState()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await giphyFetch.categories();
        setCategories(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching Categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const closeGif = () => {
    onClose(); // Call the onClose function passed via props
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Inside the handleCategoryClick function
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category.name);
    setSearchQuery('');


    // Check if the category has subcategories
    if (category.subcategories && category.subcategories.length > 0) {
      // Set the subcategories state to display them
      setSubcategories(category.subcategories);
    } else {
      // Fetch category GIFs if no subcategories are available
      try {
        const { data } = await giphyFetch.categories(category.name, { offset: 0, limit: 10 });
        setCategoryGifs(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching category GIFs:', error);
      }
    }
  };


  const handleSearch = (event) => {

    if (searchQuery) {
      fetchGifs(searchQuery);
    }
  };
  const fetchGifs = async (query) => {
    try {
      const { data } = await giphyFetch.search(query, { offset: 0, limit: 10 });
      console.log(data)
      const filteredData = data.filter(gif => gif.images && gif.images.fixed_width);
      console.log(filteredData);

      setCategoryGifs(filteredData);
    } catch (error) {
      setError(error);
      console.error('Error fetching GIFs:', error);
    }
  };
  // const renderGif = (gif) => {
  //   if (gif.images) {
  //     if (gif.images.original.mp4) {
  //       return (
  //         <video autoPlay loop muted>
  //           <source src={gif.images.original.mp4} type="video/mp4" />
  //           Your browser does not support the video tag.
  //         </video>
  //       );
  //     } else if (gif.images.original.url) {
  //       return <img src={gif.images.original.url} alt={gif.title} />;
  //     }
  //   }
  //   return null;
  // };
  return (
    <div className='fixed top-10 left-50   flex justify-center items-center bg-color-black bg-opacity-50 z-50 w-[50%]'>
      <div className='bg-white rounded-lg p-4 overflow-y-auto max-h-full'>
        <div className='flex justify-between items-center pb-4'>
          <div onClick={closeGif} className=" w-6 h-6 rounded-full bg-color-pink  flex items-center justify-center cursor-pointer">
            <img className="w-2 h-2 " src="../icons/close.png" alt="remove attachment and close" />
          </div>

          <div className="relative ">
            <img className="w-4 h-4 cursor-text absolute top-2 left-2" src="../icons/search-normal.png" alt="search" />
            <input className="placeholder:text-color-pink text-[12px] outline-none border border-color-pink rounded-full pl-8 pr-4 py-2 "
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              name="search"
              id="search"
              placeholder={'Search'}
            />
          </div>
          <button className=' bg-color-pink text-color-white px-2 py-1 shadow text-[12px] rounded-xl' onClick={handleSearch}>Search</button>
        </div>
        {error && (
          <div>
            <h1>Yikes!</h1>
            <p>The GIFs are not loading right now.</p>
            <button onClick={handleSearch}>Try again</button>
          </div>
        )}
        <div className='flex flex-wrap space-x-2 '>
          {categories.map(category => (
            <div key={category.name} className='cursor-pointer shadow  py-2  w-[40%] h-[20%]' onClick={() => handleCategoryClick(category)}>


              <div>
                <img src={category.images.fixed_height.url} alt={category.title} />
              </div>


              <h4>{category.name}</h4>

            </div>
          ))}
        </div>
        {selectedCategory && (
          <>
            {subcategories.length > 0 && (
              <div className='' onClick={(gif) => onSelect(gif)}>

                 <h2 className='text-lg font-bold mt-4'>{subcategories.name}</h2>
                  {subcategories.map((subcategory, index) => (
                    <img key={index}>{subcategory.images.fixed_height.url}</img>
                  ))}
             
              </div>
            )}
           
            {/* <Grid
              key={selectedCategory || searchQuery}
              width={400}
              columns={2}
              gutter={6}
              fetchGifs={() => {
                if (searchQuery) {
                  return giphyFetch.search(searchQuery, { offset: 0, limit: 10 });
                } else {
                  return giphyFetch.categories(selectedCategory, { offset: 0, limit: 10 });
                }
              }}
              noLink={true}
              noLinkText=""
              onClick={(gif) => onSelect(gif)}
            /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default SelectGif;
