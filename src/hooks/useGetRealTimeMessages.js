import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice.js";
import { getSocket } from "../socket/socket.js";

const useGetRealTimeMessages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [dispatch]);
};

export default useGetRealTimeMessages;
