import React, { useEffect, useState } from 'react'
import '../commoncomponents.css'
import { TextField } from '@mui/material'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const Group = () => {
    const db = getDatabase();
    let [groupList, setGroupList] = useState([])
    let userData = useSelector((state) => state.loginUser.loginUser)

    useEffect(() => {
        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid != item.val().adminid) {

                    arr.push({
                        ...item.val(), groupid: item.key
                    });
                }
            })
            setGroupList(arr)
        });
    }, [])
    return (
        <div className="box">
            <div className="title">
                <h3>Group</h3>
                <BsThreeDotsVertical />
            </div>
            <div className="search">
                <BsSearch className='sb' />
                <input className="text" type="text" placeholder='Search' />
            </div>
            <div className="list">
                <ul>
                    {groupList.map((item) => (
                        <li key={item.groupid}>
                            <div className="left">
                                <img src="../avatar.svg" alt="" />
                                <div className="text">
                                    <p>Admin: {item.adminname}</p>
                                    <h4>{item.groupname}</h4>
                                    <p>{item.grouptagline}</p>
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

export default Group