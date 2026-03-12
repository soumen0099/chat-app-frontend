import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice.js";
import api from "../api/axiosInstance.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/api/v1/message/${selectedUser._id}`);
        dispatch(setMessages(res.data.messages));
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedUser) fetchMessages();
  }, [selectedUser, dispatch]);
};

export default useGetMessages;
