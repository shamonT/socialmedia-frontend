import { feedPosts, GetUserPostData } from "api/AuthRequest";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);
  // const [posts, setPosts] = useState([]);
	// const [skip, setSkip] = useState(0);
	// const [isEnd, setIsEnd] = useState(false);

  const getPosts = async () => {
    
    const response = await feedPosts({ headers: { Authorization: `Bearer ${token}` }})
   console.log(response,'repsnsepost');
    if(response.data){
      console.log('its workingggggggggggggg');
      const data = response.data
      dispatch(setPosts({ posts: data }));
    }
   
  };
  // useEffect(()=>{
  //   fetchPosts()
  // },[])
  // const fetchPosts=async()=>{
  //    try {
  //     const{data,error}=await getPosts(skip);
  //     if(error){
  //       console.log(error);  
  //     return    }
  //    } catch (error) {
      
  //    }
  // }
  // const handleScroll = (e) => {
	// 	const { offsetHeight, scrollTop, scrollHeight } = e.target;

	// 	if (offsetHeight + scrollTop >= scrollHeight) {
	// 		setSkip(posts?.length);
	// 	}
	// };

  const getUserPosts = async () => {
    const response = await GetUserPostData(userId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data,'enthdaaaa');

    if (response.data) {
      const data = response.data
      dispatch(setPosts({ posts: data }));
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    
    <>
    
    {posts[0]?
    <>
     {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
    : 'null'
    }
    
    </>
   
  );
};

export default PostsWidget;
