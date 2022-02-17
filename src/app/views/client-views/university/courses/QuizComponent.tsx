import React,{useState,useEffect} from 'react';
import useStyles from "./QuizComponentStyle";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { Document, Page } from 'react-pdf';
import Button from "@material-ui/core/Button";
import { NoData } from "src/app/components";
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
import { useDispatch,useSelector} from 'react-redux';

function QuizComponent(props:any) {
    const classes = useStyles();
    let id = props.match.params.id;
    let uid = props.match.params.uid;
    let title = props.match.params.title;
    const history = useHistory();
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const [coursesList, setCoursesList] = useState<null | any>({});
    const [courses, setCourses] = useState<null | any>({});
    const [loading, setLoading] = useState(false);
    const activeLanguageData = useSelector((store: any) => store?.activeLanguage.translator);


    const getCourseList = async  () =>{
        let token = localStorage.getItem('access_token');
             setLoading(true)
           await axios.post(baseurl + "/university_courses_videos/" + id + "/" + uid,

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
                setCoursesList(response.data.video);
                setCourses(response.data);
                setLoading(false)
                // console.log(response.data.video)
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                setLoading(false);
            });
    }
    useEffect(() => {
        getCourseList();
    }, []);

    return (
      <div>


          {
              loading ? <MBox
                      display="flex"
                      alignItems="center"
                      textAlign="center"
                      height="auto"
                      justifyContent="center">
                      <MCircularProgress />
                  </MBox> :

              <div>

                      <Button
                          className={classes.btn}
                          fullWidth={false}
                          variant="contained"

                          onClick={()=>{ history.push('/client/university/courses/courses-details/' + id + "/" + uid) }}> Go Back
                      </Button>

                  {
                      ( courses.video && coursesList.pdf_file) ?
                      <div className={classes.pdf}  id='pdf'>

                          {

                              title == 1 ?
                                  <iframe
                                      src={coursesList.pdf_file + "#toolbar=0"}
                                      // type="application/pdf"
                                      className={classes.iFrame}
                                      onContextMenu={(e) => e.preventDefault()}
                                  />




                                  :
                                  <iframe
                                      src={coursesList.high_light_file + "#toolbar=0"}
                                      className={classes.iFrame}
                                      onContextMenu={(e) => e.preventDefault()}
                                  />

                          }

                      </div>:
                          <MBox mb={1} borderRadius={"4px"}>
                              <NoData />
                          </MBox>
                  }
              </div>
          }

      </div>

    );
}

export default QuizComponent;