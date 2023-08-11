import React, { useEffect, useState } from 'react'
import '../commoncomponents.css'
import { TextField } from '@mui/material'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Box, Typography, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

let groupData = {
    groupname: "",
    grouptagline: "",
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleReq = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleMember = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Mygroups = () => {

    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    let [groupInfo, setGroupInfo] = useState(groupData)
    let [groupReqCount, setGroupReqCount] = useState(0)
    let [groupMemberCount, setGroupMemberCount] = useState(0)
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const [openReq, setOpenReq] = React.useState(false);
    const handleCloseReq = () => setOpenReq(false);

    const [openMember, setOpenMember] = React.useState(false);

    const handleOpenMember = (member) => {
        const groupsRef = ref(db, 'members/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid && item.val().groupid == member.groupid) {
                    arr.push({
                        ...item.val(),
                        memberid: item.key,
                    });
                }
            })
            setMyMembersList(arr)
        });
        setOpenMember(true)
    };

    const handleCloseMember = () => setOpenMember(false);


    let [myMembersList, setMyMembersList] = useState([])

    let [groupList, setGroupList] = useState([])

    let [groupReqList, setGroupReqList] = useState([])
    let handleChange = (e) => {
        setGroupInfo({
            ...groupInfo,
            [e.target.name]: e.target.value,
        })
    }

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    let handleSubmit = () => {
        if (groupInfo.groupname == "") {
            setError("Group Name is Empty")
            return;
        }
        if (groupInfo.grouptagline == "") {
            setError("Group Tagline is Empty")
            return;
        }

        setLoader(true)
        set(push(ref(db, 'groups/')), {
            groupname: groupInfo.groupname,
            grouptagline: groupInfo.grouptagline,
            adminid: userData.uid,
            adminname: userData.displayName,
        }).then(() => {
            setGroupInfo({
                groupname: "",
                grouptagline: "",
            })
            setError("")
            setLoader(false)
            setOpen(false)
        });
    }

    useEffect(() => {
        const groupsRef = ref(db, 'groups/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid) {

                    arr.push({
                        ...item.val(), groupid: item.key
                    });
                }
            })
            setGroupList(arr)
        });
    }, [])

    const handleOpenReq = (group) => {
        const groupsRef = ref(db, 'grouprequest/');
        onValue(groupsRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item => {
                if (userData.uid == item.val().adminid && item.val().groupid == group.groupid) {
                    arr.push({
                        ...item.val(),
                        groupreqid: item.key,
                    });
                }
            })
            setGroupReqList(arr)
        });
        setOpenReq(true);
    }

    useEffect(() => {
        setGroupReqCount(groupReqList.length)
        setGroupMemberCount(myMembersList.length)
    })


    let handleMemberAccept = (item) => {
        console.log(item);
        set(push(ref(db, 'members/')), {
            ...item
        }).then(() => {
            remove(ref(db, 'grouprequest/' + (item.groupreqid)));
        });
    }

    let handleMemberDelete = (item) => {
        remove(ref(db, 'grouprequest/' + (item.groupreqid)));
    }
    let handleMemberRemove = (item) => {
        if (confirm('Are you sure you want to remove ' + item.username + '?')) {

            remove(ref(db, 'members/' + (item.memberid)));
        }
    }



    return (
        <div className="box">
            <div className="title">
                <h3>My Groups</h3>
                <BsThreeDotsVertical className='dot' onClick={handleClick('bottom-end')} />
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={1}>
                            <Paper onClick={handleClick('bottom-end')}>
                                <Button onClick={handleOpen1} sx={{ pl: 4, pr: 4 }} className='btn' size="small">Create Group</Button>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Create Your Group
                        </Typography>
                        <TextField onChange={handleChange} value={groupInfo.groupname} name='groupname' id="outlined-basic" label="Group Name" variant="outlined" margin="dense" />
                        {
                            error.includes("Name") && <p>{error}</p>
                        }
                        <TextField onChange={handleChange} value={groupInfo.grouptagline} name='grouptagline' id="outlined-basic" label="Group Tagline" variant="outlined" margin="dense" />
                        {
                            error.includes("Tagline") && <p>{error}</p>
                        }
                        <br />
                        {
                            loader ? <CircularProgress />
                                : <Button onClick={handleSubmit} margin="dense" variant="contained">Create</Button>
                        }
                    </Box>
                </Modal>
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
                            <div className="right button_section">

                                <div onClick={() => handleOpenReq(item)} className="btn">Request</div>
                                <div onClick={() => handleOpenMember(item)} className="btn">Member</div>

                            </div>

                        </li>

                    ))}

                    {/* ======================== Modal for Group Request Start ======================== */}
                    <Modal
                        open={openReq}
                        onClose={handleCloseReq}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleReq}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Group Join Request
                            </Typography>
                            <Typography id="modal-modal-title" variant="h8" component="h4" color={"error"}>
                                {groupReqCount} join request
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    {groupReqList.map(item => (
                                        <>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.username}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                            </Typography>
                                                            {" — Wants to join your group."}
                                                            <br />
                                                            <Button onClick={() => handleMemberAccept(item)} variant="contained" size="small" color='success' style={{ marginTop: "10px", marginBottom: "10px" }}>Accept</Button>
                                                            <Button onClick={() => handleMemberDelete(item)} variant="contained" size="small" color='error' style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>Delete</Button>
                                                        </React.Fragment>

                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    ))}
                                </List>
                            </Typography>
                        </Box>
                    </Modal>
                    {/* ======================== Modal for Group Request End ======================== */}



                    {/* ======================== Modal for Group Member Start ======================== */}
                    <div>
                        <Modal
                            open={openMember}
                            onClose={handleCloseMember}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleMember}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Group Members
                                </Typography>
                                <Typography id="modal-modal-title" variant="h8" component="h4" color={"error"}>
                                    {groupMemberCount} member
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {myMembersList.map(item => (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.username}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                </Typography>
                                                                {" — Wants to join your group."}
                                                                <br />
                                                                <Button onClick={() => handleMemberRemove(item)} variant="contained" size="small" color='error' style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>Remove</Button>
                                                            </React.Fragment>

                                                        }
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        ))}
                                    </List>
                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                    {/* ======================== Modal for Group Member End ======================== */}
                </ul>
            </div>
        </div>
    )
}

export default Mygroups