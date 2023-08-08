import React from 'react'
import Grid from '@mui/material/Grid';
import Mygroups from '../../components/mygroups/Mygroups';
import People from '../../components/people/People';
import Group from '../../components/group/Group';
import Friendrequests from '../../components/friendrequests/Friendrequests';
import Friends from '../../components/friends/Friends';
import Blocklist from '../../components/blocklist/Blocklist';


const Home = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Mygroups />
                <People />
            </Grid>
            <Grid item xs={4}>
                <Group />
                <Friendrequests />
            </Grid>
            <Grid item xs={4}>
                <Friends />
                <Blocklist />
            </Grid>
        </Grid>
    )
}

export default Home