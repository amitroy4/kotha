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
    let [groupMemberList, setGroupMemberList] = useState([])
    let [membersList, setMembersList] = useState([])

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


    useEffect(() => {
        const membersRef = ref(db, 'members/');
        onValue(membersRef, (snapshot) => {
            let arr = [];
            snapshot.forEach(item => {
                if (item.val().userid == userData.uid) {
                    arr.push(item.val().groupid);
                }
            })
            setMembersList(arr)
        });
    }, [])

    let handleGroupJoin = (item) => {
        set(push(ref(db, 'grouprequest/')), {
            adminid: item.adminid,
            adminname: item.adminname,
            groupid: item.groupid,
            groupname: item.groupname,
            userid: userData.uid,
            username: userData.displayName,
        })
    }


    useEffect(() => {
        const groupsRef = ref(db, 'grouprequest/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (item.val().userid == userData.uid) {
                    arr.push(item.val().groupid);
                }
            })
            setGroupMemberList(arr)
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
                {groupList.length
                    ? <ul>
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
                                <div className="right button_section">
                                    {membersList.indexOf(item.groupid) != -1
                                        ? <div className="btn">Joined</div>
                                        : groupMemberList.indexOf(item.groupid) != -1
                                            ? <>
                                                <div className="btn">Request Send</div>
                                                <div className="btn">Cancel</div>
                                            </>
                                            : <div onClick={() => handleGroupJoin(item)} className="btn">Add</div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                    : <p>No Groups</p>
                }

            </div>
        </div>
    )
}

export default Group