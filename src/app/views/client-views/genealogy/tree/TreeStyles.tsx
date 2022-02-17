import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide:{
      display: 'none',
    },
    filterBar:{
      // backgroundColor: "#f1f1f1",
    },
    // filter button
    filterButtonsPaper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
      padding: theme.spacing(0.3),
      
      "& .MuiToggleButton-root":{
        maxWidth: 50,
        minWidth: 50,
      }
    },
    searchField:{

    }
    
  })
);

export default useStyles;