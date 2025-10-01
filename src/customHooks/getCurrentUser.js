import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function useCurrentUser() {
  const user = useSelector((state) => state.user.userData);
  return user;
}



const getCurrentUser= async() => {
    const dispatch = useDispatch();
  useEffect(() => {
   
const fetchUser = async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/user/getcurrentuser", {
        withCredentials: true, // include cookies   
    });
   ;
    dispatch(setUserData (result.data.user)  );



    } catch (error) {
        dispatch(setUserData (null)  );
    }
};
    fetchUser();



  }, [])
  
}

export {getCurrentUser};
