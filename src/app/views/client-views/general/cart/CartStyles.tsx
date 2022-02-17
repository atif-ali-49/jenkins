import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        minWidth: 700,
        "& .MuiPaper-elevation1":{
          boxShadow:0
        }
      },
      avatar:{
        width:'80px',
        height:'80px'
      },
      delIcon:{
        color:theme.palette.error.main
      },
      tableContainer:{
        boxShadow:'none'
      },
      cartTotalCover:{
        width:'300px'
      }

  })
);

export default useStyles;