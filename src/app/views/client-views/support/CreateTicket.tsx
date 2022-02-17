import {useState} from 'react'
import { MBox, MTypography,MGrid, MPaper } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './TicketStyles';
import Button from '@material-ui/core/Button';
import axios from "axios";
import {useDispatch} from "react-redux";
import TextField from '@material-ui/core/TextField';
import { useToasts } from 'react-toast-notifications';
import Editor from 'material-ui-editor';
import { showAlert } from "src/app/store";
import { useHistory, NavLink } from "react-router-dom"
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';



function CreateTicket() {
    const classes = useStyles();
    let history = useHistory()
    const { addToast } = useToasts();
    const [subject, setSubject] = useState('');
    const [value, setValue] = useState<null | any>(null);
    const [imageObj, setImageObj]=useState()
     const [imageSrc, setImageSrc]=useState()
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const dispatch = useDispatch();

    const [image, _setImage] = useState<null | any>(null);

    const handleClick = (event:any) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }
    };

    const setImage = (newImage:any) => {
        if (image) {
            //   cleanup();
        }
        _setImage(newImage);
    };

    // const handleOnChange = (event:any) => {
    //     const newImage = event.target?.files?.[0];
    //     if (newImage) {

    //         setImage(URL.createObjectURL(newImage));
    //         addToast('Image Uploaded Successfully', { appearance: 'success', autoDismiss: true, PlacementType: 'bottom-left'});
    //     }
    // };

    // Submit Ticket
    const submitTicket =()=>{
         let formData:any = new FormData();    
    const regex = /(<([^>]+)>)/ig;
        //  let result = value!== '' && value.replace(regex, '');
        // const subject = setsubject ? setsubject :'';
        const img = image ? image :''
        if(value === null  || value === '' || value === undefined){
            dispatch(showAlert({
                message: "Message field is required",
                messageType: 'error',
                showAlertMessage: true
            }));
        }else if(subject === '' ||  subject.length > 50){
            dispatch(showAlert({
                message: "Subject field is Required",
                messageType: 'error',
                showAlertMessage: true
            }));
        }else{
          
                formData.append('subject',subject);
                formData.append('comment', value); 
                formData.append('image', imageObj);  
                 axios({
                        method: "post",
                        url: baseurl+'/ticket/create',
                        data: formData,
                        headers: { 'content-type': 'multipart/form-data' }
                    })

            .then(function (response) {
                if(response.status === 200){
                    dispatch(showAlert({
                        message: "Ticket Created Successfully",
                        messageType: 'success',
                        showAlertMessage: true
                    }));
                    history.push("/client/support/tickets");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
    return (
            <div>
                <MBox className="pageHeader">
                    <MBox className={classes.dflex}>
                        <MTypography className="mainHeading" gutterBottom display="inline" component="h1" variant="h4">Create New Ticket</MTypography>
                        <NavLink className={classes.textdecoration} exact to="/client/support/tickets"><Button  variant="contained"  color="primary" size="small">View all Tickets</Button> </NavLink>            
                    </MBox>			
                    <RouterBreadcrumbs />
                </MBox>   
                <MBox className="contentBox" component={MPaper}>
                    <MGrid container justify="center" spacing={2}>
                        <MGrid items xs={12}>
                            <MBox mx={1} className={classes.editorParent}>
                                <MBox mt={2}>
                                    <TextField id="subject" label="Subject" size="small"  variant="outlined" color="primary" name='subject' value={subject} onChange={(e)=>setSubject(e.target.value)}  fullWidth />
                                </MBox>
                                <MBox  mt={5} border={1} borderColor="#c1c2c3">
                                    <Editor onChange={(content)=>setValue(content)} editorStyle={{ minHeight: 300, maxHeight: 350, overflowY: 'hidden', outline: 'none', marginTop:'20px' }}  />
                                </MBox>
                            </MBox>
                            <MBox display='flex' justifyContent="flex-end" alignItems="center">                           
                                {/* <MBox mt={3} mr={3}>
                                      {
                                        imageSrc !== '' ?
                                        <Avatar alt="Remy Sharp" src={imageSrc} className={classes.avatarStyle} />
                                        :
                                        <Avatar alt="Remy Sharp"  src="/img/client-dashboard/avatar.jpg" className={classes.avatarStyle} />
                                            }
                                    <Button  variant="outlined" color="primary" component="label" size="small">
                                            <AttachFileIcon/>
                                            <input  type="file" hidden 
                                                accept="image/png, image/jpeg"
                                                onChange={(event: any) => {
                                                    let fileObj = event.currentTarget.files[0];
                                                    if(typeof fileObj  !== 'undefined' && typeof fileObj  !== null){
                                                        let fileType =  fileObj['type'];
                                                        if(fileType.includes("jpeg") || fileType.includes("jpg") || fileType.includes("png") || fileType === "jpeg" || fileType === "jpg") {
                                                            setImageObj(event.currentTarget.files[0]);
                                                            setImageSrc(event.target.files[0] && URL.createObjectURL(event.target.files[0]));
                                                        }else{
                                                            dispatch(showAlert({
                                                                message: "You can choose only jpg or png image",
                                                                messageType: 'error',
                                                                showAlertMessage: true
                                                            }));
                                                        }
                                                    }
                                                }}
                                                />
                                        </Button>   
                                </MBox> */}
                                <MBox mt={3}>
                                    <Button variant="contained" className="btnSmall" color="primary" onClick={submitTicket}>Submit</Button>
                                </MBox>
                            </MBox>
                        </MGrid>
                    </MGrid>
                </MBox>
            </div>
    )
}

export default CreateTicket