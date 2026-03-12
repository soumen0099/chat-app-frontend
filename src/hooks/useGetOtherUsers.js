import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";
import api from "../api/axiosInstance.js";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await api.get("/api/v1/user/");
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
