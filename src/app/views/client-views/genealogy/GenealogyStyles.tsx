import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnUpdate:{
        margin:'15px 0'
    },
    
  })
);

export default useStyles;