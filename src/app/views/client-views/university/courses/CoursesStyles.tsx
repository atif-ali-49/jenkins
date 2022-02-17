import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    statCard: {
      width: "100%",
      padding: "0 !important ",

      "&:hover .smBubble": {
        transition: "all .4s",
        top: 79,
      },
      "& .MuiTypography-h5": {
        [theme.breakpoints.down(1660)]: {
          fontSize: "1.1rem",
        },
      },
    },
    circular:{
      position:"relative",
      top:"50%",
      left:"50%",
      padding:theme.spacing(7),
    },
    bluebox: {
      backgroundColor: "purple",
      width: "100%",
      height: "180px",

      "& .MuiTypography-h4": {
        color: "#fff",
      },
    },
    dflex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardHead: {
      // padding:"10px 0",
    },
    card: {
      padding: "17px",
    },
    commonDashboardCard: {
      "& .MuiCardHeader-content": {

      },
      "&.supportCard .MuiCardContent-root": {
        padding: "16px 0",
      },
    },
    commonDashboardHead: {
      padding: "16px 0",
    },
    CardBox: {
      "& .MuiChip-root": {
        minWidth: 58,
        height: 20,
      },
    },
    mainHeading1:{
      float:"left",
    },
    mainHeading2:{
      float:"right",
    },
    btnBlock: {
      backgroundColor: "#5575f3",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#6593b5",
      },
    },
    status: {
      borderTop: "1px solid",
      paddingTop: "10px",
    },
    link: {
      margin: "10px 0",
      color: "#000 !important",
      fontSize: "calc(1.3em + .1vw)",
    },
    boxparent: {
      position: "relative",
    },
    childdata: {
      position: "absolute",
      top: "40%",
      left: 0,
      right: 0,
      margin: "0 auto",
    },
    lightColor: {
      color: theme.palette.text.hint,
    },
    head: {
      marginLeft: "10px",
      
    },
    heading:{
      fontSize:"0.99",
    },
    btninvex: {
      margin: "10px 0",
    },
    wordBorder: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
      border: "2px solid #f0f0f0",
      background: "#f0f0f0",
      "&:hover": {
        background: "#f9efdc",
      },
    },
    icons: {
      fontSize: "75px",
      color: "#3c31b8",
    },
    icon: {
      fontSize: "50px",
    },
    danger: {
      color: "red",
    },
    statuscolor: {
      background: "#28D094",
      padding: 0,
      color: "#fff",
        borderRadius:'4px'
    },
    btn: {
      color: "#000",
      "& .MuiButton-label": {
        justifyContent: "start !important",
      },
    },
    modal: {
      display: "flex",
      padding: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    papers: {
      position: "absolute",
      width: 900,
      backgroundColor: theme.palette.background.paper,
    },
    clear: {
      justifyContent: "right",
    },
    cardBox: {
      borderBottom: "2px solid",
    },
    cardContent: {
      padding: "22px",
    },
    cardFooter: {
      padding: "22px",
      borderTop: "2px solid",
    },
    image: {
      backgroundSize: "cover",
    },
    title: {
      padding: "0 20px",
      marginBottom: "20px",
      marginTop: "20px",
    },
    checkbox: {
      padding: "0px 10px 20px 50px !important",
    },
    itemText: {
      marginLeft: "20px",
    },
      itemTextchip:{
        textAlign:"right"
      },
    btnGreen: {
      backgroundColor: "green !important",
        color:'white'
    },
    disabled:{
      pointerEvents:"none",
      opacity:'0.4'
    },
      deactive:{
          backgroundColor: "red !important",
          color:'white',
          borderRadius:'4px'
      },
      active:{
          backgroundColor: "green !important",
          color:'white',
          borderRadius:'4px'
      },
      options:{
        paddingLeft:"40px"
      },
     certificate:{
         "&:hover":{
             boxShadow:theme.shadows[5],
             transition: "all .4s",
             cursor:"pointer"
         }

      },
      Alertcolor:{
        color:'red'
      },
      searchField:{
          padding:'8px'
      },
      filtersection:{
        display:'none'
      },
      statusChipBorder:{
        borderRadius: "4px !important"
      },
      resetbtn:{
        color:'#ff4000',
          paddingTop:'25px',
          paddingLeft: '10px'
      },
      searchbtn:{
          paddingTop:'15px',
          paddingLeft: '10px'
      },
      formControl: {
          margin: theme.spacing(1),
          minWidth: 250,
          height: '25px',
      },
      errorText:{
          color:'#ff4000',
      },
      Resactive:{
          backgroundColor: '#4dd39b',
          color:'#fff',
          borderRadius:'0px',
          textTransform:"uppercase",
          letterSpacing:'1px',
          cursor: 'text',
          fontWeight:'bold'
      },
      Resdeactive:{
          backgroundColor: '#e37e8c',
          color:'#fff',
          borderRadius:'0px',
          textTransform:"uppercase",
          letterSpacing:'1px',
          cursor: 'text',
          fontWeight:'bold'
      },
      AttentionsAlign:{
        verticalAlign:'middle',
          display:'inline-block',
          marginRight:'3px'
      }


  })
);

export default useStyles;
