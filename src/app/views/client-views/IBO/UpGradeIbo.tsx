import React,{useState,useEffect} from 'react';
import { MBox, MGrid, MPaper,MList,MListItem,MListItemText } from '../../../../app/components/mui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import { useSelector,useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useHistory } from 'react-router';
import axios from 'axios';
import { showAlert} from 'src/app/store';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign:'center'
    },
    title: {
        flexGrow: 1,
    },
    iconSetting:{

        color:'#ef9318',
        width: 60,
        height: 60,
    },
    textColor:{
        color:'#ef9318'
    },
    maindivBg:{
        backgroundColor:theme.palette.background.paper,
        textAlign:'center',
        borderRadius:'7px'
    },
      parentCard:{
        position:'relative',
        margin:'40px auto',
        maxWidth:'350px',

    },
   smartcard:{
       background:theme.palette.background.paper,
       textAlign:'center',
       margin:'0 auto',
       padding:'40px 0',
       borderRadius:'20px',
       zIndex:2,
       position:'relative',
       boxShadow: '1px 0px 5px 2px rgba(0,0,0,0.55)'
   },
   ListParent:{
       display:'table',
       margin:'0 auto',
   },
   svg:{
    color:'#16c116',
    marginRight:'10px'
   },
   topstyle:{
       position:'absolute',
       top:'-25px',
       content:'',
       width:'90%',
       left:0,
       right:0,
       height:'50px',
       marginLeft:'auto',
       marginRight:'auto',
       borderRadius:'15px',
       zIndex:1
   },
   bottomstyle:{
    position:'absolute',
    bottom:'-25px',
    content:'',
    width:'90%',
    left:0,
    right:0,
    height:'50px',
    marginLeft:'auto',
    marginRight:'auto',
    borderRadius:'15px',
    zIndex:1
},
silverbackground:{
    backgroundColor:theme.palette.text.hint,
    color:'#fff',
    '&:hover':{
        backgroundColor:theme.palette.text.hint,
    }

},
goldbackground:{
    backgroundColor:'#ef9318',
    color:'#fff',
    '&:hover':{
        backgroundColor:'#ef9318'
    }
},
platinumbackground:{
    backgroundColor:'#5C2A85',
    color:'#fff',
    '&:hover':{
        backgroundColor:'#5C2A85',
    }
},
}));
 



function UpGradeIbo(props:any) {
    const dispatch = useDispatch();
    const[ibo,setIbo] = useState<any | null>([]);
   // useEffect for getting ibo packages
   const history = useHistory();
   const baseurl = process.env.REACT_APP_API_END_POINT;
   const getIbo = () =>{
    axios.get(baseurl+'/smart_pay_packages', {
     })
      .then(function (response) {
     
        if(response.data.code === 200 && response.data.message){
            setIbo(response.data.smart_pay_packages)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 
}

    useEffect(()=>{
        getIbo();
    },[]);

    const setIboData =(data:any)=>{
    //   console.log(data,'data of ibo')
        let checkIboInCart :any = [];
         checkIboInCart = JSON.parse(localStorage.getItem('cart') || '[]')
        if(checkIboInCart.length !== 0){
           let iboexist =  checkIboInCart.find((item) => item.category === 'ibo');
               if(iboexist === undefined){
                   localStorage.setItem('ibo',JSON.stringify(data));
                   history.push('/client/checkout');
                   // dispatch(showAlert({
                   //     message: "Ibo added to cart successfully",
                   //     messageType: 'success',
                   //     showAlertMessage: true
                   // }));
               }else{
                   dispatch(showAlert({
                       message: "Ibo already in your cart",
                       messageType: 'info',
                       showAlertMessage: true
                   }));
               }

        }else{
            localStorage.setItem('ibo',JSON.stringify(data));
            history.push('/client/checkout');
        }

    }
    const classes = useStyles();
    const[setibo,SetIbo]= useState<null | any>(null)
    const vip_status = useSelector((store: any) => store.auth.currentUser.vip_status);
    const ibo_status = useSelector((store: any) => store.auth.currentUser.ibo_status);
    const SetIboState =()=>{
        SetIbo(1)
    }

   // console.log(vip_status,'vip_status ')
   //  console.log(ibo_status,'ibo_status')
    return (
        <>
            <MBox className="pageHeader">
                <Typography className="mainHeading" gutterBottom component="h1" variant="h4">Upgrade To IBO</Typography>
                <RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
                {
                    vip_status == 0 && <Alert severity="info">First you have to purchase the VIP packge for IBO subscription !</Alert>
                }

                <MGrid cointainer spacing={3}>
                <MGrid item xs={12}>
                    {
                         vip_status == 0 || ibo_status == 0 ?
                                  
                 <div className={classes.parentCard}>
                <MBox className={classes.smartcard}>
                       
                       { 
                       ibo.length !== 0 ?
                       ibo.map((values:any)=>

                       values.category === 'ibo' &&
                       <>
                       <Typography className="mainHeading" component="h1" variant="h4">{values.title}</Typography>
                        <Typography className="mainHeading" gutterBottom component="h1" variant="h6">${values.price}</Typography>
                        <MList className={classes.ListParent}>
                          <MListItem>
                                {/* <CheckCircleRoundedIcon className={classes.svg}/>    */}
                         </MListItem>
                        </MList>
                         <MBox textAlign="center">
                            <Button variant="contained" color="primary" onClick={()=>setIboData(values)} disabled={vip_status == 0 && true }>
                                UpGrade To IBO
                                </Button>
                        </MBox>
                        </>
                        )
                        :''
                         }
                </MBox>
                <span className={`${classes.topstyle} ${classes.silverbackground}`}></span>
                <span className={`${classes.bottomstyle} ${classes.silverbackground}`}></span>
            </div>
                    :
                       <>
                            <MBox
                                   direction="row"
                                   display='flex'
                                   justifyContent="center"
                                   alignItems="center"
                               >


                                    <MBox p={10} className={classes.maindivBg}>
                                       <CheckCircleIcon className={classes.iconSetting}  />
                                        <MBox mt={1}>
                                            <Typography variant="h4" className={classes.textColor}>
                                                Congratulations!
                                            </Typography>


                                        </MBox>

                                        <MBox mt={1}>
                                            <Typography variant="h6">
                                                You are already upgraded to IBO
                                            </Typography>
                                        </MBox>
                                    </MBox>


                              </MBox>
                       </>
                    }
                </MGrid>
            </MGrid>
            </MBox>
        </>
    );
}

export default UpGradeIbo;