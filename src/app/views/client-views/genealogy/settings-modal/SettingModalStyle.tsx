import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {customColors} from '../utilities/colors/custmColors'

export const useStyles = makeStyles((theme: Theme) =>
// const colors = customColors;
  createStyles({
    dialogWrapper:{
      '& .MuiDialog-paper':{
        width: '100%',
      },
      '& #dialog-title':{
        borderBottom:'1px solid #dbdbdb',
        '& h2':{
          fontSize:15,
          color:'#3a3a3a',
          fontWeight:'bold'
        }
      }
    },
  }),
);

export default useStyles;