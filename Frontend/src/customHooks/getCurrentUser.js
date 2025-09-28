const { default: axios } = require("axios");
const { useEffect } = require("react");

const getCurrentUser= async() => {
    const dispatch = useDispatch();
  useEffect(() => {
   
const fetchUser = async () => {
  try {
    const result = await axios.get("http://localhost:3000/api/user/getcurrentuser", {
        withCredentials: true, // include cookies   
    });
   ;
    dispatch(setUser(result.data.user)  );



    } catch (error) {
        dispatch(setUser(null)  );
    }
};
    fetchUser();



  }, [])
  
}

module.exports = getCurrentUser;
