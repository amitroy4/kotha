import React from 'react'
import '../commoncomponents.css'
import { TextField } from '@mui/material'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

const Friends = () => {
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
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                    <li>
                        <div className="left">
                            <img src="../avatar.svg" alt="" />
                            <div className="text">
                                <h4>Jenny Wilson</h4>
                                <p>Love You.....</p>
                            </div>
                        </div>
                        <div className="right">svs</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Friends