import React from 'react'

function RightBar() {
  const leftClick = () => {

  }
  const rightClick = () => {

  }
  return (



    <div className='flex-3'>
      <div>
        <div>
          <p>Suggestion</p>
          <div>
            <a onClick={leftClick} href="#">
              <img src="../src/assets/icons/arrow-left.png" alt="left click" />
            </a>
            <a onClick={rightClick} href="#">
              <img src="../src/assets/icons/arrow-right.png" alt="right click" />
            </a>

          </div>
        </div>
        <div>
          {/* mapping will occur here cause we need to get the details */}
          <div>
            <div
              className=''> <img src="../src/assets/profileImg.png" alt="" /></div>

            <div className="profile-info">
              <div>
                <h6>Case Cert</h6>
                <img src="../src/assets/icons/certified.png" alt="certified" />
              </div>
              {/* dynamic: handle created from sign up */}
              <p>@caseyii2</p>
            </div>
            {/* dynamic */}
            <p>Free</p>
          </div>
        </div>
        {/* pagination */}
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>
        <div>
          <p>Join Live</p>
          <div>
            <a onClick={leftClick} href="#">
              <img src="../src/assets/icons/arrow-left.png" alt="left click" />
            </a>
            <a onClick={rightClick} href="#">
              <img src="../src/assets/icons/arrow-right.png" alt="right click" />
            </a>

          </div>
        </div>
        <div>
          {/* mapping will occur here cause we need to get the details */}
          <div>
            <div
              className='relative'> <img src="../src/assets/profileImg.png" alt="" /></div>


            {/* dynamic */}
            <span className='absolute bottom-3'>Live</span>
          </div>
        </div>
        {/* pagination */}
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul>
        <li>Contact us</li>
        <li>Terms of Services</li>
        <li>Privacy</li>
      </ul>
    </div>
  )
}

export default RightBar