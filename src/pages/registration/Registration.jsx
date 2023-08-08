import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import './reg.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

let signupUser = {
    email: '',
    fullname: '',
    password: '',
}

const Registration = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    let [userInfo, setUserInfo] = useState(signupUser)
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
        if (!userInfo.fullname) {
            setErrorMsg('Full Name field is empty')
            return
        }
        if (!userInfo.password) {
            setErrorMsg('Password field is empty')
            return
        }

        let { email, password } = userInfo

        createUserWithEmailAndPassword(auth, email, password).then((user) => {

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setUserInfo({
                        email: '',
                        fullname: '',
                        password: '',
                    })
                    setErrorMsg("")
                    navigate("/login");
                });
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMsg(errorMessage)
        });

    }


    return (
        <div className="register">
            <img src="/logo.png" alt="" />
            <h3>Get started with easily register</h3>
            <p>Free register and you can enjoy it</p>
            <TextField onChange={handleChange} name='email' className='text' type='email' id="outlined-basic" label="Email Address" variant="outlined" value={userInfo.email} />
            {errorMsg.includes("Email field") && <>{errorMsg}</>}
            <TextField onChange={handleChange} name='fullname' className='text' type='text' id="outlined-basic" label="Full name" variant="outlined" value={userInfo.fullname} />
            {errorMsg.includes("Full") && <>{errorMsg}</>}
            <TextField onChange={handleChange} name='password' className='text' type='password' id="outlined-basic" label="Password" variant="outlined" value={userInfo.password} />
            {errorMsg.includes("Password") && <>{errorMsg}</>}
            <Button onClick={handleSubmit} className='text button' variant="contained">Sign up</Button>
            {errorMsg.includes("email-already-in-use") && <>Email already in use</>}
        </div>
    )
}

export default Registration