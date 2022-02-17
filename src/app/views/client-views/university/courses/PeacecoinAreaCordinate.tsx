import React, { useState, useEffect } from "react";
import {
  MBox,
  MTypography,
  MPaper,
  MCard,
  MPagination,
  MCardHeader,
  MIconButton,
  MGrid,
  MCardContent,
  MTableContainer,
  MTable,
  MTableCell,
  MTableHead,
  MTableRow,
  MTableBody,
  MChip,
  MCircularProgress,
  MButton,
} from "src/app/components/mui";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import { RouterBreadcrumbs } from "src/app/mui/breadcrumbs/Breadcrumbs";
import useStyles from "./CoursesStyles";
import { AiFillTrophy } from "react-icons/ai";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { NoData } from "src/app/components";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { showAlert } from "src/app/store";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#7b4e26",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },

  })
)(TableCell);

function Vac(props: any) {
  const initialStat = {
    user_id: "",
    course_id: "",
    course_status: ""
  }
  const [coursevalues, setCourseValues] = useState<null | any>(initialStat);
  const history = useHistory();
  const baseurl = process.env.REACT_APP_API_END_POINT;
  const [courseTitle, setCourseTitle] = useState<null | any>([]);
  const [statusCourse, setStatusCourse] = useState<null | any>([]);
  const [course, setCourse] = useState<null | any>({});
  const[recordsPerPage, setRecordsPerPage] = useState(30);
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(0);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [filterStatus,setFilterStatus] = useState<null | any>(false);
  const [usernamefilter,setUserNameFilter] = useState<null | any>('');
  const [filterError, setFilterError] = useState<null | any>(false);
  const [resultStatus, setResultStatus] = useState<null | any>(false);
  const [filterCount, setFilterCount] = React.useState<null | any>(0);
  const currentUser = useSelector((store: any) => store.auth.currentUser);
  const dispatch = useDispatch();

  const AreaCoordinates = (user_id, course_id, course_status) => {
    setLoading(true);
    let token = localStorage.getItem('access_token');
    axios.post(baseurl + '/area_coordinate_add',
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json;charset=UTF-8",
          Authorization: 'Bearer' + token  //the token is a variable which holds the token
        },
        user_id: course_id,
        course_id: user_id,
        course_status: course_status,
      }
    )
      .then(function (response) {
        setLoading(false);
          if(response.status === 200){
            getAreaCoordinateData(null);
          }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error)
      })
  }

  // get data for Area Coordinate
  const getAreaCoordinateData = (pageNum:any) =>{

    // @ts-ignore
       let pageNumber = pageNum != null ? pageNum  : currentPage;
       if(pageNum == 1){
         if(!usernamefilter && !filterStatus && !resultStatus){
           setFilterError(true);
           return false;
         }else{
           setLoading(true);
           axios.get(baseurl + `/area_coordinate_search/${recordsPerPage}?page=${pageNumber}`,
               {
                 params:{
                   student: usernamefilter ? usernamefilter : false,
                   active_status: (filterStatus ==  'active' &&   1 ) || (filterStatus ==  'de-active' &&   0 ),
                   result_status:(resultStatus ==  'passed' &&   1 ) || (resultStatus ==  'failed' &&   2 ),
                 }

               }
           )
               .then(function (response) {
                 setLoading(false);
                 setCourseTitle(response.data.course_title);
                 setFilterCount(response.data.result_count_info);
                 setStatusCourse(response.data.status_course.data);
                 setCourse(response.data);
                 setTotalPages(response.data['status_course']['last_page']);
                 setFilterError(false);
               })
               .catch(function (error) {
                 if(error.response.status == 404){
                   dispatch(showAlert({
                     message: error.response.data.message,
                     messageType: 'error',
                     showAlertMessage: true
                   }));
                   setStatusCourse([]);
                 }
                 setLoading(false);
                 // console.log(error.response.data.message,'ff f ff  ff ')
                 // getAreaCoordinateData(null)
               })
               .then(function () {
                 setLoading(false);
                 setFilterError(false);
               });
         }
       }else{
         setLoading(true);
         axios.get(baseurl + `/area_coordinate_search/${recordsPerPage}?page=${pageNumber}`,
             {
               params:{
                 student: usernamefilter ? usernamefilter : false,
                 active_status: (filterStatus ==  'active' &&   1 ) || (filterStatus ==  'de-active' &&   0 ),
                 result_status:(resultStatus ==  'passed' &&   1 ) || (resultStatus ==  'failed' &&   2 ),
               }

             }
         )
             .then(function (response) {
               setLoading(false);
               setCourseTitle(response.data.course_title);
               setFilterCount(response.data.result_count_info);
               setStatusCourse(response.data.status_course.data);
               setCourse(response.data);
               // res.data['smart_pay_packages']['last_page']
               setTotalPages(response.data['status_course']['last_page']);
               // console.log(response.data['status_course']['last_page'],'sddd d ddd dd status_course')
             })
             .catch(function (error) {
               if(error.response.status == 404){
                 dispatch(showAlert({
                   message: error.response.data.message,
                   messageType: 'error',
                   showAlertMessage: true
                 }));
                 setStatusCourse([]);
               }
               setLoading(false);
               // console.log(error.response.data.message,'ff f ff  ff ')
               // getAreaCoordinateData(null)
             })
             .then(function () {
               setLoading(false);
             });
       }


  }



  const showCourse = (lecture_id, course_id) => {
    history.push(
      "/client/university/show_user_course/" + lecture_id + "/" + course_id
    );
  };
   const filterInputHandler = (e) =>{
     setUserNameFilter(e.target.value)
     setFilterError(false);
   }


   const getFilterStatus = (e)=>{
     setFilterStatus(e.target.value);
     setFilterError(false)
   }
  const getResultStatus = (e) =>{
    setResultStatus(e.target.value);
    setFilterError(false)
  }
  const clearSelected = () => {
    setUserNameFilter('');
    setFilterStatus('');
    setResultStatus('');
    setLoading(true);
    axios.get(baseurl + `/area_coordinate_search/${recordsPerPage}?page=${currentPage}`,
        {
          params:{
            student: false ,
            active_status: false,
            result_status:false,
          }

        }
    )
        .then(function (response) {
          setLoading(false);
          setCourseTitle(response.data.course_title);
          setFilterCount(response.data.result_count_info);
          setStatusCourse(response.data.status_course.data);
          setCourse(response.data);
          setTotalPages(response.data['status_course']['last_page']);
          setFilterError(false);
        })
        .catch(function (error) {
          if(error.response.status == 404){
            dispatch(showAlert({
              message: error.response.data.message,
              messageType: 'error',
              showAlertMessage: true
            }));
            setStatusCourse([]);
          }
          setLoading(false);
          // console.log(error.response.data.message,'ff f ff  ff ')
          // getAreaCoordinateData(null)
        })
        .then(function () {
          setLoading(false);
          setFilterError(false);
        });

  };
  useEffect(() => {
    getAreaCoordinateData(null);
  }, [currentPage]);


  // @ts-ignore
  return (
    <div>
      <MBox className="pageHeader">
        <MTypography
          className="mainHeading"
          gutterBottom
          component="h1"
          variant="h4"
        >
          Courses Details
        </MTypography>
        <RouterBreadcrumbs />
      </MBox>
      <MBox className="contentBox" component={MPaper}>
        <MGrid container spacing={4}>
          <MGrid item sm={12} md={6}>
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex justify-content-between ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton  aria-label="settings">
                    <MTypography color="primary" component="h6" variant="h5">
                      <AiFillTrophy className={classes.icon} />
                    </MTypography>
                  </MIconButton>
                  <MBox>
                    <MTypography
                      className={`${classes.head} mainHeading`}
                      gutterBottom
                      component="h3"
                      variant="h4"
                      color="primary"
                    >
                      PAC
                    </MTypography>
                  </MBox>
                </MBox>
              </Card>
            </MBox>
          </MGrid>
          <MGrid item sm={12} md={6}>
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex justify-content-between ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton aria-label="settings">
                    <MTypography color="primary" component="h6" variant="h5">
                      <MenuBookIcon fontSize="large" className={classes.icon} />
                    </MTypography>
                  </MIconButton>
                  <MBox>
                    <MTypography
                      className={`${classes.head} mainHeading`}
                      gutterBottom
                      component="h3"
                      variant="h4"
                      color="primary"
                    >
                      Total Course :{course.total_courses ?? "0"}
                    </MTypography>
                  </MBox>
                </MBox>
              </Card>
            </MBox>
          </MGrid>
        </MGrid>

        <MGrid container spacing={4} justify="center">
          <MGrid item sm={12} md={12}>
            <MCard variant="outlined">
              <MCardHeader className={classes.searchField} />
               <MBox display="flex" >
                 <MBox className={classes.searchField}>
                   <TextField
                       id="outlined-basic"
                       value={usernamefilter}
                       label="Search By User Name"
                       variant="outlined"
                       error={filterError}
                       helperText={ filterError && "User name field is required"}
                       onChange={(e)=>filterInputHandler(e)}

                   />

                 </MBox>
                 <MBox>


                   <FormControl variant="outlined" className={classes.formControl}>
                     <InputLabel id="demo-simple-select-outlined-label">Serach by  status</InputLabel>
                     <Select
                         labelId="demo-simple-select-outlined-label"
                         id="demo-simple-select-outlined"
                         value={filterStatus}
                         onChange={getFilterStatus}
                         label="Serach by status"

                     >
                       <MenuItem value={'all'}>All</MenuItem>
                       <MenuItem value={'active'}>Active</MenuItem>
                       <MenuItem value={'de-active'}>De-Active</MenuItem>
                     </Select>
                     {filterError && <small className={classes.errorText}><b>Serach by status field required</b></small>}
                   </FormControl>



                 </MBox>
                 <MBox>
                   <FormControl variant="outlined" className={classes.formControl}>
                     <InputLabel id="demo-simple-select-outlined-label">Serach by result status</InputLabel>
                     <Select
                         labelId="demo-simple-select-outlined-label"
                         id="demo-simple-select-outlined"
                         value={resultStatus}
                         onChange={getResultStatus}
                         label="Serach by result status"
                     >
                       <MenuItem value={'all'}>All</MenuItem>
                       <MenuItem value={'passed'}>Passed</MenuItem>
                       <MenuItem value={'failed'}>Not Passed</MenuItem>
                     </Select>
                     {filterError && <small className={classes.errorText}><b>Serach by result status field required</b></small>}
                   </FormControl>

                 </MBox>
                 <MBox className={classes.searchbtn}>
                   <Button variant="contained" color="primary"  onClick={()=>getAreaCoordinateData(1)}>
                     Search
                   </Button>
                 </MBox>
                 <MBox className={classes.resetbtn}>
                   <a  href="javascript:void(0)" className={classes.resetbtn} onClick={clearSelected}>
                     Reset
                   </a>
                 </MBox>
               </MBox>
              <MCardContent>
                <MTableContainer component={"div"}>
                  <MTable aria-label="customized table">
                    <MTableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="left">
                          QPM
                        </StyledTableCell>

                        {
                          courseTitle.length > 0 &&
                          courseTitle.map((course: any) => (
                            <StyledTableCell align="center">
                              {course.title}
                            </StyledTableCell>
                          ))

                        }
                      </TableRow>

                    </MTableHead>
                    <MTableBody>
                      {loading ? <MBox
                        display="flex"
                        alignItems="center"
                        textAlign="center"
                        height="auto"
                        justifyContent="center"
                        className={classes.circular}>
                        <MCircularProgress />
                      </MBox> :

                          <>


                        {
                          statusCourse.length > 0 ? (

                          statusCourse.map((status,index) => (
                            <MTableRow>
                              <MTableCell>{index+1}</MTableCell>
                              <MTableCell component="th" scope="row">
                                {status?.user?.username}
                              </MTableCell>
                              {status?.user_course?.length > 0 ? (
                                status.user_course.map((user_courses) => (
                                  <>
                                    <MTableCell align="center">
                                      <MBox display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                                        <MBox p={1}>
                                          <MChip
                                              className={`statusChip info statusChipBorder`}
                                              size="large"
                                               title="Click to show  the course information"
                                              label={"Course Info"}
                                              onClick={() => showCourse(user_courses?.university_courses_id, status?.user?.id)}>
                                            Info
                                          </MChip>
                                        </MBox>
                                        <MBox p={1}>
                                            {/*  result_status*/}
                                          {
                                            user_courses?.result_status !== 0 ?
                                            <MChip

                                                className={user_courses?.result_status == 1 ?  classes.Resactive :  classes.Resdeactive}
                                                size="large"
                                                label={user_courses?.result_status == 1 ? "Passed" : "Not Passed"}
                                            />:
                                                <MChip
                                                    className={user_courses?.status == 1 ?  classes.deactive :  classes.active}
                                                    size="large"
                                                    title={ user_courses?.status == 1 ? "Click to de-activate this course" : 'Click to activate the course'}
                                                    label={user_courses?.status == 1 ? "De-activate" : "Activate"}
                                                    onClick={() => AreaCoordinates(user_courses.university_courses_id, status.user.id, user_courses.status)}
                                                />

                                          }

                                        </MBox>
                                      </MBox>
                                    </MTableCell>


                                    {
                                      ( status?.user_course?.length >= 1  && status?.user_course?.length < courseTitle.length ) &&
                                      <MTableCell align="center">
                                        <MBox component="div" marginBottom={1}>
                                          <MChip
                                              className={classes.statusChipBorder}
                                              size="large"
                                              label={'Coming Soon'}

                                          />
                                        </MBox>
                                      </MTableCell>
                                    }

                                  </>
                                ))
                              ) : (
                                <>
                                  <MTableCell align="center">
                                    <MBox component="div" marginBottom={1}>
                                      <MChip
                                          className={classes.statusChipBorder}
                                          size="large"
                                          label={'Coming Soon'}

                                      />
                                    </MBox>
                                  </MTableCell>
                                </>
                              )
                              }
                            </MTableRow>
                          ))
                        ) : (
                          <MBox mb={1} borderRadius={"4px"} display="flex"  justifyContent="center">
                           <MBox>
                             <NoData />
                           </MBox>
                          </MBox>
                        )}
                      </>
                      }
                    </MTableBody>
                  </MTable>
                </MTableContainer>
                {
                  totalPages > 0 &&
                  <MBox mt={3} display="flex" justifyContent="flex-end">
                    <MBox flexGrow={1}>{filterCount}</MBox>
                    <MBox><MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} /></MBox>
                  </MBox>
                }
              </MCardContent>
            </MCard>
          </MGrid>
        </MGrid>
      </MBox>
    </div>
  );
}


export default Vac;


