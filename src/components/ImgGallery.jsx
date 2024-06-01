import { creatorGallery } from "."
import { Gallery } from "react-grid-gallery"

function ImgGallery() {
 const openGallery = (index, image) => {}

  return (
    <div >
      <h2 className="font-bold text-[14px]">Gallery</h2>
      <div>
       <Gallery images={creatorGallery} enableImageSelection rowHeight={100} maxRows={4} maxCols={3} onClick={openGallery} isSelect/>
      </div>
    </div>
  )
}

export default ImgGallery