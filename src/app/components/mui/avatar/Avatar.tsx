import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    avatar: {
        textTransform: 'uppercase',
        color: '#3a3a3a',
        backgroundColor: '#ebf1fd',
        '&.MuiAvatar-root':{
          fontSize: 14,
      },
    },
  }),
);

export function MAvatar(props:any){
    const classes = useStyles();

    return(
        <Avatar {...props} className={`${classes.avatar} ${props.className?props.className:''}`} />
    )

}