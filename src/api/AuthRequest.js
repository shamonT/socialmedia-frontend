import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });


export const sendOtp=(email)=>API.post("/send-otp",{email})

export const userLogin=(values,header)=>API.post("/auth/login",values,header)


export const userRegister=(userDetails)=>API.post("/auth/register",userDetails)

export const createUserChat = (data) => API.post('/chat/', data);

export const editProflePic = (currUserId, values) => API.post(`/users/profilepic-user/${currUserId}`, values)

export const editDescription = (description,postId) => API.post("/posts/post-editDescription", {description, postId });

export const resetPassword=(password,email)=>API.post("/users/resetpassword",{password,email})

export const passwordReset=(email)=>API.post("/users/reset-password",email)

export const userSearch=(search)=>API.get("users/search/user/" + search)

export const getFriendList = (userId, header) => API.get(`/users/${userId}/friends`, header)

//chat

export const getUserProfile = (userId, header) => API.get(`/users/${userId}`, header);

export const userChats = (id,headers) => API.get(`/chat/${id}`,headers);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getMessages = (id, header) => API.get(`/message/${id}`, header);

export const addMessage = (data, header) => API.post('/message/', data, header);

//friend

export const addRemoveFriend = (_id, friendId) => API.patch(`/users/${_id}/${friendId}`)

//admin
export const report=(postId,obj)=>API.post(`/posts/${postId}/report-post`,obj)

export const getReport =()=>API.get("/admin/reports")

export const removePost=(postid)=>API.delete("/admin/remove-post",postid)

export const getUser=()=>API.get("/admin/getUser")

export const BlockUser=(userId)=>API.post("/admin/blockUser",userId)
export const UnBlockUser=(userId)=>API.post("/admin/unblockUser",userId)


//post

export const PostData = (formData, header) => API.post("/posts", formData, header)

export const GetUserPostData = (userId, header) => API.get(`/posts/${userId}/posts`, header)

export const feedPosts = (header) => API.get("/posts", header)

export const deletePost=(postId,headers) => API.delete(`posts/delete-post/${postId}`,headers)

export const LikePost = (postId, userId, header) => API.patch(`/posts/${postId}/like`, { userId }, header)

export const CommentPost = (comment, userName, postId,time) => API.patch("/posts/comment-post", { comment, userName, postId,time:Date() })

export const editProfile=(currUserId,values)=>API.put(`users/edit-user/${currUserId._id}`,values)

// export const getUserProfile = (userId, header) => API.get(`/users/${userId}`, header);