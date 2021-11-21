import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import axios from 'axios';

// Components
import Navbar from './Navbar';

// Styles
import styles from "./Chats.module.css"

// Context
import { AuthContext } from "../contexts/AuthContextProvider";

const Chats = () => {

    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if(!user) {
            history.push("/");
            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "09a7e3a2-fd18-4539-ad03-fdd87cb6db44",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username", user.email);
            formdata.append("secret", user.uid);
            getFile(user.photoURL)
                .then(avatar => {
                    formdata.append("avatar", avatar, avatar.name)
                    axios.post("https://api.chatengine.io/users/", formdata, {
                        headers: {
                            "private-key": "1af77cba-c089-430b-8721-54abd27adb05"
                        }
                    })
                    .then(() => setLoading(false))
                    .catch(error => console.log(error))
                    
                })
        })

    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
    }

    const logoutHandler = async () => {
        await auth.signOut();
        history.push("/")
    }

    if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID="09a7e3a2-fd18-4539-ad03-fdd87cb6db44"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;