import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        circular: {
            position: "relative",
            padding: theme.spacing(7),
        },
    }),
);

export default useStyles;