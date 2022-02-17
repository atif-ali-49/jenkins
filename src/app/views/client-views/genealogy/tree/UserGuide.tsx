import React from 'react';
import { useState } from 'react';
import {MGrid, MBox, MButton, MPaper, MTypography } from 'src/app/components/mui';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { useDispatch } from 'react-redux';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
//   }
  
  function getModalStyle() {
  const top = 20;
  const left = 9;
  const right = 9;
  return {
    top: `${top}%`,
    left: `${left}%`,
    right:`${right}%`,
    transform: `translate(-${top}%, -${left}%, -${right}%)`,
  };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
    position: 'absolute',
    textAlign:"center",
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    
    
    },
    root: {
      
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '& .MuiTab-textColorPrimary.Mui-selected':{
            color: '#f2efeb',
            background: '#ef9318'
        }
       
      },
      Heading: {
          padding: theme.spacing(2),
          fontSize:20,
          fontWeight:700,
          textAlign:'center'
     
      },
      tab:{
        maxWidth:"150px"
      },
      Description:{
        margin:"10px",
        padding:"2px",
        justifyContent:"center",
          textAlign:'justify'
  },
      videos:{
        width:"100%",
        height:"cover",
      },
      title:{
        marginLeft:"3px",
          fontSize: "2em"
      },
      ButtonStyle:{
        color:"white",
        backgroundColor:"black",
      },
      textSettings:{
        textAlign:'justify'
      }
  }),
  );
  



export default function UserGuideModal(props:any) { 
  const dispatch = useDispatch();
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	
	
	
	const handleClose = () => {
    props.setUserGuideOpen(false)
    
	};
	interface TabPanelProps {
        children?: React.ReactNode;
        dir?: string;
        index: any;
        value: any;
      }
    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box >
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      function a11yProps(index: any) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
      
        

 
       const theme = useTheme();
      const [values, setValues] = useState(0);
    
      const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValues(newValue);
      };
    
      const handleChangeIndex = (index: number) => {
        setValues(index);
      };
	const body = (
	  <div style={modalStyle} className={classes.paper}>
		   <MBox ><h3 className={classes.title}>User Guide</h3></MBox>

		<p>
		<div className={classes.root}>
      <AppBar position="relative" color="default">
        <Tabs
          value={values}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={<ArrowUpwardIcon fontSize="small" /> } {...a11yProps(0)} title="One Step Up" />
          <Tab label={<ArrowDownwardIcon fontSize="small"/>} {...a11yProps(1)} title="Bottom Center" />
          <Tab label={<SubdirectoryArrowLeftIcon fontSize="small"/>} {...a11yProps(2)} title="Bottom Left"  />
          <Tab label={<SubdirectoryArrowRightIcon fontSize="small"/>} {...a11yProps(3)} title="Bottom Right" />
          <Tab label={<ArrowUpwardIcon fontSize="small"/>  } {...a11yProps(4)}  title="Go To Top" />
     
        </Tabs>
      </AppBar>
   
        <TabPanel value={values} index={0} dir={theme.direction}>
        <MGrid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"

        >
             <MGrid item xs={12} md={12} lg={6} sm={12} >
                    <MTypography className={classes.Heading}>One Step Up</MTypography>
                    <MTypography className={classes.Description}>Click at this arrow to go one step up, suppose that you're at First User and you click at this arrow,
                     It will take you to the User One Step Up.</MTypography>
                
                </MGrid>
            
                <MGrid item xs={12} md={12} lg={6} sm={12}>
                <MBox className={classes.Heading}>
                <img className={classes.videos} src="https://media.peacecoin.io/userguide/Up1_4.gif"   alt="Logo" />       
                    
                </MBox>
                </MGrid>
                </MGrid>
        </TabPanel>
        <TabPanel value={values} index={1} dir={theme.direction}>
            <MGrid
              container
              spacing={3}
               direction="row"
               justifyContent="center"
               alignItems="center"
            >
               <MGrid item xs={12} md={12} lg={6} sm={12}>
                    <MTypography className={classes.Heading}>Bottom Center</MTypography>
                    <MTypography className={classes.Description}>Click at this arrow to go to bottom center, suppose that you’re at User 1 and you click at this arrow, it will take you to user User at bottom center.</MTypography>
                
                </MGrid>
            
                <MGrid item xs={12} md={12} lg={6} sm={12}>
                 <MBox className={classes.Heading}>
                    <img src="https://media.peacecoin.io/userguide/Bottom.gif" width="90%"  alt="Logo" />
                 </MBox>
                </MGrid>
        </MGrid>
        </TabPanel>
        <TabPanel value={values} index={2} dir={theme.direction}>
        <MGrid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
             <MGrid item xs={12} md={12} lg={6} sm={12} >
                    <MTypography className={classes.Heading}>Bottom Left</MTypography>
                    <MTypography className={classes.Description}>Click at this arrow to go to bottom left, suppose that you’re at User 1 and you click at this arrow, it will take you to user at bottom left</MTypography>
                
             </MGrid>
            
                <MGrid item xs={12} md={12} lg={6} sm={12}>
                <MBox className={classes.Heading}>
                <img className={classes.videos} src="https://media.peacecoin.io/userguide/Bottom_left.gif" height="80%"  alt="Logo" />   
                </MBox>
                </MGrid>
                </MGrid>
        </TabPanel>
        <TabPanel value={values} index={3} dir={theme.direction}>
        <MGrid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
             <MGrid item xs={12} md={12} lg={6} sm={12}>
                    <MTypography className={classes.Heading}>Bottom Right</MTypography>
                    <MTypography className={classes.Description}>Click at this arrow to go to bottom right, suppose that you’re at User 1 and you click at this arrow, it will take you to user at bottom right.</MTypography>
                
                </MGrid>
            
                <MGrid item xs={12} md={12} lg={6} sm={12}>
                <MBox className={classes.Heading}>
                <img className={classes.videos}src="https://media.peacecoin.io/userguide/Bottom_right.gif"  alt="Logo" />  
                </MBox>
                </MGrid>
                </MGrid>
        </TabPanel>
        <TabPanel value={values} index={4} dir={theme.direction}>
        <MGrid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
             <MGrid item xs={12} md={12} lg={6} sm={12}>
                    <MTypography className={classes.Heading}>Top</MTypography>
                    <MTypography className={classes.Description}>Click at this arrow to go to top, suppose that you’re at User 2 and you click at this arrow, it will take straight on top.</MTypography>
                
                </MGrid>
            
                <MGrid item xs={12} md={12} lg={6} sm={12}>
                <MBox className={classes.Heading}>
                <img className={classes.videos} src="https://media.peacecoin.io/userguide/Up.gif" alt="Logo" />  
                </MBox>
                </MGrid>
                </MGrid>
        </TabPanel>

    </div>
		</p>
          <MBox p={2} textAlign="right"><MButton variant="contained" color="primary" className="btnSmall" onClick={handleClose}>Close</MButton></MBox>
	  </div>
  );
     return (
      <div>
        {/* <MButton type="button" color="primary" >
          User Guide
        </MButton> */}
       
        <Modal
          open={props.userGuideOpen}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
     );
}