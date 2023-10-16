import Appbar from "./appbar"
import Signup from "./signup"
import Signin from "./signin"
import Addcourse from "./Addcourse"
import Courses from "./Courses"
import Course from "./Course"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { RecoilRoot } from 'recoil'


function App() {
  
  return (
    <>
    <div style={{width:"100vw", height:"100vh", backgroundColor:"#eeeeee"}}>
    <Appbar></Appbar>
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </Router>
    </RecoilRoot>
    </div>
    </>
  )
}

export default App
