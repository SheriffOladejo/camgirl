import Cookies from 'js-cookie';
import DbHelper from './DbHelper';
import axiosInstance from '../api/axiosInstance';
function isValidEmail(email) {
  // Regular expression for a basic email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailPattern.test(email);
}

function stringToUint8Array(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function isUserSignedIn() {
  const username = Cookies.get('username');
  const email = Cookies.get('email');
  if (username === null && email === null) {
    console.log("user cookie has expired");
  }
  if (username === undefined && email === undefined) {
    console.log("user cookie has expired");
  }
  return {
    "email": email,
    "username": username
  };
}
const updateUserOnlineStatus = async (userId, isOnline) => {
  try {
    await axiosInstance.patch(`users/${userId}`, { is_online: isOnline });
  } catch (error) {
    console.error("Error updating online status:", error);
  }
};

// async function getAppUser() {
//   let dbHelper = new DbHelper();
//   const userId = dbHelper.getAppUserByID()
//   const signinData = isUserSignedIn();

//   const username = signinData["username"];
//   const email = signinData["email"];
//   var user = null;
//   if (email === null || email === undefined) {
//     user = await dbHelper.getAppUserByUsername(username);
//   }
//   else {
//     user = await dbHelper.getAppUserByEmail(email);
//   }
//   return user && userId;

 
// }

async function sha256(message) {
  const buffer = await crypto.subtle.digest("SHA-256", message);
  const array = Array.from(new Uint8Array(buffer));
  return array.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function scrollToTop(window) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// function formatNumber(number) {
//   if (number < 1000) {
//     return number.toString(); // No formatting needed for numbers less than 1000
//   } else if (number < 1000000) {
//     // Format numbers between 1000 and 999999 as '1k', '1.5k', '100k', etc.
//     return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
//   } else {
//     // Format numbers equal to or greater than 1000000 as '1M', '1.5M', '100M', etc.
//     return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
//   }
// }

function calculateTimeAgo(timestamp) {
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result = '';

  if (days > 0) {
    result = `${days}${days === 1 ? ' day' : ' days'} ago`;
  } else if (hours > 0) {
    result = `${hours}${hours === 1 ? 'hr' : 'hrs'} ago`;
  } else if (minutes > 0) {
    result = `${minutes}${minutes === 1 ? 'min' : 'min'} ago`;
  } else {
    result = `${seconds}${seconds === 1 ? 's' : 's'} ago`;
  }

  return result;
}

function addDataIntoCache(key, newData) {
  let existingData = getDataFromLocalStorage(key) || []; // Retrieve existing data or initialize as empty array
  existingData.push(newData); // Add new data to the array
  localStorage.setItem(key, JSON.stringify(existingData)); // Store updated array in localStorage
  console.log("Data Added into localStorage!");
}

function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}


export {
  getDataFromLocalStorage,
  addDataIntoCache,
  // formatNumber,
  calculateTimeAgo,
  isValidEmail,
  stringToUint8Array,
  sha256,
  isUserSignedIn,
  updateUserOnlineStatus,
  // getAppUser,
  scrollToTop,
};