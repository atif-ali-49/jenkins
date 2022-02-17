import  Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnWrapper:{
        position: 'relative',
        display: 'inline-block',
        "&.fullWidth":{
          width: '100%',
        },
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export function MButton(props:any){
    const classes = useStyles([]);
    return(
        <div className={`${classes.btnWrapper} ${props.fullWidth && 'fullWidth'}`}>
          <Button {...props} disableElevation />
          {props.loading && <CircularProgress className={classes.progress} color={props.progresscolor?props.progresscolor: 'primary'}  size={24} />}
        </div>
    )
};