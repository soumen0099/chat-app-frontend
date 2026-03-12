import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogIn from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import { setOnlineUsers } from "./redux/userSlice.js";
import { connectSocket, disconnectSocket } from "./socket/socket.js";
import { useTheme } from "./hooks/useTheme.js";

function App() {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    let socket;
    if (authUser) {
      socket = connectSocket(authUser._id);
      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
    }
    return () => {
      if (socket) {
        socket.off("getOnlineUsers");
      }
      disconnectSocket();
    };
  }, [authUser, dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <LogIn />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <SignUp />}
      />
    </Routes>
  );
}

export default App;
