import { Box, Typography, useTheme } from "@mui/material";
import { getFriendList } from "api/AuthRequest";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  let {friends} = useSelector((state) => state.auth.user);
  // friends = [friends]

  const getFriends = async () => {

    const response = await getFriendList(userId, { headers: { Authorization: `Bearer ${token}` }, });
    console.log(response.data, 'friendList');
    if (response.data) {

        dispatch(setFriends({ friends: response.data }));
    }else{
      toast.error("  not found");
    }
};

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends[0] ?
        <>
         {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
        </>
        :"Add friends"
        }
       
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;