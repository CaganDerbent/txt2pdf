import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Login = ()=>{

    const navigate:any = useNavigate();

    return(
      <>
      <div className="navbar2">
    <h1 className="logo">txt2pdf</h1>
    <div className="buton" style={{width:"140px",marginRight:"50px"}}>
       <GoogleLogin text='signin' logo_alignment='center'  width={"100px"}
        onSuccess={credentialResponse => {
      
          if (credentialResponse.credential) {
              console.log(credentialResponse)
              var decodedCredential = jwtDecode(credentialResponse.credential);
              console.log(decodedCredential)
              navigate(`${decodedCredential.sub}`,{state:decodedCredential})
            } else {
              console.error("Credential is undefined");
            }
          
        }}
        onError={() => {
          console.log('Login Failed');
        }}
          />

       </div>
   
    </div>
    <h1 id='title'>Convert TXT files to PDF !</h1>
       
        
     
  
     

        
      
      </>
     
      
      

  
        
    );

    
}
export default Login