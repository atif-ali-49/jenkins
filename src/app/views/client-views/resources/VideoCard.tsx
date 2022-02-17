import React from 'react'
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MBox } from 'src/app/components/mui';
import useStyles from './ResourcesStyles'

function VideoCard(props:any) {
    const classes = useStyles();
    return (
        <Grid item lg={3} className={classes.wordBorder}>
            <MBox >
                <video preload="none" controls width="100%" loop poster={props.poster} >
                   <source src={props.link} type="video/mp4"/>
                </video>      
                <MBox textAlign="center">
                    <Typography noWrap>{props.title}</Typography>
                </MBox>
           </MBox>
       </Grid>
    )
}
export default VideoCard
