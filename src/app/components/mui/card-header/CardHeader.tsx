import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      borderBottom: "1px solid #e5e5e5",
    },
  }),
);

export function MCardHeader(props:any){
    const classes = useStyles();
    return(
        <CardHeader className={classes.cardHeader} {...props} />
    );
};