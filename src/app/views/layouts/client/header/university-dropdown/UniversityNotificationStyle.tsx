import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarDropdown:{
            '& ul':{
                padding: 0,
            },
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
            borderBottom: '1px solid #eee',
            padding: theme.spacing(1,2),
        },
        listItem:{
            maxWidth: 311,
            minWidth: 311,
            padding: theme.spacing(1,2),
            borderBottom: '1px solid #eee',
        },
        footer:{
            padding: theme.spacing(1,2),
            backgroundColor: '#fafafa',
            textAlign: "center",
            display: "block",
            fontWeight: "normal"
        },
        avatar:{
            minWidth: theme.spacing(5),
            height: theme.spacing(5),
            marginRight: theme.spacing(2), 
            '& .MuiAvatar-root':{
                width: "theme.spacing(5)",
                height: theme.spacing(5),
            },
        },
        listText:{
            '& span':{
                fontSize: theme.typography.pxToRem(14),
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
            },
        },
        notext:{
            padding: theme.spacing(4,3),
        },
    }),
);

export default useStyles;