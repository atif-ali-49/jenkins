import React, { useState, useEffect } from "react";
import {
  MBox,
  MTypography,
  MPaper,
  MCard,
  MCardHeader,
  MIconButton,
  MGrid,
  MButton,
  MCardContent,
  MCircularProgress,
  MChip
} from "src/app/components/mui";
import {
  ListItem,
  ListItemText,
  CardMedia,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import { RouterBreadcrumbs } from "src/app/mui/breadcrumbs/Breadcrumbs";
import useStyles from "./CoursesStyles";
import { AiFillTrophy } from "react-icons/ai";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import axios from "axios";
import { useDispatch,useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { showAlert,activeLanguage } from 'src/app/store';
import { NoData } from "src/app/components";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
function CoursesDetails(props: any) {
  const history = useHistory();
  const baseurl = process.env.REACT_APP_API_END_POINT;
  const [coursesDetail, getCoursesDetail] = useState<null | any>({});
  const [courses, getCourses] = useState<null | any>({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const activeLanguageData = useSelector((store: any) => store?.activeLanguage.translator);
  const getCourseDetail =  async () =>{
    setLoading(true);
    let id = props.match.params.id;
    // Make a request for a course detail with a given ID

    let token = localStorage.getItem('access_token');
   await axios.post(baseurl + "/university/" + id,
       {
         language:activeLanguageData.activeLanguageFlag,
         headers: {
           "Access-Control-Allow-Origin": "*",
           "Content-type": "Application/json;charset=UTF-8",
           Authorization: 'Bearer' + token  //the token is a variable which holds the token
         },

       }
       )
        .then(function (response) {
          // handle success

          setLoading(false);

          if(response.status === 200){

            getCoursesDetail(response.data.single_course);
            getCourses(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        })
        .then(function () {
          setLoading(false);
        });
  }
  useEffect(() => {
    getCourseDetail();
  }, []);
  const courseDetail = (course_id, courses_id) => {
    history.push("/client/university/courses/courses-details/" + course_id + "/" + courses_id);
  };
  const getPassedCourseCertification = async () =>{
    let passedCourseId = props.match.params.id;

    history.push('/client/university/course/certificate/'+passedCourseId)
  }
  return (
    <div>
      <MBox className="pageHeader">
        <MTypography
          className="mainHeading"
          gutterBottom
          component="h1"
          variant="h4"
        >
          {activeLanguageData?.lectureHeading != "" ? activeLanguageData?.lectureHeading:'Lectures'}
        </MTypography>
        <RouterBreadcrumbs />
      </MBox>
      <MBox className="contentBox" component={MPaper}>
        <Grid container spacing={4} justify="center">
          {
            courses.quiz_pass_count > 0 &&
            <Grid item xs={12} sm={12} md={4} lg={4} xl={3}  >
              <MBox className={classes.certificate}  onClick={()=>getPassedCourseCertification()}>
                <Card className={classes.commonDashboardHead} variant="outlined">
                  <MBox
                      className={`d-flex  ${classes.dflex}`}
                      p={2}
                  >
                    <MIconButton aria-label="settings">
                      <MTypography color="primary" component="h6" variant="h5">
                        <VerifiedUserIcon color="primary" fontSize="large" className={classes.icon}></VerifiedUserIcon>
                      </MTypography>
                    </MIconButton>
                    <MBox>
                      <MTypography
                          className={`${classes.head} mainHeading`}
                          gutterBottom
                          component="h5"
                          variant="h6"
                          color="primary"

                      >

                        {activeLanguageData?.lectureWeidgetCer != "" ? activeLanguageData?.lectureWeidgetCer:'Certification'}
                      </MTypography>
                    </MBox>
                  </MBox>
                </Card>
              </MBox>
            </Grid>
          }
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3} >
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex  ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton aria-label="settings">
                    <MTypography color="primary" component="h6" variant="h5">
                      <AiFillTrophy color="primary" fontSize="large" className={classes.icon} />
                    </MTypography>
                  </MIconButton>
                  <MBox>
                    <MTypography
                      className={`${classes.head} mainHeading`}
                      gutterBottom
                      component="h3"
                      variant="h6"
                      color="primary"
                    >
                      {activeLanguageData?.lectureWeidgetPC != "" ? activeLanguageData?.lectureWeidgetPC:'Passed Courses'}  : {courses.show_total_pass_test ?? "0"}
                    </MTypography>
                  </MBox>
                </MBox>
              </Card>
            </MBox>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex  ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton aria-label="settings">
                    <MTypography component="h6" variant="h5">
                      <MenuBookIcon color="primary" fontSize="large" className={classes.icon} />
                    </MTypography>
                  </MIconButton>
                  <MBox>
                    <MTypography
                      className={`${classes.head} mainHeading`}
                      gutterBottom
                      component="h3"
                      variant="h6"
                      color="primary"
                    >
                      {activeLanguageData?.lectureWeidgetTC != "" ? activeLanguageData?.lectureWeidgetTC:'Total Courses'}  : &nbsp; {courses.total_courses ?? "0"}
                    </MTypography>
                  </MBox>
                </MBox>
              </Card>
            </MBox>
          </Grid>
        </Grid>

        <Grid container spacing={4} justify="center">
          <Grid item sm={12} md={10}>
            <MCard className={classes.commonDashboardCard} variant="outlined">
              <MCardHeader title={activeLanguageData?.leactureSubHeading != "" ? activeLanguageData?.leactureSubHeading:'All Lectures'}  />
              <MCardContent className={classes.CardBox}>
                <MGrid container  alignItems="center">
                  <MGrid item sm={12} xs={12}>
                  {loading ? <MBox
                      display="flex"
                      alignItems="center"
                      textAlign="left"
                      height="auto"
                      justifyContent="center"
                      className={classes.circular}>
                      <MCircularProgress />
                    </MBox> 
                    : 
                    <>
                      {coursesDetail.length ? (
                        coursesDetail.map((coursesDetail) => (
                          <MBox
                            my={2}
                            key={coursesDetail.id}
                            onClick={() =>
                              courseDetail(
                                coursesDetail.university_courses_id,
                                coursesDetail.id
                              )
                            }
                          >
                            <ListItem button>
                              <MGrid
                                container
                                justify="space-between"
                                alignItems="center"
                              >
                                <MGrid item sm={12} xs={12} lg={4} md={4}>
                                  <CardMedia
                                    component="img"
                                    alt="Lecture Image"
                                    height="170px"
                                    width="50px"
                                    className={classes.image}
                                    image={coursesDetail.image}
                                    title="course_image"
                                  />
                                </MGrid>
                                <MGrid item sm={12} xs={6} lg={8} md={8}>
                                  <ListItemText className={classes.itemText}>
                                    <MTypography
                                      gutterBottom
                                      component="h4"
                                      variant="h6"
                                    >
                                      {coursesDetail.title}
                                    </MTypography>

                                    {
                                      coursesDetail.pass_quiz?.id ?
                                      <MTypography
                                          className={classes.itemTextchip}
                                          gutterBottom
                                          component="h4"
                                          variant="h6"
                                      >
                                        <MChip

                                            className={classes.Resactive}
                                            size="large"
                                            label={'✔ Passed'}
                                        />
                                      </MTypography>
                                        :
                                      <MTypography
                                      className={classes.itemTextchip}
                                      gutterBottom
                                      component="h4"
                                      variant="h6"
                                      >
                                      <MChip

                                      className={classes.Resdeactive}
                                      size="large"
                                      label={'Not Passed'}
                                      />
                                      </MTypography>

                                    }
                                  </ListItemText>

                                </MGrid>
                              </MGrid>
                            </ListItem>
                          </MBox>
                        ))
                      ) : (
                        <MBox mb={1} borderRadius={"4px"}>
                          <NoData />
                        </MBox>
                      )}
                    </>
                  }
                  </MGrid>
                </MGrid>
              </MCardContent>
            </MCard>
          </Grid>
        </Grid>
      </MBox>
    </div>
  );
}

export default CoursesDetails;
