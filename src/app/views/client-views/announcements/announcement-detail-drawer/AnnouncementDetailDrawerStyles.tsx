import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        announcementDrawer:{
            "& .MuiDrawer-paper":{
                maxWidth: "50%",
                minWidth: "50%",
                [theme.breakpoints.down(1280)]:{
                    maxWidth: "100%",
                    minWidth: "100%",
                },
            },
            "& .desc":{
                fontSize: theme.typography.pxToRem(16),
            },
        },
        circular: {
            position: "relative",
            padding: theme.spacing(7),
        },
        linebreakDescription:{
            lineBreak:'anywhere'
        },
        arrowbackward:{
          color:theme.palette.primary.dark,
        }
    }),
);
export default useStyles;