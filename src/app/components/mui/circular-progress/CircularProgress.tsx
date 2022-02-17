import React from 'react'
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MBox, MTypography } from '../../mui';

const stackedProgressStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    bottomProgress: {
      color: theme.palette.secondary.light,
      "&.orange":{
        color: theme.palette.secondary.light,
      },
      "&.darkGrey":{
        color: theme.palette.secondary.light,
      },
      "&.primary":{
        color:  theme.palette.secondary.light,
      },
    },
    topProgress: {
      color: theme.palette.secondary.main,
      position: 'absolute',
      left: 0,

      "&.orange":{
        color: "#fdc3a2",
      },
      "&.darkGrey":{
        color: "#a5aabd",
      },
      "&.primary":{
        color:  theme.palette.primary.main,
      },
    },

  }),
);

export function MCircularProgress(props:any){
    return(
      <CircularProgress style={{ position: "absolute" }} {...props} />
    )
}

export function StackedCircularProgress(props:any) {
  const classes = stackedProgressStyles();
  return (
    <MBox position="relative" display="inline-flex" className={classes.root}>
      <CircularProgress
        variant="static"
        className={` ${classes.bottomProgress} ${props.color &&  props.color}`}
        size={props.size? props.size : 40}
        thickness={props.thickness? props.thickness : 3}
        value={100}
      />
      <CircularProgress
        variant="static"
        disableShrink
        className={` ${classes.topProgress} ${props.color && props.color} `}
        
        value={props.value}
        size={props.size? props.size : 40}
        thickness={props.thickness? props.thickness : 3}
      />
      {!props.hideText && 
      
        <MBox top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
          <MTypography variant="caption" component="div" color="textSecondary">{props.value} %</MTypography>
        </MBox>
      }
    </MBox>
  );
}