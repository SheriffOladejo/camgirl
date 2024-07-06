import Post from '../models/Post';
// // import Constants from '../utils/Constants';
// import axios from 'axios';
import AppUser from '../models/AppUser';
// import PostCommentModel from '../models/PostCommentModel';
import { getDataFromLocalStorage, addDataIntoCache, getAppUser } from './Utils';
import axiosInstance from '../api/axiosInstance';

class DbHelper {

    constructor() { }

    // async deletePost(post) {
    //     const data = {
    //         "post_id": post.getPostId()
    //     };

    //     try {

    //         let response = null;
    //         if (addDataIntoCache("deletePost") !== null) {
    //             response = JSON.parse(addDataIntoCache("deletePost"), data);
    //         }
    //         //  else {
    //         //     const axiosResponse = await axios.post(`${Constants.BASE_API_URL}/deletePost`, { params: data });
    //         //     response = { data: axiosResponse.data }; // Use the response from Axios
    //         // }
    //         return response;

    // }
    //     catch (error) {
    //         console.error("An error occurred: " + error);
    //     }
    // }

    // async updatePost(post) {
    //     const data = {
    //         "post_id": post.getPostId(),
    //         "user_id": post.getUserId(),
    //         "caption": post.getCaption(),
    //         "attachment_file": post.getAttachmentFile(),
    //         "comments_privacy": post.getCommentsPrivacy(),
    //         "comments": post.getComments(),
    //         "attachment_file_name": post.getAttachmentFileName(),
    //         "attachment_type": post.getAttachmentType(),
    //         "post_privacy": post.getPostPrivacy(),
    //         "post_type": post.getPostType(),
    //         "creation_date": post.getCreationDate(),
    //         "reactions": post.getReactions(),
    //         "likes": post.getLikes(),
    //         "tips": post.getTips(),
    //     };

    //     try {

    //         let response = null;
    //         if (addDataIntoCache("updatePost") !== null) {
    //             response = JSON.parse(addDataIntoCache("updatePost"), data);
    //         }
    //         // else {
    //         //     const axiosResponse = await axios.post(`${Constants.BASE_API_URL}/updatePost`, { params: data });
    //         //     response = { data: axiosResponse.data }; // Use the response from Axios
    //         // }
    //         return response;

    //     }
    //     catch (error) {
    //         console.error("An error occurred: " + error);
    //     }
    // }

    async getUserId() {
        try {
          const userData = getDataFromLocalStorage("userData");
          if (userData) {
            return userData.user_id; // Return the user_id from the stored data
          } else {
            console.error("User data not found in local storage");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
          return null;
        }
      }
    async createComment(comment) {
        const data = {
            "user_id": comment.getUserId(),
            "caption": comment.getCaption(),
            "creation_date": comment.getCreationDate(),
            "hidden": comment.isHidden(),
            "parent_id": comment.getParentId(),
            "likes": comment.getLikes(),
            "reactions": comment.getReactions(),
            "privacy": comment.getPrivacy(),
            "user_ids": comment.getUserIds()
        };

        try {

            let response = null;
            if (addDataIntoCache("createComment") !== null) {
                response = JSON.parse(addDataIntoCache("createComment"), data);
            }

            return response;

        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    async createPost(post) {
        const data = {
            "user_id": post.getUserId(),

            "caption": post.getCaption(),
            "attachment_file": post.getAttachmentFile(),
            "comments_privacy": post.getCommentsPrivacy(),
            "comments": post.getComments(),
            "attachment_file_name": post.getAttachmentFileName(),
            "attachment_type": post.getAttachmentType(),
            "post_privacy": post.getPostPrivacy(),
            "post_type": post.getPostType(),
            "creation_date": post.getCreationDate(),
            "reactions": post.getReactions(),
            "likes": post.getLikes(),
            "tips": post.getTips(),
        };


        try {

            // Retrieve the existing posts from local storage or initialize an empty array if no posts exist
            let existingPosts = getDataFromLocalStorage("posts");
            if (!existingPosts) {
                existingPosts = [];
            }

            // Add the new post to the array of existing posts
            existingPosts.push(data);

            // Save the updated array back to local storage
            addDataIntoCache("posts", existingPosts);

            // Return the updated list of posts
            return existingPosts;

        }
        catch (error) {
            console.error("An error occurred: " + error);
            return null;
        }
    }

    async updateComment(comment) {
        const data = {
            "id": comment.getId(),
            "user_id": comment.getUserId(),
            "user_ids": comment.getUserIds(),
            "creation_date": comment.getCreationDate(),
            "parent_id": comment.getParentId(),
            "hidden": comment.isHidden(),
            "caption": comment.getCaption(),
            "reactions": comment.getReactions(),
            "likes": comment.getLikes()
        };
        try {

            let response = null;
            if (addDataIntoCache("updateComment") !== null) {
                response = JSON.parse(addDataIntoCache("updateComment"), data);
            }
            // else {
            //     const axiosResponse = await axios.post(`${Constants.BASE_API_URL}/updateComment`, { params: data });
            //     response = { data: axiosResponse.data }; // Use the response from Axios
            // }
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    // async getChildComments(comment_id) {
    //     const list = [];
    //     try {
    //         const data = { "parent_id": comment_id };

    //         let response = null;
    //         if (getDataFromLocalStorage("getChildComments") !== null) {
    //             response = JSON.parse(getDataFromLocalStorage("getChildComments"), data);
    //         } 
    //         // else {
    //         //     const axiosResponse = await axios.get(`${Constants.BASE_API_URL}/getChildComments`, { params: data });
    //         //     response = { data: axiosResponse.data }; // Use the response from Axios
    //         // }
    //         response.data.sort((a, b) => b.creation_date - a.creation_date);
    //         for (let i = 0; i < response.data.length; i++) {
    //             const id = response.data[i]["id"];
    //             const user_id = response.data[i]["user_id"];
    //             const user_ids = response.data[i]["user_ids"];
    //             const creation_date = response.data[i]["creation_date"];
    //             const parent_id = response.data[i]["parent_id"];
    //             const hidden = response.data[i]["hidden"];
    //             const caption = response.data[i]["caption"];
    //             const reactions = response.data[i]["reactions"];
    //             const likes = response.data[i]["likes"];

    //             const comment = new PostCommentModel(
    //                 id,
    //                 user_id,
    //                 caption,
    //                 creation_date,
    //                 hidden,
    //                 parent_id,
    //                 likes,
    //                 reactions,
    //                 user_ids
    //             );
    //             list.push(comment);
    //         }
    //     }
    //     catch (error) {
    //         console.log("getChildComments error: " + error);
    //     }
    //     return list;
    // }

    async getCommentsByPostID(post_id) {
        const list = [];
        try {
            const data = { "post_id": post_id };
            let response = null;
            if (getDataFromLocalStorage("getCommentsByPostID") !== null) {
                response = (getDataFromLocalStorage("getCommentsByPostID"), data);
            }

            response.data.sort((a, b) => b.creation_date - a.creation_date);
            for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i]["id"];
                const user_id = response.data[i]["user_id"];
                const user_ids = response.data[i]["user_ids"];
                const creation_date = response.data[i]["creation_date"];
                const parent_id = response.data[i]["parent_id"];
                const hidden = response.data[i]["hidden"];
                const caption = response.data[i]["caption"];
                const reactions = response.data[i]["reactions"];
                const likes = response.data[i]["likes"];

                const comment = new PostCommentModel(
                    id,
                    user_id,
                    caption,
                    creation_date,
                    hidden,
                    parent_id,
                    likes,
                    reactions,
                    user_ids
                );
                list.push(comment);
            }

        }
        catch (error) {
            console.log("getCommentsByPostID error: " + error);
        }
        return list;
    }

    async getCommentCountByPostID(post_id) {
        const data = { "post_id": `${post_id}` };
        let response = getDataFromLocalStorage("getCommentCountByPostID");

        let count = response && response.data && response.data[0] && response.data[0]["count"];


        return count || 0;
    }

    async getPostsByUserID(user_id) {

        const list = [];
        try {
            const storedData = getDataFromLocalStorage("posts");
            // Check if data is available in local storage
            if (storedData !== null) {
                storedData.sort((a, b) => b.creation_date - a.creation_date);
                for (let post of storedData) {
                    if (post.user_id === user_id) {
                        const {
                            id, user_id, caption, post_link, post_link_title, post_link_image, attachment_file,
                            attachment_file_name, attachment_type, post_share, post_privacy, post_type,
                            creation_date, comments_privacy, comments, reactions, likes
                        } = post;

                        const newPost = new Post(
                            id, user_id, caption, post_link, post_link_title, post_link_image,
                            attachment_file, attachment_file_name, attachment_type, post_share,
                            post_privacy, post_type, creation_date, comments_privacy, comments, reactions, likes
                        );
                        list.push(newPost);
                    }
                }
            } else {
                // console.log(null);
            }
        } catch (error) {
            console.log("getPostsByUserID error: " + error);
        }
        return list;
    }

    async getPostByID(post_id) {
        var post = new Post();
        try {
            const data = { "post_id": post_id };
            let response = null;
            if (getDataFromLocalStorage("getPostByID") !== null) {
                response = (getDataFromLocalStorage("getPostByID"), data);
            }
            // else {
            //     const axiosResponse = await axios.get(`${Constants.BASE_API_URL}/getCommentCountByPostID`, { params: data });
            //     response = { data: axiosResponse.data }; // Use the response from Axios
            // }
            for (let i = 0; i < response.data.length; i++) {
                const id = response.data[i]["id"];
                const user_id = response.data[i]["user_id"];
                const caption = response.data[i]["caption"];
                const post_link = response.data[i]["post_link"];
                const post_link_title = response.data[i]["post_link_title"];
                const post_link_image = response.data[i]["post_link_image"];
                const attachment_file = response.data[i]["attachment_file"];
                const attachment_file_name = response.data[i]["attachment_file_name"];
                const attachment_type = response.data[i]["attachment_type"];
                const post_share = response.data[i]["post_share"];
                const post_privacy = response.data[i]["post_privacy"];
                const post_type = response.data[i]["post_type"];
                const creation_date = response.data[i]["creation_date"];
                const comments_privacy = response.data[i]["comments_privacy"];
                const comments = response.data[i]["comments"];
                const reactions = response.data[i]["reactions"];
                const likes = response.data[i]["likes"];

                post = new Post(
                    id,
                    user_id,
                    caption,
                    post_link,
                    post_link_title,
                    post_link_image,
                    attachment_file,
                    attachment_file_name,
                    attachment_type,
                    post_share,
                    post_privacy,
                    post_type,
                    creation_date,
                    comments_privacy,
                    comments,
                    reactions,
                    likes
                );
            }

        }
        catch (error) {
            console.log("getPostByID error: " + error);
        }
        return post;
    }

    async updatePost(post) {
        const data = {
            "id": post.getId(),
            "user_id": post.getUserId(),
            "caption": post.getCaption(),
            "post_link": post.getPostLink(),
            "post_link_title": post.getPostLinkTitle(),
            "post_link_image": post.getPostLinkImage(),
            "attachment_file": post.getAttachmentFile(),
            "attachment_file_name": post.getAttachmentFileName(),
            "attachment_type": post.getAttachmentType(),
            "post_share": post.getPostShare(),
            "post_privacy": post.getPostPrivacy(),
            "post_type": post.getPostType(),
            "creation_date": post.getCreationDate(),
            "comments_privacy": post.getCommentsPrivacy(),
            "comments": post.getComments(),
            "reactions": post.getReactions(),
            "likes": post.getLikes()
        };
        try {

            if (addDataIntoCache("updatePost") !== null) {
                response = (addDataIntoCache("updatePost"), data);
            }
            // else {
            //     const axiosResponse = await axios.post(`${Constants.BASE_API_URL}/updatePost`, data);;
            //     response = { data: axiosResponse.data }; // Use the response from Axios
            // }
            return response;
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    async checkForUsername(username) {
        try {
            const storedData = getDataFromLocalStorage("username"); // Assuming "usernames" is the key for the stored data

            if (storedData !== null) {
                // Check if the provided username exists in the stored data
                const isUsernameTaken = storedData.includes(username);
                return isUsernameTaken;
            }
        } catch (error) {
            console.error("An error occurred while checking for username:", error);
        }
    }


    async checkForEmail(email) {
        try {
            const storedEmails = getDataFromLocalStorage("email"); // Assuming "emails" is the key for the stored data

            if (storedEmails !== null) {
                // Check if the provided email exists in the stored data
                const isEmailRegistered = storedEmails.includes(email);
                return isEmailRegistered;
            }
        } catch (error) {
            console.error("An error occurred while checking for email:", error);
        }
    }


    async getAppUserByUsername(username) {
        try {
            const data = { "username": username };
            const response = getDataFromLocalStorage("getAppUserByUsername", data);

            if (response && response.data && response.data.length !== 0) {
                // Process user data
                const userData = response.data[0];
                const user = new AppUser(
                    userData.id,
                    userData.user_id,
                    userData.username,
                    userData.email,
                    userData.phone_number,
                    userData.password,
                    userData.firstname,
                    userData.lastname,
                    userData.dob,
                    userData.country,
                    userData.location,
                    userData.verification_doc,
                    userData.docs_verified,
                    userData.bio,
                    userData.date_joined,
                    userData.last_updated,
                    userData.profile_picture,
                    userData.cover_picture,
                    userData.subscribers,
                    userData.connections,
                    userData.subscription_price,
                    userData.currency_symbol,
                    userData.currency,
                    userData.creator_mode,
                    userData.verified,
                    userData.live_mode,
                    userData.profile_setup,
                    userData.account_type,
                    userData.creator_mode_desc_dismissed
                );
                return user;
            }
        } catch (error) {
            console.error("Error fetching user by username:", error);
        }
        return null;
    }

    async getAppUserByID(user_id) {
        try {
          // Attempt to retrieve user data from local storage
          const storedUser = getDataFromLocalStorage("userData");
          console.log(storedUser)
          if (storedUser) {
            // Find the user with matching user_id
            console.log(user_id)
            const user = storedUser.find(u => u.user_id === user_id);
            console.log(user);
            if (user) {
              // Return the found user as an AppUser instance
              return new AppUser(
                user.id,
                user.user_id,
                user.username,
                user.email,
                user.phone_number,
                user.password,
                user.firstname,
                user.lastname,
                user.dob,
                user.country,
                user.location,
                user.verification_doc,
                user.docs_verified,
                user.bio,
                user.date_joined,
                user.last_updated,
                user.profile_picture,
                user.cover_picture,
                user.subscribers,
                user.connections,
                user.subscription_price,
                user.currency_symbol,
                user.currency,
                user.creator_mode,
                user.verified,
                user.live_mode,
                user.profile_setup,
                user.account_type,
                user.creator_mode_desc_dismissed
              );
             
            }
          }
         
          return user;
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return null;
        }
      }
      

    // async getAppUserByID(user_id) {
    //     try {
    //         const data = { "user_id": user_id };
    //         let response = null;

    //         if (getDataFromLocalStorage("userData", data) !== null) {
    //             response = getDataFromLocalStorage("userData", data);
    //         }

    //         if (response && response.data && response.data.length !== 0) {
    //             // Process user data
    //             const userData = response.data[0];
    //             const user = new AppUser(
    //                 userData.id,
    //                 userData.user_id,
    //                 userData.username,
    //                 userData.email,
    //                 userData.phone_number,
    //                 userData.password,
    //                 userData.firstname,
    //                 userData.lastname,
    //                 userData.dob,
    //                 userData.country,
    //                 userData.location,
    //                 userData.verification_doc,
    //                 userData.docs_verified,
    //                 userData.bio,
    //                 userData.date_joined,
    //                 userData.last_updated,
    //                 userData.profile_picture,
    //                 userData.cover_picture,
    //                 userData.subscribers,
    //                 userData.connections,
    //                 userData.subscription_price,
    //                 userData.currency_symbol,
    //                 userData.currency,
    //                 userData.creator_mode,
    //                 userData.verified,
    //                 userData.live_mode,
    //                 userData.profile_setup,
    //                 userData.account_type,
    //                 userData.creator_mode_desc_dismissed
    //             );
    //             return user;
    //             console.log(user)
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user by ID:", error);
    //     }
    //     return null;
    // }

   async getAppUserByEmail(email) {
  try {
    const key = "userData"; // Assuming userData is the key for stored user data
    console.log('Fetching user with email:', email); // Debugging statement

    const response = getDataFromLocalStorage(key);
    console.log('Data retrieved from localStorage:', response); // Debugging statement

    // Check if response is an object and has the email key
    if (response && response.email === email) {
      const userData = response; // Assuming response directly contains user data
      console.log('Matching user data:', userData); // Debugging statement

      const user = new AppUser(
        userData.id,
        userData.user_id,
        userData.username,
        userData.email,
        userData.phone_number,
        userData.password,
        userData.firstname,
        userData.lastname,
        userData.dob,
        userData.country,
        userData.location,
        userData.verification_doc,
        userData.docs_verified,
        userData.bio,
        userData.date_joined,
        userData.last_updated,
        userData.profile_picture,
        userData.cover_picture,
        userData.subscribers,
        userData.connections,
        userData.subscription_price,
        userData.currency_symbol,
        userData.currency,
        userData.creator_mode,
        userData.verified,
        userData.live_mode,
        userData.profile_setup,
        userData.account_type,
        userData.creator_mode_desc_dismissed
      );
      console.log('User found:', user); // Log the user object
      return user;
    }

    console.log('User not found for email:', email); // Log when user is not found
  } catch (error) {
    console.error("Error fetching user by email:", error);
  }
  return null;
}

    

    async updateUser(user) {

        const data = {
            "id": user.getId() === undefined ? "" : user.getId(),
            "user_id": user.getUserId() === undefined ? "" : user.getUserId(),
            "username": user.getUserName() === undefined ? "" : user.getUserName(),
            "email": user.getEmail() === undefined ? "" : user.getEmail(),
            "phone_number": user.getPhoneNumber() === undefined ? "" : user.getPhoneNumber(),
            "password": user.getPassword() === undefined ? "" : user.getPassword(),
            "firstname": user.getFirstName() === undefined ? "" : user.getFirstName(),
            "lastname": user.getLastName() === undefined ? "" : user.getLastName(),
            "dob": user.getDOB() === undefined ? "" : user.getDOB(),  
            "country": user.getCountry() === undefined ? "" : user.getCountry(),
            "location": user.getLocation() === undefined ? "" : user.getLocation(),
            "verification_doc": user.getVerificationDoc() === undefined ? "" : user.getVerificationDoc(),
            "docs_verified": user.getDocsVerified() === undefined ? "" : user.getDocsVerified(),
            "bio": user.getBio() === undefined ? "" : user.getBio(),
            "date_joined": user.getDateJoined() === undefined ? "" : user.getDateJoined(),
            "last_updated": user. getLastUpdated() === undefined ? "" : user. getLastUpdated(),
            "profile_picture": user.getProfilePicture() === undefined ? "" : user.getProfilePicture(),
            "cover_picture": user.getCoverPicture() === undefined ? "" : user.getCoverPicture(),
            "subscribers": user.getSubscribers() === undefined ? 0 : user.getSubscribers(),
            "connections": user.getConnections() === undefined ? 0 : user.getConnections(),
            "subscription_price": user.getSubscriptionPrice() === undefined ? 0 : user.getSubscriptionPrice(),
            "currency_symbol": user.getCurrencySymbol() === undefined ? "" : user.getCurrencySymbol(),
            "currency": user.getCurrency() === undefined ? "" : user.getCurrency(),
           
            "creator_mode": user.getCreatorMode() === undefined ? "" : user.getCreatorMode(),
            "verified": user.getVerified() === undefined ? "" : user.getVerified(),
            "live_mode": user.getLiveMode() === undefined ? "" : user.getLiveMode(),
            "profile_setup": user.getProfileSetup() === undefined ? "" : user.getProfileSetup(),
            "account_type": user.getAccountType() === undefined ? "" : user.getAccountType(),
            "creator_mode_desc_dismissed": user.getCreatorModeDescDismissed() === undefined ? "" : user.getCreatorModeDescDismissed(),
        };
        try {
     
            addDataIntoCache('userData', data);
            addDataIntoCache('userDatas', [data]);
            return { success: true, message: 'User data saved successfully' };
        }
        catch (error) {
            console.error("An error occurred: " + error);
        }

    }


}


export default DbHelper;
