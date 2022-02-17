import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContainer:{
    boxShadow: "0 0 5.94px 0.06px rgba(0, 0, 0, 0.49)",
    position:'relative',
    height:'100%',
    overflowY:'hidden',
    "& h2":{
        lineHeight:1,
        fontWeight:'500'
      }
    },
    imageTop:{
      position:'absolute',
      top:0,
      right:0
    },
    imageBottom:{
      position:'absolute',
      bottom:'-6px',
      left:0
    },
    popdownImg:{
      width:'100%',
      [theme.breakpoints.down(991)]: {
        width:'50%' 
      }
    },
     topBottomImage:{
   display:'block'
   }
  })
);

export default useStyles;