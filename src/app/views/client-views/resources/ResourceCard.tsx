import React from 'react'
import useStyles from './ResourcesStyles'
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MBox } from 'src/app/components/mui';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { IconButton } from '@material-ui/core';
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone';
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';

function ResourceCard(props:any) {
    const classes = useStyles();
    return (      
      <Grid item  className={classes.wordBorder}>
            <MBox p={3} className={`${props.boxWrap} ${classes.customwidth}`} >
                <img src={props.img} className={classes.mainImage}/>
          
                <br/>
                <div className={classes.dflex}>
                    <MBox display="flex"  mt={1}>
                      <img width="30px" height="20px" src={props.flag} /> 
                      <MBox ml={1} className={classes.sameBoxSize}>  {props.title} </MBox>
                    </MBox>
                    <MBox mt={1}>
                      <IconButton component="a" download href={props.downloadPath} target="_blank"> <ArrowDownwardTwoToneIcon className={classes.iconDownload}/></IconButton>  
                    </MBox>
                </div>
        
            </MBox>
      </Grid>
    )
}

export default ResourceCard
