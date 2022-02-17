import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {customColors} from '../utilities/colors/custmColors'

export const useStyles = makeStyles((theme: Theme) =>
// const colors = customColors;
  createStyles({
    listWrapper:{
        width: "100%",
        display: "block",
        boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
        borderRadius: 4,
    },
    avatar:{
      width: theme.spacing(5),
      height: theme.spacing(5),
      textTransform: 'uppercase',
    },
    label:{
      color: theme.palette.text.hint,
      fontSize: theme.typography.pxToRem(13),
    },
    notificationtext:{
       minWidth:'250px',
         [theme.breakpoints.down(500)]: {
           minWidth:'unset',
           maxWidth:'120px'
         
        },
    },
      newRead:{
        visibility:'hidden',
          color:'white',
          backgroundColor:"red"
      },
      newunRead:{
          color:'white',
          backgroundColor:"red"
      },
      Resdeactive:{
          backgroundColor: '#cb031e',
          color:'#fff',

          textTransform:"uppercase",
          letterSpacing:'1px',
          cursor: 'text',
          fontWeight:'bold'
      },
  }),
);

export default useStyles;