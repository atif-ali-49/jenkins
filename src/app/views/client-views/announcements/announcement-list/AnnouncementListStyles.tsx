import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {customColors} from '../utilities/colors/custmColors'

export const useStyles = makeStyles((theme: Theme) =>
// const colors = customColors;
  createStyles({
    listWrapper:{
        width: "100%",
        display: "block",
        boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
        borderRadius: 4,
    },
    avatar:{
      width: theme.spacing(5),
      height: theme.spacing(5),
      textTransform: 'uppercase',
    },
    label:{
      color: theme.palette.text.hint,
      fontSize: theme.typography.pxToRem(13),
    },
    paragraphWidth:{
    maxWidth:"350px"
    }
  }),
);

export default useStyles;