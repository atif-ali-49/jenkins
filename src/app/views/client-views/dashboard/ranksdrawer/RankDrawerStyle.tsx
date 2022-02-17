import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        announcementDrawer:{
            minWidth: "30%",
            maxWidth: "30%",
              [theme.breakpoints.down(1280)]: {
               minWidth: "100%",
            maxWidth: "100%", 
           },
           
           '& h1':{
              fontSize:'2rem',
              [theme.breakpoints.down(767)]: {
                fontSize: "1rem", 
                },
            }
            
        },
        totalrequiredvoluem:{
            color:'red',
            textAlign:"center"
        },
        totalrequiredvoluemheading:{
           fontSize:'12px',
           fontWeight: 400,
        },
        achicedheading:{
            color:"green",
            textAlign:"center",
        },
        rankDrawerWidth:{
            maxWidth:"50vw",
             [theme.breakpoints.down(700)]: {
            maxWidth:'100%'
        },
        },
         arrowbackward:{
            color:theme.palette.primary.dark,
        }
    }),
);

export default useStyles;