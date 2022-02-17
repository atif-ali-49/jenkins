import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        minWidth: 650,
      },
      btnstatus:{
       borderColor: theme.palette.primary.main,
       border:'1px solid',
       borderRadius:'5px'
      }
  })
);
export default useStyles;