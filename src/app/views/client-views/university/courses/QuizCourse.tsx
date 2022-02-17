import React,{ useEffect, useState } from "react";
import {
    MBox,
    MTypography,
    MPaper,
    MForm,
    MFormik,
    MGrid,
    MTextField,
    MButton,
    MCircularProgress
} from "src/app/components/mui";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { NoData } from "src/app/components";
import { RouterBreadcrumbs } from "src/app/mui/breadcrumbs/Breadcrumbs";
import useStyles from "./CoursesStyles";
import { useHistory } from "react-router-dom";
import { Grid ,TextField} from "@material-ui/core";
import { showAlert } from "src/app/store";
import * as Yup from "yup";
import { useDispatch,useSelector} from 'react-redux';
function Quiz(props: any) {
    let courseId = props.match.params.course_Id;
    let lectureId = props.match.params.lec_id;
    let id = props.match.params.id;

    const classes = useStyles();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const history = useHistory();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<null | any>([]);
    const [quizBank, setQuizBank] = useState<null | any>([]);
    const [passQues, getPassQues] = useState<null | any>([]);
    const [passQues2, setPassQues2] = useState<null | any>({});
    const [loading, setLoading] = useState(false);
    const[courseLectureId,setCourseLectureId] = useState<null | any>('');
    const[selectedOption,setSelectedOptions] = useState<null | any>(false);
    const [coursesDetail, getCoursesDetail] = useState<null | any>({});
    const [courses, getCourses] = useState<null | any>({});
    const [quizfail, setQuizfail] = useState<null | any>(true);
    const activeLanguageData = useSelector((store: any) => store?.activeLanguage.translator);
    const getQuizData = () =>{
        let token = localStorage.getItem('access_token');
        axios.post(baseurl + "/university_show_quiz/" + id,
            {
                language:activeLanguageData.activeLanguageFlag,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json;charset=UTF-8",
                    Authorization: 'Bearer' + token  //the token is a variable which holds the token
                },

            }
            )
            .then((res) => {
                // handle success
                setLoading(false);
                if(res.status === 200){

                    res.data.quiz !== undefined ?
                        setQuiz(res.data.quiz)
                        :
                        dispatch(showAlert({
                            message: res.data.message,
                            messageType: 'error',
                            showAlertMessage: true
                        }));

                }
            })
            .catch((error) => {

                setLoading(false);
            })
            .then((res) => {
                setLoading(false);
            })
    }
    const getQuizOptions = (e,lectureId) =>{
        const name = e.target.name;
        setCourseLectureId(lectureId);
        const value = e.target.value;
        let key = name;
        let item = { [key]: value };
        let tempArr:any = [];
        let index = quizBank.findIndex(it => Object.keys(it)[0] == key );
        if (index == -1) {
            tempArr.push(item);
            setQuizBank([...quizBank,...tempArr])
        }else{
            tempArr = quizBank;
            tempArr[index]= item ;
            setQuizBank(tempArr)

        }
    }
    const courseDetail = () => {
        if( courses.quiz_pass_count > 0){

            history.push('/client/university/course/coin/transfer');
        }else{
            history.push("/client/university/courses/courses-details/" + courseId + "/" + lectureId);
        }


    };
    const getCourseDetail =  async () =>{
        setLoading(true);
        let id = props.match.params.courseId;
        // Make a request for a course detail with a given ID
        await axios.get(baseurl + "/university/" + props.match.params.course_Id)
            .then(function (response) {
                // handle success
                setLoading(false);
                if(response.status === 200){
                    if( response.data.quiz_pass_count > 0){
                        history.push('/client/university/course/coin/transfer');
                    }else{

                        history.push("/client/university/courses/courses-details/" + courseId + "/" + lectureId);
                    }

                }
            })
            .catch(function (error) {
                courseDetail();
                console.log(error);
                setLoading(false);
            })
            .then(function () {
                setLoading(false);
            });
    }

    const submitQuiz = (event:any) =>{
        event.preventDefault();
        if(quizBank.length > 0){
            axios.post(baseurl+'/university_quiz_test', {
                q_lec_id: courseLectureId,
                quiz: JSON.stringify(quizBank)
            })
                .then(function (response) {
                    if(response.status === 200){

                        dispatch(showAlert({
                            message: response.data.message,
                            messageType: 'success',
                            showAlertMessage: true
                        }));
                        getCourseDetail();
                    }else if(response.status === 202){
                        getCourseDetail();
                        dispatch(showAlert({
                            message: response.data.message,
                            messageType: 'error',
                            showAlertMessage: true
                        }));

                        // courseDetail();
                        history.push("/client/university/courses/courses-details/" + courseId + "/" + lectureId);
                    }

                })
                .catch(function (error) {
                    if(error.response.status === 500){
                        dispatch(showAlert({
                            message: "Internal server error!",
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }else if(error.response.status === 304){
                        dispatch(showAlert({
                            message: error.response.data.message,
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }
                    else{
                        dispatch(showAlert({
                            message: "Something went wrong please wait.",
                            messageType: 'error',
                            showAlertMessage: true
                        }));
                    }
                    console.log(error);
                });
        }


    }

    useEffect(() => {
        setLoading(true);
        getQuizData();

        }, []);

    return (
        <div>
            <MBox className="pageHeader">
                <MTypography
                    className="mainHeading"
                    gutterBottom
                    component="h1"
                    variant="h4"
                >
                    {activeLanguageData?.quizHeading !="" ? activeLanguageData?.quizHeading : 'Quiz Questions'}
                </MTypography>
                <RouterBreadcrumbs />
            </MBox>

            <MBox className="contentBox" component={MPaper}>
                {loading ? <MBox
                        display="flex"
                        alignItems="center"
                        textAlign="center"
                        height="auto"
                        justifyContent="center">
                        <MCircularProgress />
                    </MBox> :
                    <>



                        <form onSubmit={submitQuiz}>
                            <MBox mt={2} mb={4} display="flex" justifyContent="space-between">
                                <MGrid container spacing={2}>
                                    <MGrid item sm={12} xs={12}>

                                        {quiz.length > 0 ? (

                                            quiz.map((quiz: any, index) => (

                                                <MBox
                                                    className="formFieldWrapper"
                                                    mb={6}
                                                    mt={6}
                                                    key={index}
                                                    id={quiz.id}
                                                >
                                                    <Typography component="div" key={quiz.id}>
                                                        <Typography
                                                            variant="h6"
                                                            key={index}
                                                            className={classes.title}
                                                        >
                                                            {index + 1} - &nbsp; {quiz.title}.
                                                        </Typography>
                                                        <MGrid container spacing={2} className={classes.options} >
                                                            {quiz.university_quiz_detail_all.map(
                                                                (detail:any, index:any) => (
                                                                    <MGrid item md={6} key={index} >
                                                                        {index+1}: &nbsp;
                                                                       <Typography component="span">
                                                                            {detail.title}
                                                                        </Typography> 
                                                                        &nbsp;
                                                                        <input
                                                                            id={detail.university_quiz_headings_id}
                                                                             // name="quiz[`${detail.university_quiz_headings_id}`]"
                                                                            name={detail.university_quiz_headings_id}
                                                                            value={detail.id}
                                                                            type="radio"
                                                                            required
                                                                            className={selectedOption ? classes.disabled :classes.checkbox}
                                                                            onChange={(e)=>getQuizOptions(e,quiz.courses_lecture_id)}
                                                                        />
                                                                    </MGrid>
                                                                )
                                                            )}
                                                        </MGrid>
                                                    </Typography>
                                                </MBox>
                                            ))
                                        ) : (
                                            <MBox mb={1} borderRadius={"4px"}>
                                                <NoData />
                                            </MBox>
                                        )}
                                    </MGrid>
                                </MGrid>
                            </MBox>
                            <MBox display="flex" justifyContent="center">
                                <MButton
                                    color="primary"
                                    loading={false}
                                    variant="contained"
                                    type="submit"
                                    // onClick={(e)=>submitQuiz}
                                >
                                    Submit
                                </MButton>
                            </MBox>
                        </form>
                    </>
                }
            </MBox>

        </div>
    );
}

export default Quiz;
