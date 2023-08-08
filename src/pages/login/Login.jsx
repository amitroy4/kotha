import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

let signinUser = {
    email: '',
    password: '',
}

const Login = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    let [userInfo, setUserInfo] = useState(signinUser)
    let [errorMsg, setErrorMsg] = useState("")

    let handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    let handleSubmit = () => {
        if (!userInfo.email) {
            setErrorMsg('Email field is empty')
            return
        }
        if (!userInfo.password) {
            setErrorMsg('Password field is empty')
            return
        }

        let { email, password } = userInfo
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                if (user.user.emailVerified) {
                    setErrorMsg("")
                    navigate("/home");
                    setUserInfo({
                        email: '',
                        password: '',
                    })
                } else {
                    setErrorMsg("Please verify your email first")
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrorMsg(errorMessage)
            });
    }



    return (
        <div className="login">
            <img src="/logo.png" alt="" />
            <h3>Login</h3>
            <p>Free register and you can enjoy it</p>
            <TextField onChange={handleChange} name='email' className='text' type='email' id="outlined-basic" label="Email Address" variant="outlined" value={userInfo.email} />
            {errorMsg.includes("Email field") && <>{errorMsg}</>}
            <TextField onChange={handleChange} name='password' className='text' type='password' id="outlined-basic" label="Password" variant="outlined" value={userInfo.password} />
            {errorMsg.includes("Password") && <>{errorMsg}</>}
            {errorMsg.includes("wrong-password") && <>Wrong password</>}
            <Button onClick={handleSubmit} className='text button' variant="contained">Sign In</Button>
            {errorMsg.includes("verify your") && <>{errorMsg}</>}
        </div>
    )
}

export default Login