import React, { useEffect, useState } from 'react'
import '../commoncomponents.css'
import { TextField } from '@mui/material'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { getDatabase, ref, onValue, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    let [friends, setFriends] = useState([]);
    let userData = useSelector((state) => state.loginUser.loginUser)

    useEffect(() => {
        const usersRef = ref(db, 'friends/');
        onValue(usersRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {

                if (userData.uid == item.val().receiverid || userData.uid == item.val().senderid) {
                    arr.push({
                        ...item.val(),
                        id: item.key,
                    })
                }
            })
            setFriends(arr)
        });
    }, [])



    return (
        <div className="box">
            <div className="title">
                <h3>Friends</h3>
                <BsThreeDotsVertical />
            </div>
            <div className="search">
                <BsSearch className='sb' />
                <input className="text" type="text" placeholder='Search' />
            </div>
            <div className="list">
                <ul>
                    {friends.map((item) => (
                        <li key={item.id}>
                            <div className="left">
                                <img src="../avatar.svg" alt="" />
                                <div className="text">
                                    {
                                        item.receiverid == userData.uid
                                            ?
                                            <h4>{item.sendername}</h4>
                                            :
                                            <h4>{item.receivername}</h4>
                                    }
                                    <p>Love You.....</p>
                                </div>
                            </div>
                            <div className="right">svs</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Friends