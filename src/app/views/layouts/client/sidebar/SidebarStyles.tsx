import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    listParent:{
      // "& .MuiListItemText-root":{
      //   color:  '#637381',
      // },
   
      "& a.active .MuiListItemIcon-root":{
        color:  theme.palette.primary.contrastText,
      },
      "& a:hover ":{
        color:'unset'
      },
      "& a":{
        color:'unset'
      },
         "& a.active":{
        backgroundColor: theme.palette.primary.main,
        color:  theme.palette.primary.contrastText,
      },
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    disabled:{
      pointerEvents:"none",
      opacity:'0.4'
    }
  }),
);

export default useStyles;