import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  MoreVertOutlined,
} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  Accordion,
} from "@mui/material";
import { CommentPost, deletePost, LikePost } from "api/AuthRequest";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Report from "components/Report";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setPost } from "state";
import { format } from "timeago.js";
// import { MoreVertOutlinedIcon } from "@mui/icons-material";
// import { Menu } from "@mui/icons-material";
const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const navigate = useNavigate();
  const [isComments, setIsComments] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [time, setTime] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedInUserId = useSelector((state) => state?.auth?.user?._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [show, setShow] = useState(false);
  const [remove, setRemove] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleEdit = () => {
  //   // Add your code for handling the "edit" action here
  //   setAnchorEl(null);
  // };

  const handleDelete = async () => {
   
    const response= await deletePost(postId,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    // const response = await fetch(
    //   `http://localhost:3001/posts/delete-post/${postId}`,
    //   {
    //     method: "delete",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    if (response) {
      setRemove(true);
      console.log(response);
      setAnchorEl(null);
    }
    // console.log(response,'responseresponse');
  };
  
  const handleRemove = async (commentId) => {
    
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/posts/comment/${postId}/${commentId}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response) {
      toast.success('comment removed')

      setComment(
          comments.filter((value) => value.commentId !== commentId)

      )
  }
    // console.log(response,'responseresponse');
  };
  useEffect(() => {}, []);
     
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  let newComment = comments;
  
    
  const patchLike = async () => {
    
    const response = await LikePost(postId, loggedInUserId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
    //   method: "PATCH",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userId: loggedInUserId }),
    // });
    console.log(response.data, "[atch likeee");

    if (response.data) {
      const updatedPost = response.data;
      dispatch(setPost({ post: updatedPost }));
    }
  };
  // const handleComment=(postId,name,comment)=>{
  //   axios.post('http://localhost:3001/posts/comment-post',{postId,name,comment})
  //   const commentDetails={
  //     postId,name,comment
  //   }
  //   console.log(commentDetails,'commentDetailscommentDetails');
  //   newComment=newComment.push(commentDetails)
  // }

  //handle click
  const handleReport = () => {
    setReportModal(true);
  };

  // const handleDelete = () => {
  //   // Handle delete action
  // // }
  // const patchComment = async () => {
  //   const userName = user.firstName + " " + user.lastName;

  //   const response = await CommentPost(comment, userName, postId, time);
  //   console.log(response.data, "hello");

  //   if (response.data) {
  //     dispatch(setPost({ post: response.data.newCommentPost }));
  //   }
  // };
  const patchComment = async () => {
    const userName = user.firstName + " " + user.lastName;
    let response;
    if (comment) {
      response = await CommentPost(comment, userName, postId, time)
    } else {
      toast.error("No comment found.");
    }
    if (response) {
      dispatch(setPost({ post: response.data.newCommentPost }));
    }
  };

  return (
    <WidgetWrapper display={remove ? "none" : "block"} m="2rem 0 ">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://socialpedia.fashionnova.store/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>

            {isComments && (
              <FlexBetween gap="1.5rem">
                <TextField
                  id="outlined-name"
                  label="Comment"
                  onChange={(e) => setComment(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button variant="outlined" onClick={patchComment}>
                        Post
                      </Button>
                    ),
                  }}
                />
                {/* value={name}
                  onChange={handleChange} */}
              </FlexBetween>
            )}
          </FlexBetween>
        </FlexBetween>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertOutlined />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              // maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {postUserId === loggedInUserId ? (
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          ) : (
            <>
              <MenuItem onClick={handleReport}>Report</MenuItem>
              <Report
                reportModal={reportModal}
                postId={[postId]}
                setReportModal={setReportModal}
              />
            </>
          )}
          {/* <MenuItem onClick="">Report</MenuItem>
  <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
        </Menu>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments?.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Accordion collapse={true}>
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment.username}: {comment.comment}:
                  <span>{format(comment.time)}</span>{" "}
                  <Button
                  onClick={handleRemove}
                  >
               <DeleteIcon/>
                  </Button>
                </Typography>
                <Typography
                  sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
                ></Typography>
              </Accordion>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
