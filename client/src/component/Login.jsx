import React, { useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
const host=process.env.REACT_APP_SERVER_URL;

//styled
const Container = styled.div`
background-color: rgb(38 40 44);
font-family: Roboto, sans-serif;
-webkit-font-smoothing: antialiased;
display: flex;
align-items: center;
justify-content: center;



  .login-page {
   
    width: 60%;
    padding: 8% 0 0;
    margin: auto;
    @media only screen and (max-width: 600px) {
    width: 100%;
    padding: 2% 0 0;
    
  }
  }
  .login-page .form .login{
    margin-top: -1.6rem;
    margin-bottom: 1.6rem;
    @media only screen and (max-width: 600px) {
    width: 100%;
    margin-top: -1.2rem;
    margin-bottom: 1.2rem;
    
    
  }
    i{
      color: #1a6093;
      font-size: 3rem;
      @media only screen and (max-width: 600px) {
        font-size: 2rem;
  }
    }
    p{
      color: #1a6093;
      font-size: 1.5rem;
      @media only screen and (max-width: 600px) {
        font-size: 1rem;
  }
    }
  }
  .form {
    align-self: center;
    border-radius: 1rem;
    z-index: 1;
    background-color: rgb(147 130 130);
    max-width: 360px;
    margin: 0px auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  
    form{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      input{
        font-family: Roboto, sans-serif;
    outline: 0px;
    background: #2b2a27;
    width: 100%;
    border: none;
    border-radius: 1rem;
    margin: 0px 0px 1rem;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1rem;
    color:white;
    @media only screen and (max-width: 600px) {
        font-size:12px;
        border-radius: 10px;
        
  }
      }
      button{
        font-family: Roboto, sans-serif;
    text-transform: uppercase;
    outline: 0px;
    background-color: rgb(151 82 139);
    background-image: linear-gradient(45deg, rgb(50, 143, 138), rgb(32 18 151));
    width: 100%;
    border: none;
    padding: 1rem;
    color: rgb(242 243 243);
    font-size: 1rem;
    cursor: pointer;
    border-radius: 1rem;
    font-weight: 600;
    @media only screen and (max-width: 600px) {
      font-size: 12px; 
      width: 100%;
  }
      }
      p{
        margin: 1rem 0 0;
       color: #c7c5c5;
       font-size: 0.8rem;
       @media only screen and (max-width: 600px) {
      
  }
       a{
        color: #d4190b;
       text-decoration: none;
       cursor: pointer;
       font-size: 0.8rem;
       }
      }
    }
  }
`


const Login = () => {

  const navigate = useNavigate();
  const [Value, setValue] = useState({
    password: "", email: ''
  })
  const onchangef = (e) => {
    setValue({ ...Value, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login') 
    }
   else{
    navigate('/setavtar') 
   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const PostData = async (e) => {
    e.preventDefault();
    const { password, email } = Value;
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await response.json();

    if (data.success === false) {
      notify('Invalid user')
    }
    else {
      localStorage.setItem('chat-app-user', (JSON.stringify(data)))
      navigate('/setavtar')
    }
  }

  const notify = (message) => {
    toast.error(message);
  }

  return (
    <>
      <Container>

        <div className="login-page">

          <div className="form">
            <div className="login">
              <div className="login-header">
              <i className="fa-solid fa-user"></i>
                <p>Please Login .</p>
              </div>
            </div>
            <form method='POST' className="login-form">

              <input onChange={onchangef} type="email" name='email' placeholder="Email" value={Value.email} />
              <input onChange={onchangef} type="password" name='password' placeholder="Password" value={Value.password} />

              <button onClick={PostData} >Login</button>
              <p className="message">Is new user? <Link to="/">Register</Link></p>
            </form>
          </div>
        </div>
        <ToastContainer position="bottom-right"
          autoClose={1700}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />


      </Container>
    </>
  )
}

export default Login
