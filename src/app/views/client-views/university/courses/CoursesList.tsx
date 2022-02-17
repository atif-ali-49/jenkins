import React, { useState, useEffect, useRef } from "react";
import {
  MBox,
  MTypography,
  MPaper,
  MCard,
  MCardHeader,
  MIconButton,
  MTooltip,
  MGrid,
  MCardContent,
  MCircularProgress
} from "src/app/components/mui";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { RouterBreadcrumbs } from "src/app/mui/breadcrumbs/Breadcrumbs";
import useStyles from "./CoursesStyles";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactPlayer from 'react-player';
import {showAlert} from "../../../../store";

import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import screenfull from 'screenfull'
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PauseIcon from '@material-ui/icons/Pause';
import { useDispatch,useSelector} from 'react-redux';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  FullScreenButton,
BigPlayButton,
} from 'video-react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { findDOMNode } from "react-dom";
function CoursesList(props: any) {
  let id = props.match.params.id;
  let uid = props.match.params.uid;
  const history = useHistory();
  const dispatch = useDispatch();
  const baseurl = process.env.REACT_APP_API_END_POINT;
  const [coursesList, setCoursesList] = useState<null | any>({});
  const [courses, setCourses] = useState<null | any>({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [showNextButton, setShowNextButton] = React.useState(false);
  const [loop, setLoop] = useState(false);
  const player = useRef<ReactPlayer>(null);
  const [playing,setPlaying] = useState<null | any>(true);
  // get course List of a specific module 8//23/2021
    const activeLanguageData = useSelector((store: any) => store?.activeLanguage.translator);
  const getCourseList = async  () =>{
    setLoading(true);
      let token = localStorage.getItem('access_token');
   await axios.post(baseurl + "/university_courses_videos/" + id + "/" + uid ,
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

          if(response.status === 200 && response.data.prevant_next == 0){
            dispatch(showAlert({
              message: response.data.message,
              messageType: 'error',
              showAlertMessage: true
            }));
            history.goBack();
          }else if(response.status === 200 ){
            setCoursesList(response.data.video);
            setCourses(response.data);

          }
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          setLoading(false);
        });
  }


  const courseQuiz = (id,lec_id,courseId) => {
    history.push(`/client/university/courses/quiz-course/${id}/${lec_id}/${courseId}`);
  };
   const getPdf = () => {
     let title = 1;
     history.push(`/client/university/quiz/${id}/${uid}/${title}`);
   }
  useEffect(() => {
    getCourseList();
  }, []);
    const ref = player => {
        player = player
    }
  const handleClickFullscreen = () => {
    // @ts-ignore
      const elemt =document.getElementById("videoReact");
      // @ts-ignore
      screenfull.request(elemt)
  }
  // @ts-ignore
  const handlePlayPause = () => {
        if(playing){
            setPlaying(false);
        }else{
            setPlaying(true);
        }

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
            {courses.course}
        </MTypography>
        <RouterBreadcrumbs />
      </MBox>
      <MBox className="contentBox" component={MPaper}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={8}>
            <MCard className={classes.commonDashboardCard} variant="outlined">
              <Card className={classes.card}>
                <MTypography gutterBottom component="div" variant="h5">
                <b>   {coursesList.title} </b>

                </MTypography>
              </Card>

              <MCardContent>
                <MGrid container justify="space-between" alignItems="center">
                  <MGrid item lg={12}>
                    <MBox onContextMenu={e => e.preventDefault()} >
                      <ReactPlayer
                        ref={player}
                        playsinline={true}
                        url={coursesList.video_file}
                        onEnded={() => setShowNextButton(true)}
                        controls={ courses.quiz_pass > 0 ? true : false}
                        // controls={true }
                        pip={true}
                        width="100%"
                        onContextMenu={(e) => e.preventDefault()}
                        playing={playing}
                        light={true}
                        volume={1}
                        config={{ file: {
                          attributes: {
                            controlsList: 'nodownload'
                          }
                        }}}
                        progressInterval={200}

                        loop={loop}
                        id={'videoReact'}
                      />
                        {
                            courses.quiz_pass == 0 &&
                            <MBox display="flex" m={1} p={1}>
                            <MBox flexGrow={1}>
                                <Button
                                    variant="contained"
                                    onClick={handlePlayPause}
                                >
                                    {playing ? <PauseIcon/> : <PlayArrowIcon/>}
                                </Button>
                            </MBox>
                            <MBox>
                                <Button

                                    variant="contained"
                                    onClick={handleClickFullscreen}
                                >
                                    <FullscreenIcon/>
                                </Button>
                            </MBox>


                        </MBox>}




                    </MBox>

                     <MBox my={2}>

                      <small className={classes.Alertcolor}><span className={classes.AttentionsAlign}><ReportProblemIcon></ReportProblemIcon></span><b>Attention</b>  {activeLanguageData?.lectureDetailAttenetion != "" ? activeLanguageData?.lectureDetailAttenetion:'Please do not refresh page.Video will start from beginning.'}</small>

                      <MTypography gutterBottom component="h4" variant="h6">
                        {showNextButton &&
                          <>
                        {loading ? <MBox
                          display="flex"
                          alignItems="center"
                          textAlign="center"
                          height="auto"
                          justifyContent="center"
                          className={classes.circular}>
                          <MCircularProgress />
                        </MBox> : <>
                          {courses.quiz_pass > 0 ? (
                            <Button
                              className={classes.btninvex}
                              variant="contained"
                              color="primary"
                            >

                                {activeLanguageData?.quizpassedbtn != "" ? activeLanguageData?.quizpassedbtn:'You have already passed the Quiz'}
                            </Button>
                          ) : (
                            <MTypography
                              gutterBottom
                              component="h4"
                              variant="h6"
                            >
                              {(coursesList.random_question >= coursesList.p_q_number) ?
                                <Button
                                  className={classes.btninvex}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => courseQuiz(coursesList.id,uid,props.match.params.id)}
                                  disabled={!showNextButton}
                                >

                                    {activeLanguageData?.quizbtn != "" ? activeLanguageData?.quizbtn :'Start Quiz'}
                                </Button>
                                :
                                <Button
                                  className={classes.btninvex}
                                  variant="contained"
                                  color="primary"
                                >

                                    {activeLanguageData?.quizcoming != "" ? activeLanguageData?.quizcoming :'Quiz is Coming Soon'}
                                </Button>
                              }
                            </MTypography>
                          )}
                        </>
                        }
                        </>
                        }
                      </MTypography>
                    </MBox>
                  </MGrid>
                </MGrid>
              </MCardContent>
            </MCard>
          </Grid>

          <Grid item sm={12} md={4}>
            <MCard className={classes.commonDashboardCard} variant="outlined">
              <MCardHeader
                title={activeLanguageData?.lectureDetailAtt != "" ? activeLanguageData?.lectureDetailAtt:'Attachments'}

              />
              <MCardContent>
                <MGrid container justify="space-between" alignItems="center">
                  <MGrid item sm={12} xs={12}>
                    <MBox>
                      <MTypography
                        component="div"
                        variant="body1"
                      >


                          {activeLanguageData?.lectureDetailInfo != "" ? activeLanguageData?.lectureDetailInfo:'If you would like to read the lecture click on the PDF below.'}
                      </MTypography>
                    </MBox>
                  </MGrid>
                </MGrid>
              </MCardContent>
              {
                courses.video  &&
                    <>
                      <MCardContent onClick={()=>getPdf()}>
                        <MGrid container justify="space-between" alignItems="center">
                          <MGrid item sm={12} xs={12}>
                            <MBox my={1}>
                              <Grid item className={classes.wordBorder}>
                                <MBox p={3} className={props.boxWrap}>
                                  <MBox display="flex" alignItems="center" mt={1}>
                                    <MBox>
                                      <MTypography
                                          gutterBottom
                                          component="h4"
                                          variant="h6"
                                      >
                                          {activeLanguageData?.lectureDetail != "" ? activeLanguageData?.lectureDetail:'LECTURE'}
                                      </MTypography>
                                    </MBox>
                                  </MBox>
                                  <MBox
                                      mt={1}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                  >
                                    <IconButton>
                                      <PictureAsPdfIcon className={classes.icons} />
                                    </IconButton>
                                  </MBox>
                                </MBox>
                              </Grid>
                            </MBox>
                          </MGrid>
                        </MGrid>
                      </MCardContent>
                      <MCardContent onClick={()=>{ history.push('/client/university/quiz/' + id + "/" + uid + "/" + 2) }}>
                        <MGrid container justify="space-between" alignItems="center">
                          <MGrid item sm={12} xs={12}>
                            <MBox my={1}>
                              <Grid item className={classes.wordBorder}>
                                <MBox p={3} className={props.boxWrap}>
                                  <MBox display="flex" alignItems="center" mt={1}>
                                    <MBox>
                                      <MTypography
                                          gutterBottom
                                          component="h4"
                                          variant="h6"
                                      >
                                          {activeLanguageData?.lectureDetailHigh != "" ? activeLanguageData?.lectureDetailHigh:'LECTURE HIGHLIGHT'}
                                      </MTypography>
                                    </MBox>
                                  </MBox>
                                  <MBox
                                      mt={1}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                  >
                                    <IconButton>
                                      <PictureAsPdfIcon className={classes.icons} />
                                    </IconButton>
                                  </MBox>
                                </MBox>
                              </Grid>
                            </MBox>
                          </MGrid>
                        </MGrid>
                      </MCardContent>
                    </>

              }
            </MCard>
          </Grid>
        </Grid>
      </MBox>
    </div>
  );
}

export default CoursesList;
