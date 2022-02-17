import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listHeader:{
      width: "100%",
      display: "block",
      boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
      borderRadius: 4,
      marginBottom:0,
      backgroundColor: "rgb(0, 0, 0)",

    },
    listWrapper:{
        width: "100%",
        display: "block",
        boxShadow: "0px 0px 32px 0px rgb(214 215 226 / 30%)",
        borderRadius: 4,
        whiteSpace: "nowrap",
        position: "relative",
    },
    avatar:{
      width: theme.spacing(5),
      height: theme.spacing(5),
      textTransform: 'uppercase',
      backgroundColor: "#fff !important",
    },
    label:{
      color: theme.palette.text.hint,
      fontSize: theme.typography.pxToRem(13),
      
     },
     noteSize:{
      "@media (max-width: 510px)": {
            fontSize:"13px",
        }
    },
    noteswidth:{
      minWidth:"24rem",
     },
    mediaQuery:{
      "@media (max-width: 1108px)": {
        flexDirection:"column",
      }

    }
  }),
);

export default useStyles;