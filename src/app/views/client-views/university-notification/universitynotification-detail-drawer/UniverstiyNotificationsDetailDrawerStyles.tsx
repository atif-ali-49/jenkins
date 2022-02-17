import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        announcementDrawer:{
            minWidth: "30%",
            maxWidth: "30%",
        },
    }),
);

export default useStyles;