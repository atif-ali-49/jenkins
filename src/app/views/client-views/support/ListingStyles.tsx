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
    responsiveText:{
   minwidth:'220px',
   maxWidth:'400px',
     [theme.breakpoints.down(675)]: {
      minwidth:'unset',
   maxWidth:'unset',
   width:'180px'
      },
       [theme.breakpoints.down(420)]: {
      minwidth:'unset',
      maxWidth:'unset',
      width:'100px'
      },
    },
    chip:{
      width:'200px',
      [theme.breakpoints.down(600)]: {
      width:'80px'
      },
    },
    
    bgColor:{
      backgroundColor:"deepskyblue"
    }

  }),
);

export default useStyles;