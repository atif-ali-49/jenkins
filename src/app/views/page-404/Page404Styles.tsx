import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWraper:{
    },
    image404:{
      maxWidth: 350,
      width: "100%",
      display: 'block',
      margin: '100px auto auto',
      padding: "0 10px"
    },
    backButton:{
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
      '&:hover':{
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
      },
    },
    backIcon:{
      margin: '0 6px 0 -8px',
      fontSize: 22
    }
  }),
);

export default useStyles;