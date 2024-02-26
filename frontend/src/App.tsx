
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Converter from './Converter';
import Login from './Login';





function App() {




  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/'element={<Login/>} />
    
          
          <Route path='/:credential' element={<Converter />} />
        </Routes>
      </BrowserRouter>
    
     
    </>
  );
}


export default App
