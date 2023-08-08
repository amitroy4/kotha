import { Grid } from '@mui/material'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './rootlayout.css'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { BsFillChatFill } from 'react-icons/bs';
import { CgMenuRound } from 'react-icons/cg';


const Rootlayout = () => {
    const location = useLocation()
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1.5}>
                    <div className='navbar'>
                        <div className='navcontainer'>
                            <ul>
                                <h3>Kotha</h3>
                                <li >
                                    <Link to='/kotha/home' className={location.pathname == "/kotha/home" ? 'active' : 'icon'}>
                                        <AiFillHome /> Home
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/kotha/chat' className={location.pathname == "/kotha/chat" ? 'active' : 'icon'}>
                                        <BsFillChatFill /> Chat
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/kotha/chat' className={location.pathname == "/kotha/group" ? 'active' : 'icon'}>
                                        <HiUserGroup /> Group
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/kotha/chat' className={location.pathname == "/kotha/firends" ? 'active' : 'icon'}>
                                        <AiOutlineUser /> Friends
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/kotha/chat' className={location.pathname == "/kotha/firends" ? 'active' : 'icon'}>
                                        <CgMenuRound /> People
                                    </Link>
                                </li>
                            </ul>
                            <div className="user">
                                <img src='../vite.svg' />
                                <h4 className='username'>user name</h4>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={10.5}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

export default Rootlayout