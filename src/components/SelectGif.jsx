// SelectGif.jsx
import { GiphyFetch } from '@giphy/js-fetch-api';
import { useState, useEffect } from 'react';
import {  Grid } from '@giphy/react-components';
import { GIPHY_API_KEY } from '../utils/Constants';

function SelectGif({ onSelect }) {
  const giphyFetch = new GiphyFetch(GIPHY_API_KEY);
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const { data } = await giphyFetch.search('gif', { offset: 0, limit: 10 });
        setGifs(data);
      } catch (error) {
        (
        <div>
   
        </div>
        )
        console.error('Error fetching GIFs:', error);
      }
    };
    fetchGifs();
  }, [giphyFetch]);

  const closeGif = () => {

  }
  return (
    <div>
       <div>
       <div onClick={closeGif} className="w-6 h-6 rounded-full bg-color-pink  flex items-center justify-center cursor-pointer">
                <img className="w-2 h-2 " src="../src/assets/icons/close.png" alt="remove attatchment and close" />
              </div>
       </div>
      <Grid
        width={400}
        columns={3}
        gutter={6}
        fetchGifs={() => giphyFetch.search('gif', { offset: 0, limit: 10 })}
        noLink={true}
        key="gif-grid"
        noLinkText=""
        onClick={() => onSelect(gif)}
      />
      {/* {gifs.map((gif) => (
        <Gif
          key={gif.id}
          gif={gif}
          width={200}
          onClick={() => onSelect(gif)} // Pass selected GIF back to parent component
        />
      ))} */}
    </div>
  );
}

export default SelectGif;
