import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   footer:{
       backgroundColor:theme.palette.secondary.main,
       color:'#fff',
       borderRadius:'3px',
       marginBottom:0
   }
  })
);

export default useStyles;