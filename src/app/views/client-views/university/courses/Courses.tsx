import { useEffect, useState } from "react";
import {
  MBox,
  MTypography,
  MPaper,
  MCircularProgress
} from "src/app/components/mui";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import { RouterBreadcrumbs } from "src/app/mui/breadcrumbs/Breadcrumbs";
import useStyles from "./CoursesStyles";
import axios from "axios";
import { NoData } from "src/app/components";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector} from 'react-redux';
import { showAlert,activeLanguage } from 'src/app/store';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Courses = (props: any) => {
  const [courses, setCourses] = useState<null | any>([]);
  const [loading, setLoading] = useState(false);
    const [currentActiveLanguage, setCurrentActiveLanguage] = useState();
  const baseurl = process.env.REACT_APP_API_END_POINT;
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
    let token = localStorage.getItem('access_token');
    const activeLanguageData = useSelector((store: any) => store?.activeLanguage.translator);
    const languagesData      = useSelector((store: any) => store?.auth?.languages);
    const  en = {
        id: 2,
        heading: 'PeaceCoin Academy',
        subHeading:"Student Curriculum",
        activeLanguageFlag:'en',
        lectureHeading:'Lectures',
        leactureSubHeading:'All Lectures',
        lectureWeidgetCer:'Certificate',
        lectureWeidgetPC:'Passed Courses',
        lectureWeidgetTC:'Total Courses',
        lectureDetail:'Lecture',
        lectureDetailInfo:'If you would like to read the lecture click on the PDF below.',
        lectureDetailHigh:'Lecture HightLisghts',
        lectureDetailAtt:'Attachments',
        lectureDetailAttenetion:'Please do not refresh page.Video will start from beginning',
        quizHeading:'Quiz Question',
        quizpassedbtn:'You have already passed the Quiz',
        quizcoming:' Quiz is Coming Soon'
    }
    const  fr = {
        id: 1,
        heading: 'Académie PeaceCoin',
        subHeading:"Curriculum étudiant",
        activeLanguageFlag:'fr',
        lectureHeading:'Conférences',
        leactureSubHeading:'Toutes les leçons',
        lectureWeidgetCer:'Certificat',
        lectureWeidgetPC:'Cours réussi',
        lectureWeidgetTC:'Cours total',
        lectureDetail:'Conférence',
        lectureDetailInfo:'Si vous souhaitez lire la conférence, cliquez sur le PDF ci-dessous.',
        lectureDetailHigh:'Faits saillants de la conférence',
        lectureDetailAtt:'Pièces jointes',
        lectureDetailAttenetion:'veuillez ne pas rafraîchir la page. La vidéo commencera depuis le début.',
        quizHeading:'Quiz Question',
        quizbtn:'Démarrer le questionnaire',
        quizpassedbtn:'Vous avez déjà réussi le Quiz',
        quizcoming:'Le quiz arrive bientôt'
    }
    const  es = {
        id: 3,
        heading: 'Academia PeaceCoin',
        subHeading:'Plan de estudios del estudiante',
        activeLanguageFlag:'es',
        lectureHeading:'Conferencias',
        leactureSubHeading:'Todas las conferencias',
        lectureWeidgetCer:'Certificado',
        lectureWeidgetPC:'Curso aprobado',
        lectureWeidgetTC:'Curso total',
        lectureDetail:'Conferencia',
        lectureDetailInfo:'Si desea leer la conferencia, haga clic en el PDF a continuación.',
        lectureDetailHigh:'Puntos destacados de la conferencia',
        lectureDetailAtt:'Archivos adjuntos',
        lectureDetailAttenetion:'No actualice la página. El video comenzará desde el principio.',
        quizHeading:'Preguntas de prueba',
        quizbtn:'Iniciar prueba',
        quizpassedbtn:'Ya has pasado el Quiz',
        quizcoming:'Cuestionario próximamente'
    }
    const handleChange = (event) => {
        setCurrentActiveLanguage(event.target.value);
          if(event.target.value == 'fr'){
              dispatch(activeLanguage(fr));
          }else if(event.target.value == 'es'){
              dispatch(activeLanguage(es))
          }else{
              dispatch(activeLanguage(en))
          }

    };
    const courseDetail = (course_id:any,user_course:any) => {
      if(user_course === null){
          dispatch(showAlert({
              message: "Please first pass the previous course.",
              messageType: 'error',
              showAlertMessage: true
          }));
      }else if(user_course.status == 0){
          dispatch(showAlert({
              message: "Please wait for your area coordinate response.",
              messageType: 'error',
              showAlertMessage: true
          }));
      }else{
          history.push("/client/university/courses/courses-details/" + course_id);
      }

  };
  //  **************** for getting university courses  8/23/2021 *********************
    const getCourses = async () =>{
    setLoading(true);
   await axios.post(baseurl + "/university",
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
        if (res.status === 200) {

           setLoading(false);
            setCourses(res.data.course);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => {
        setLoading(false);
      })
  }
    const uniActiveAlert = async () =>{
        setLoading(true);
        let token = localStorage.getItem('access_token');
        await axios.post(baseurl + '/allow_university',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json;charset=UTF-8",
                    Authorization: 'Bearer' + token  //the token is a variable which holds the token
                },

            }
        )
            .then(function (response) {
                setLoading(false);
                if(response.status === 200){
                    getCourses();
                }

            })
            .catch(function (error) {
                setLoading(false);
                console.log(error)
            })
    }
    useEffect(() => {
      uniActiveAlert();

  }, [currentActiveLanguage]);

  return (
    <div>
      <MBox display="flex" className="pageHeader">
          <MBox flexGrow={1}>
              <MTypography
                  className="mainHeading"
                  gutterBottom
                  component="h1"
                  variant="h4"
              >

                  {activeLanguageData?.heading != '' ? activeLanguageData?.heading : en?.heading }
              </MTypography>
              <RouterBreadcrumbs />
          </MBox>
          {
              languagesData.length > 0 &&
              <MBox className="ml-4" >
                  <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={handleChange}
                          label="Language"
                          defaultValue={activeLanguageData.activeLanguageFlag != "" ? activeLanguageData.activeLanguageFlag :'en'}
                      >

                          {
                              languagesData.length  !== 0 &&
                              languagesData.map((item,index)=>{
                                  return <MenuItem value={item.code} >{item.display_name}</MenuItem>
                              })

                          }
                      </Select>
                  </FormControl>
                  <RouterBreadcrumbs />
              </MBox>
          }

      </MBox>

      <MBox className="contentBox" component={MPaper}>
        <MBox className="text-center" component={MPaper}>
          <MTypography
            className={`${classes.mainHeading1} mainHeading `}
            gutterBottom
            component="h1"
            variant="h5"
          >
          <b>  {activeLanguageData?.subHeading != '' ? activeLanguageData?.subHeading : en?.subHeading }</b>
          </MTypography>
        </MBox>

        <Grid container spacing={4}>
          {loading ? <MBox
            display="flex"
            alignItems="center"
            textAlign="center"
            height="auto"
            justifyContent="center"
            className={classes.circular}>
            <MCircularProgress />
          </MBox> : <>
            {courses.length  > 0 && loading == false ? (
              courses.map((courses, index) => (
                <>

                  <Grid item lg={4} md={4} sm={6} xs={12} xl={4} key={courses.id}   onClick={() => courseDetail(courses.id,courses.user_courses)}  >
                    <MBox
                      className={`${classes.statCard}`}
                      mt={3}
                    >
                      <MBox py={2} px={1} className={classes.cardHead}>
                        <CardMedia
                          component="img"
                          alt="Course Image"
                          height="170px"
                          width="50px"
                          className={classes.image}
                          image={courses.image}
                          title="course_image"
                        />
                        <MBox component="div" justifyContent="start">
                          <Button
                            className={classes.btn}
                            fullWidth={true}
                            variant="contained"

                          >
                            <AccountBalanceWalletRoundedIcon
                              fontSize="large"
                              color="primary"
                            />
                            <MTypography
                              gutterBottom
                              component="h1"
                              variant="h5"
                              className={classes.heading}
                            >
                              {courses.title}

                            </MTypography>
                          </Button>
                        </MBox>
                      </MBox>
                    </MBox>
                  </Grid>
                </>
              ))
            ) : (
                <MBox display="flex" justifyContent="center">
                    <MBox mb={1} borderRadius={"4px"}>
                    <NoData />
                    </MBox>
                </MBox>
            )}
          </>
          }
        </Grid>
      </MBox>



    </div>
  );
}
export default Courses;
