import React,{useState, useEffect, useRef} from 'react'
import { MBox, MTypography, MPaper, MTooltip} from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './LiveChatStyles'
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { TextField, InputAdornment } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { ReactCustomScrollbars } from 'src/app/components'
import axios from 'axios'
import { showAlert } from 'src/app/store';
import { useDispatch } from 'react-redux';
function LiveChat(props) {
    const classes = useStyles();
    const initialState = {
        type:0,
        comment:'',
    }
    const[reply,setReply] = useState<any | null>(initialState);
    const[chat,setChat] = useState<any | null>([]);
    const[flag,setFlag] = useState(true);
   
    const getReply = (event:any) =>{
        setReply(prevState => ({
            ...prevState,
            comment:event.target.value
          }))
    }
   
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const ticket = props.match.params.ticket;
    const dispatch = useDispatch();
    const sendMsg = ()=>{
           
        if(!reply.comment){
            dispatch(showAlert({
                message: "message is required",
                messageType: 'error',
                showAlertMessage: true
              }));
            
        }else{
            
            axios.post(baseurl+'/ticket/reply/'+ticket, {
                comment:reply.comment,
              })
              .then(function (response) {
                if(response.status === 200){
                    setFlag(true) 
                    setReply(prevState => ({
                        ...prevState,
                        comment:''
                      })) 

                      dispatch(showAlert({
                        message: "message send successfully",
                        messageType: 'success',
                        showAlertMessage: true
                      }));

                    // var objDiv = document.getElementById("your_div");
                    // objDiv.scrollTop = objDiv.scrollHeight;
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        
        }
        
          
         }

         const sendMsgOnEnter = (event:any) => {
             if(event.key === 'Enter'){
                 sendMsg();
             }
         }

         const handleScrollBarUpdate = ()=> {
             
         }

    useEffect(()=>{

        flag &&
        axios.get(baseurl+'/ticket/admin_reply/'+ticket)
            .then(function (response) {
                if(response.status === 200){
                    setChat(response.data);
                    setFlag(false) 
                }
               
                }) 

            .catch(function (error) {
                console.log(error);
            })
           
    },[flag]);
 return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading" gutterBottom component="h1" variant="h4">Live Chat</MTypography>
				<RouterBreadcrumbs />
            </MBox>   
            <MBox className="contentBox" component={MPaper}>
                <MBox className={classes.chatBox}>
                    <MBox display="flex" p={1} alignItems="center" className={classes.chatHeader}>
                         <Avatar alt="Remy Sharp" src=""  />
                         <MBox ml={2}>
                          <MBox ml={0.5}>Admin</MBox>
                          <MBox display="flex" alignItems="center"><FiberManualRecordIcon className={classes.onlineIcon} fontSize="small"/> Online</MBox>
                         </MBox>
                    </MBox>  
                        <ReactCustomScrollbars
                            id="scrollBar"
                           
                            // onScrollFrame={alert('asd')}
                         style={{ height: 520, marginBottom:50 }}
                        >
                                <MBox className={classes.chatBody}>
                                    <MBox>
                                            {
                                                chat.length ? 
                                                chat && chat.map((msg:any)=>
                                               
                                                <MBox p={2} display="flex" justifyContent={msg.type === 1 ? "flex-end" : "flex-start"}>
                                             
                                                { msg.type == 0  &&   <Avatar alt="Remy Sharp" src={msg.img ? msg.img: "" }/>}
                                                <MBox ml={2}>
                                                    <MBox  className={msg.type === 1 ? classes.chatMsg : classes.chatMsgOther} dangerouslySetInnerHTML={{ __html:msg.comment}}></MBox>
                                                </MBox>
                                            </MBox>

                                                )
                                               : ''

                                            }
                                           

                                           
                                           
                                            
                                    </MBox>
                                </MBox>   
                        </ReactCustomScrollbars> 
                        <MBox display="flex" className={classes.chatFooter}>
                            <TextField 
                                id="filled-basic"
                                onKeyDown={sendMsgOnEnter}
                                color="secondary"
                                size="small"
                                fullWidth
                                label="Type here"
                                variant="filled"
                                name="reply"
                                value={reply.comment}
                                onChange={getReply}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        {/*<IconButton> <AttachFileIcon/></IconButton>*/}
                                        <MTooltip title="Enter Key Will Send Your Message" aria-label="send msg on enter" arrow placement="right">
                                            <IconButton  onClick={sendMsg}> <SendIcon /></IconButton>
                                        </MTooltip>

                                    </InputAdornment>
                                    )
                                }}
                            />

                               
                        </MBox>
                       
                </MBox>
               
            </MBox>
        </div>
    )
}

export default LiveChat