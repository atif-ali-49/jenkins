import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: 36,
    },
    userAvatarBtn:{
        '& .MuiAvatar-root':{
            width: '28px',
            height: '28px',
            display: "inline-block",
        },
    },
    avatarBox:{
        borderBottom: '1px solid #d8d9db',
        outline:'none',
        '& .MuiAvatar-root':{
            width: '60px',
            height: '60px',
            display: "inline-block",
            border: '1px solid #d8d9db',
        },
    },
    logoutLink:{
        "color": "#f44336",
        "&:hover":{
            color: theme.palette.error.main,
            backgroundColor: "#fddedf",
        }
    },
    profileDropdownMenu:{
      minWidth: 195,
      "& ul":{
          minWidth: 195,
          paddingTop: 0,
          '& .MuiListItem-button':{
              borderRadius: 4,
              margin: theme.spacing(0,1),
          }
      },
    },
    sideBarListItems:{
      '& .MuiListItem-root':{
        paddingTop: 5,
        paddingBottom: 6,
        paddingLeft: 12
      },
      '& .MuiListItemIcon-root':{
        minWidth: 42
      },
      '& a.active':{
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        color:'unset'
      },
     
    },
  }),
);

export default useStyles;