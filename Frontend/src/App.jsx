import { Route , Routes} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import getCurrentUser from "./customHooks/getCurrentUser.jsx"

const App = () => {
  getCurrentUser();
  return (
  <>
  <Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />




  </Routes>
  

  
  </>
  )
}

export default App