import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './folders/loginpage/Login';
import Homepage from './folders/homepage/Homepage'
import Addnews from './folders/addnews/Addnews';
import Editnews from './folders/editnews/Editnews';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/home/:id' element={<Homepage/>}/>
      <Route path='/addnews/:id' element={<Addnews/>}/>
      <Route path='/editnews/:id/news/:id1' element={<Editnews/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;