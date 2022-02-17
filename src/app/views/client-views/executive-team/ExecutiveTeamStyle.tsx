import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textbreak:{
         lineBreak:'anywhere'
        },
        sameHeight:{
          height: '100%',
        },
        team:{
          borderRadius: "12px",
          boxShadow: "1px 5px 3px #ddd5d5",
          background: "#f0f0f0",
        },
        circular:{
          position:"relative",
          top:"50%",
          left:"50%",
          padding:theme.spacing(7),
        },
        teamImgCover:{
         maxHeight:'350px',
         overflow:'hidden',
        }
    }),
);
export default useStyles;