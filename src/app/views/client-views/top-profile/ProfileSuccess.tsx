import React, { useState, useEffect } from 'react';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { MBox, MGrid, MPaper } from 'src/app/components/mui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { MAutoComplete, MCircularProgress,MButton } from "src/app/components/mui";
import AllMonths from "../e-wallet/fund-transfer/AllMonths";
import AllYears from "./AllYears";
import { NoData } from 'src/app/components';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    user_avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
        zIndex:1,
        border: '1px solid #ddd',
        backgroundColor: '#fff',

        "& img":{
            width: "100%",
            padding: "10px",
            borderRadius: "100px"
        },
        "&:hover + *": {
            borderColor:'#ef9318',
            color:'white',
            backgroundColor:'#ef9318'
        }

    },
    avatar_heading:{
        transition: "background .4s, color .4s",
        // position:"relative",
        // top:'-80px',
        marginTop:'-100px',
        borderStyle:"dotted",
        borderRadius:'50%',
        minHeight:"300px",
        left:"5px"
    },
    avatar_heading_text:{
        marginTop:"115px"
    },
    longtext:{
      display:'flex',
      width:'200px',
      justifyContent:'center',
      padding:'0 30px',
      lineHeight:'1.1',
      marginBottom:'4px'

    }
}));

function ProfileSuccess(props:any) {


    
    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [loading, setLoading] = useState(false);
    let thisMonth = new Date().getMonth()-1;
    const [currentMonth, setCurrentMonth] = useState( thisMonth == - 1 ? AllMonths['11'].title : AllMonths[thisMonth].title);
    const[currentYear,setCurrentYear] = useState(AllYears[1].title);
    const [topProducers, setTopProducers] = useState<any | null>([]);


    // Make a request for a user with a given ID
    const getTopProducers = (month:string) => {
        setLoading(true);
        axios.post(baseurl+'/top_producers/records',{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': '/',
                'Content-type': 'application/json',
            },
            month: currentMonth,
            year: currentYear
        })
        .then(function (res) {
            setTopProducers(res.data.result);

        })
        .catch(function (err) {
            console.log(err)
        })
        .then(() => {
            setLoading(false);
        });
    }

    useEffect(()=>{
        getTopProducers(currentMonth);


    },[]);


    
    return (
       <>
       
           <MBox className="pageHeader">
               <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Profiles Of Success</Typography>
               <RouterBreadcrumbs />
           </MBox>
           <MBox className="contentBox wrapper" component={MPaper}>
           {loading ?
                <MBox position="relative" py={2} textAlign="center" minHeight="40px" mb={2}>
                    <MCircularProgress />
                </MBox>
                :
                <>                
                    <MBox display="flex" alignItems="center">
                        <MBox mr={2} ml={2}>
                            {'Year'}
                        </MBox>
                        <MBox maxWidth="300px" minWidth="300px">
                            <MAutoComplete
                                options={AllYears}
                                label={currentYear}
                                getOptionLabel={(option) => option.title}
                                id={"monthsDropdown"}
                                onChange={(event, value) => setCurrentYear(value.title)}
                                disableClearable
                                disabled={loading}
                            />
                        </MBox>
                        <MBox mr={2} ml={2}>
                            {'Month'}
                        </MBox>
                        <MBox maxWidth="300px" minWidth="300px">
                            <MAutoComplete
                                options={AllMonths}
                                label={currentMonth}
                                getOptionLabel={(option) => option.title}
                                id={"monthsDropdown"}
                                onChange={(event, value) => setCurrentMonth(value.title)}
                                disableClearable
                                disabled={loading}
                            />
                        </MBox>
                        <MBox maxWidth="300px" minWidth="300px" ml={2}>

                            <MButton className="btnMedium" variant="contained" color="primary" onClick={()=>getTopProducers(currentMonth)} >Search</MButton>
                        </MBox>
                    </MBox>
               
               <MGrid container spacing={1} direction="row" justify="center" alignItems="center">
                       {
                        topProducers && topProducers.length ?
                               topProducers.map((producer) =>
                               <>
                                      <MGrid item key={producer.id}>
                                        <MBox display="flex" justifyContent="center" p={3}>
                                            <MBox textAlign={'center'}>
                                                <Avatar
                                                    alt="user"
                                                    src={producer.path !== '' && producer.path !== null ? producer.path : "/img/peacecoin-sparrow.svg" }
                                                    className={classes.user_avatar} />
                                                <MBox className={classes.avatar_heading}>
                                                    <MBox mb={1} className={classes.avatar_heading_text}>
                                                        <Typography className={classes.longtext} variant="body1">{producer.first_name}</Typography>
                                                        <Typography variant="body2">${producer.earn}</Typography>
                                                        { producer.rank  && <Typography variant="body2">Rank: {producer.rank ? producer.rank : '-'}</Typography>}
                                                        { producer.rank_type  && <Typography variant="body2">Rank Type: {producer.rank_type ? producer.rank_type : '-'}</Typography>}
                                                        { producer.bonus_rank_type && <Typography variant="body2">Bonus Rank Type: {producer.bonus_rank_type ? producer.bonus_rank_type : '-'}</Typography>}
                                                        { producer.bonus_rank && <Typography variant="body2">Bonus Rank: {producer.bonus_rank ? producer.bonus_rank : '-'}</Typography>}
                                                    </MBox>
                                                </MBox>
                                            </MBox>                                                                                         
                                        </MBox>
                                    </ MGrid>
                                
                                </>
                               )
                                :
                            <MBox mb={1} borderRadius={'4px'} mx={'auto'}>
                                <NoData />
                                
                            </MBox>
                             
                       }

               </MGrid>
                </>
            }
             
            
           </MBox>
           
       </>
    );
}

export default ProfileSuccess;