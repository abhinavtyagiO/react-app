import { useState } from "react";
import React from 'react';
import Cookies from "universal-cookie";
import axios from 'axios';
import signInImage from "../assets/signup.jpg";

const cookies=new Cookies();

const initialState={
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    avatar:'',
    phoneNumber:'',
}

const Auth=()=>{
    const [form,setForm]=useState(initialState);
    const [isSignup,setisSignup]=useState(true);

    const handleChange=(event)=>{
        setForm({...form,[event.target.name]:event.target.value});
    };

    const switchMode=()=>{
        setisSignup((previssignup)=> !previssignup);
    }
    const handleSubmit= async (event)=>{
        event.preventDefault();

        const {fullName,username,password,avatar,phoneNumber}=form;

        const URL="http://localhost:5000/auth";

        const {data:{token,userID,hashedPassword}}=await axios.post(`${URL}/${isSignup ? "signup" : "login"}`,{
            username,
            password,
            fullName,
            phoneNumber,
            avatar
        });
        cookies.set('token',token);
        cookies.set('username',username);
        cookies.set('fullName',fullName);
        cookies.set('userID',userID);

        if(isSignup){
            cookies.set('phoneNumber',phoneNumber);
            cookies.set('hashedPassword',hashedPassword);
            cookies.set('avatar',avatar);
        }
        window.location.reload();
    }

    return (
    <div className="auth__form-container">
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>
                {isSignup? "Sign up" : "Sign in"}
                </p>
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                name="fullName"
                                placeholder="Full Name"
                                type="text"
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input 
                                name="username"
                                placeholder="Username"
                                type="text"
                                onChange={handleChange}
                                required
                                />
                        </div>
                        {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                name="phoneNumber"
                                placeholder="Phone Number"
                                type="text"
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )}
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatar">Avatar URL</label>
                            <input 
                                name="avatar"
                                placeholder="Avatar URL"
                                type="text"
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input 
                                name="password"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                required
                                />
                        </div>
                    {isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={handleChange}
                                required
                                />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Sign up" : "Sign in"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignup ? "Already have an account? " : "Create a new account "}
                        <span onClick={switchMode}>
                            {isSignup ? "Sign in" : "Sign up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src={signInImage} alt="sign in"/>
        </div>
    </div>
    )
}
export default Auth;