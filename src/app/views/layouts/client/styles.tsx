import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    clientLayout:{
      display: "flex",
      [theme.breakpoints.down('sm')]: {
        display: "block",
      },
     
    },
    content: {
        flexGrow: 1,
        marginTop: theme.spacing(8),
        // backgroundColor: theme.palette.background.default,
        minHeight: 'calc(100vh - 68px)',
        padding: '48px 40px',
        // overflowX:'hidden',
        "& .contentBox":{
            // backgroundColor: theme.palette.background.paper,
            boxShadow: 'rgb(50 50 93 / 3%) 0px 2px 5px -1px, rgb(0 0 0 / 5%) 0px 1px 3px -1px',
            borderRadius: 6,
            padding: theme.spacing(3),
              [theme.breakpoints.down(991)]: {
          padding: '16px 8px'
        },
        },
        [theme.breakpoints.down(1400)]: {
          padding: '40px 32px'
        },
          [theme.breakpoints.down(600)]: {
          padding: '40px 8px'
        }
    },
    logo:{
      maxWidth: '100%'
    },
    logoSmall:{
      maxWidth: 45,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      width: `calc(100% - 73px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },

      // "& > div":{
      //   alignItems:"center",
      //   justifyContent: "space-between"
      // },
    },
    appBarShift: {
      marginLeft: drawerWidth,
      // paddingLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },

      [theme.breakpoints.down('sm')]: {
        width: 0,
      },
    },
    logoBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    toolbar:{
      justifyContent: "space-between"
    },
  }),
);

export default useStyles;