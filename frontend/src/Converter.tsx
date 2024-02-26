import { useState } from 'react'
import './App.css'
import { useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import icon from "./download.png"


function Converter() {

  const navigate:any = useNavigate();

  const [selectedFile, setSelectedFile] :any = useState("");
  const [response,setResponse]:any = useState(false)
  const [location,setLocation]:any = useState("");

  const ulocation = useLocation();

  const userData = ulocation.state;

  const handleFileChange = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit:any = async (e:any) => {
    e.preventDefault();

  if (!selectedFile) {
    console.error("Dosya seçilmedi.");
    return;
  }

  const formData = new FormData();
  formData.append('txtFile', selectedFile);

  try {
    const response = await fetch("http://localhost:3000/txt2pdf", {
      method: 'POST',
      body: formData,
      headers: {}
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const pdfBlob = await response.blob();

    setResponse(true);
    setLocation(pdfBlob)
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  const download = ()=>{

const downloadUrl = URL.createObjectURL(location);
const a = document.createElement('a');
a.href = downloadUrl;
a.download = 'converted.pdf';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
  }

  const handleLogout = () => {
    googleLogout();
    handleLogoutSuccess();
    navigate("/")

  };

  const handleLogoutSuccess = () => {

    console.log('Logout successful');
  };




  return (
    <>
    <div className="navbar">
    <h1 className="logo">txt2pdf</h1>
    <div className="user" style={{gap:"10px"}}>
    <img src={`${userData.picture}`} alt="" style={{width:"40px",height:"40px",borderRadius:"50px"}} />
        <h2>{userData.given_name}</h2>
        <button  id="logout" onClick={handleLogout} style={{width:"130px",height:"40px",boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",marginLeft:"50px",fontWeight:"600"}}> <img src={`${icon}`} alt="" style={{width:"30px",height:"30px"}} />Çıkış yap</button>
    </div>
    </div>
      <div>
        
        
         <h1 id='title'>TXT dosyasını PDF dosyasına dönüştür !</h1>
        <form onSubmit={handleSubmit} id='form'>
          <input type="file" onChange={handleFileChange} accept='.txt'  />
          <button id='submit' type='submit'>ONAYLA</button>
          {response ? <button id='download' onClick={download} style={{marginLeft:"100px"}}>İNDİR  <i className="fa-solid fa-download" style={{color:"#fff"}}></i></button> : ""}
        </form>
        
      </div>

      
     
    </>
  );
}


export default Converter