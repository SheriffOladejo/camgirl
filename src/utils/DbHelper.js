import Post from "../models/Post";
// // import Constants from '../utils/Constants';
// import axios from 'axios';
import AppUser from "../models/AppUser";
// import PostCommentModel from '../models/PostCommentModel';
import {
    getDataFromLocalStorage, addDataIntoCache

} from "./Utils";
import axiosInstance from "../api/axiosInstance";

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
            const userData = getDataFromLocalStorage("users");
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
            user_id: comment.getUserId(),
            caption: comment.getCaption(),
            creation_date: comment.getCreationDate(),
            hidden: comment.isHidden(),
            parent_id: comment.getParentId(),
            likes: comment.getLikes(),
            reactions: comment.getReactions(),
            privacy: comment.getPrivacy(),
            user_ids: comment.getUserIds(),
        };

        try {
            let response = null;
            if (addDataIntoCache("createComment") !== null) {
                response = JSON.parse(addDataIntoCache("createComment"), data);
            }

            return response;
        } catch (error) {
            console.error("An error occurred: " + error);
        }
    }

    async createPost(post) {
        const data = {
            user_id: post.getUserId(),

            caption: post.getCaption(),
            attachment_file: post.getAttachmentFile(),
            comments_privacy: post.getCommentsPrivacy(),
            comments: post.getComments(),
            attachment_file_name: post.getAttachmentFileName(),
            attachment_type: post.getAttachmentType(),
            post_privacy: post.getPostPrivacy(),
            post_type: post.getPostType(),
            creation_date: post.getCreationDate(),
            reactions: post.getReactions(),
            likes: post.getLikes(),
            tips: post.getTips(),
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
        } catch (error) {
            console.error("An error occurred: " + error);
            return null;
        }
    }

    async updateComment(comment) {
        const data = {
            id: comment.getId(),
            user_id: comment.getUserId(),
            user_ids: comment.getUserIds(),
            creation_date: comment.getCreationDate(),
            parent_id: comment.getParentId(),
            hidden: comment.isHidden(),
            caption: comment.getCaption(),
            reactions: comment.getReactions(),
            likes: comment.getLikes(),
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
        } catch (error) {
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
            const data = { post_id: post_id };
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
        } catch (error) {
            console.log("getCommentsByPostID error: " + error);
        }
        return list;
    }

    async getCommentCountByPostID(post_id) {
        const data = { post_id: `${post_id}` };
        let response = getDataFromLocalStorage("getCommentCountByPostID");

        let count =
            response &&
            response.data &&
            response.data[0] &&
            response.data[0]["count"];

        return count || 0;
    }

    async getPosts() {
        const list = [];
        try {
            const storedData = getDataFromLocalStorage("posts");
            // Check if data is available in local storage
            if (storedData !== null) {
                storedData.sort((a, b) => b.creation_date - a.creation_date);
                for (let post of storedData) {
                    const {
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
                        likes,
                    } = post;

                    const newPost = new Post(
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
                    list.push(newPost);
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
            const data = { post_id: post_id };
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
        } catch (error) {
            console.log("getPostByID error: " + error);
        }
        return post;
    }

    async updatePost(post) {
        const data = {
            id: post.getId(),
            user_id: post.getUserId(),
            caption: post.getCaption(),
            post_link: post.getPostLink(),
            post_link_title: post.getPostLinkTitle(),
            post_link_image: post.getPostLinkImage(),
            attachment_file: post.getAttachmentFile(),
            attachment_file_name: post.getAttachmentFileName(),
            attachment_type: post.getAttachmentType(),
            post_share: post.getPostShare(),
            post_privacy: post.getPostPrivacy(),
            post_type: post.getPostType(),
            creation_date: post.getCreationDate(),
            comments_privacy: post.getCommentsPrivacy(),
            comments: post.getComments(),
            reactions: post.getReactions(),
            likes: post.getLikes(),
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
        } catch (error) {
            console.error("An error occurred: " + error);
        }
    }
    async checkForUsername(username) {
        try {
            const response = await axiosInstance.get("users");
            const users = response.data;

            const isUsernameTaken = users.some((user) => user.username === username);
            return isUsernameTaken;
        } catch (error) {
            console.error("An error occurred while checking for username:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    }

    async checkForEmail(email) {
        try {
            const response = await axiosInstance.get("/users");
            const users = response.data;

            const isEmailRegistered = users.some((user) => user.email === email);
            return isEmailRegistered;
        } catch (error) {
            console.error("An error occurred while checking for email:", error);
            throw error; // Rethrow the error to handle it in the caller function
        }
    }

    async getAppUserByUsername(username) {
        try {
            const data = { username: username };
            const response = getDataFromLocalStorage("users", data);

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
                    userData.creator_mode_desc_dismissed,
                    userData.last_active
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
            console.log('getAppUserByID called with user_id:', user_id); // Debugging statement
            if (!user_id) {
                console.error("User ID is not provided");
                return null;
            }

            const response = await axiosInstance.get('users');
            const users = response.data;
            console.log('All users fetched:', users); // Debugging statement

            const user = users.find(user => user.user_id === user_id);
            console.log('User fetched by user_id:', user); // Debugging statement

            if (user) {
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
                    user.creator_mode_desc_dismissed,
                    user.last_active
                );
            } else {
                console.error('No user found with the provided user_id');
                return null;
            }
        } catch (error) {
            console.error("Error fetching user by user_id:", error);
            return null;
        }
    }



    async getAppUserByEmail(email) {
        try {
            console.log("Fetching user with email:", email); // Debugging statement
            const response = await axiosInstance.get(`/users?email=${email}`);
            const userData = response.data[0]; // Assuming response contains an array of users

            if (userData) {
                console.log("Matching user data:", userData); // Debugging statement

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
                    userData.creator_mode_desc_dismissed,
                    userData.last_active
                );
                console.log("User found:", user); // Log the user object
                return user;
            }

            console.log("User not found for email:", email); // Log when user is not found
        } catch (error) {
            console.error("Error fetching user by email:", error);
        }
        return null;
    }

    async createUser(user) {
        const data = {
            user_id: user.user_id || "",
            username: user.username || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            password: user.password || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            dob: user.dob || "",
            country: user.country || "",
            location: user.location || "",
            verification_doc: user.verification_doc || "",
            docs_verified: user.docs_verified || "",
            bio: user.bio || "",
            date_joined: user.date_joined || Date.now(),
            last_updated: user.last_updated || Date.now(),
            profile_picture: user.profile_picture || "",
            cover_picture: user.cover_picture || "",
            subscribers: user.subscribers || 0,
            connections: user.connections || 0,
            subscription_price: user.subscription_price || 0,
            currency_symbol: user.currency_symbol || "",
            currency: user.currency || "",
            creator_mode: user.creator_mode || "",
            verified: user.verified || "",
            live_mode: user.live_mode || "",
            profile_setup: user.profile_setup || "",
            account_type: user.account_type || "",
            creator_mode_desc_dismissed: user.creator_mode_desc_dismissed || "",
            last_active: user.last_active || "",
        };

        try {
            const response = await axiosInstance.post("/users", data);
            const savedUser = response.data;
            addDataIntoCache("users", savedUser);
            console.log("User data saved successfully:", response.data);
            return { success: true, message: "User data saved successfully" };
        } catch (error) {
            console.error("An error occurred while saving user data:", error);
            return { success: false, message: "Failed to save user data" };
        }
    }

    async updateUser(user) {
        const data = {
            username: user.username || "",
            email: user.email || "",
            phone_number: user.phone_number || "",
            password: user.password || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            dob: user.dob || "",
            country: user.country || "",
            location: user.location || "",
            verification_doc: user.verification_doc || "",
            docs_verified: user.docs_verified || "",
            bio: user.bio || "",
            date_joined: user.date_joined || "",
            last_updated: user.last_updated || "",
            profile_picture: user.profile_picture || "",
            cover_picture: user.cover_picture || "",
            subscribers: user.subscribers || 0,
            connections: user.connections || 0,
            subscription_price: user.subscription_price || 0,
            currency_symbol: user.currency_symbol || "",
            currency: user.currency || "",
            creator_mode: user.creator_mode || "",
            verified: user.verified || "",
            live_mode: user.live_mode || "",
            profile_setup: user.profile_setup || "",
            account_type: user.account_type || "",
           
            creator_mode_desc_dismissed: user.creator_mode_desc_dismissed || "",
            last_active: user.last_active || "",
        };

        try {
            const response = await axiosInstance.put(`/users/${user.user_id}`, data);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error("Error updating user:", error);
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "An error occurred while updating the user.",
            };
        }
    }
}

export default DbHelper;
