import React, { useEffect, useState } from 'react'
import '../commoncomponents.css'
import { Button, TextField } from '@mui/material'
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import CircularProgress from '@mui/material/CircularProgress';

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

const Mygroups = () => {

    const db = getDatabase();
    let userData = useSelector((state) => state.loginUser.loginUser)
    let [groupInfo, setGroupInfo] = useState(groupData)
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    let [groupList, setGroupList] = useState([])

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
                            <div className="right">svs</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Mygroups