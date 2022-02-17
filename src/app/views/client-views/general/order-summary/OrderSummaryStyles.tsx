import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        minWidth: 700,
      },
      avatar:{
        width:'80px',
        height:'80px'
      },
      cartTotalCover:{
        width:'300px'
      },
      tableContainer:{
        boxShadow:'none'
      },
      formgroup:{
        borderBottom:'1px solid #e1e2e3',
        marginBottom:'30px'
      }

  })
);

export default useStyles;