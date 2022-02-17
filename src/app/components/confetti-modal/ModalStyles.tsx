import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {customColors} from '../utilities/colors/custmColors'

export const useStyles = makeStyles((theme: Theme) =>
// const colors = customColors;
  createStyles({
    cofettiDialogParent:{
      padding:"20px 0",
      borderRadius:'15px',
      '& h2':{
        fontSize:'1.8rem',
        marginBottom:0,
        lineHeight:'1'
      },
      '& .MuiDialog-paper':{
        width: '100%',
        textAlign:'center',
        margin:'0 auto',
        padding: '20px 0',
      },
      '& .MuiDialogTitle-root':{
     padding:'15px 15px 0 15px'
      },
      '& .MuiDialogActions-root':{
       justifyContent:'center'
      }
    },


  }),
);

export default useStyles;