import React, { useState, useEffect } from "react";
import {
  MBox,
  MTypography,
  MPaper,
  MCard,
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

function ShowUserCourse(props: any) {
  const history = useHistory();
  const baseurl = process.env.REACT_APP_API_END_POINT;
  const [userData, setUserData] = useState<null | any>({});
  const [usercourse, setUserCourse] = useState<null | any>({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    let id = props.match.params.id;
    let uid = props.match.params.uid;
    // Make a request for a course with a given ID
    axios.get(baseurl + "/show_user_course/" + id + "/" + uid)
      .then(function (response) {
        // handle success

        setUserData(response.data);
        setUserCourse(response.data.lectures);
        // console.log(response.data.lectures,"show user course");
        // console.log(response.data,"show all course");
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      })
      .then(function () {
        setLoading(false);
      });
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
          Courses Details
        </MTypography>
        <RouterBreadcrumbs />
      </MBox>
      <MBox className="contentBox" component={MPaper}>
        <MGrid container spacing={4}>
          <MGrid item xs={12} sm={12} md={6}>
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex justify-content-between ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton aria-label="settings">
                    <MTypography component="h6" variant="h5">
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
          <MGrid item xs={12} sm={12} md={6}>
            <MBox>
              <Card className={classes.commonDashboardHead} variant="outlined">
                <MBox
                  className={`d-flex justify-content-between ${classes.dflex}`}
                  p={2}
                >
                  <MIconButton aria-label="settings">
                    <MTypography component="h6" variant="h5">
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
                      Total Course :{userData.total_courses ?? "0"}
                    </MTypography>
                  </MBox>
                </MBox>
              </Card>
            </MBox>
          </MGrid>
        </MGrid>

        <MGrid container spacing={4} justify="center">
          <MGrid item xs={12} sm={12} md={12}>
            <MCard variant="outlined">
              <MCardHeader title="Courses Details" />
              <MCardContent>
                <MTableContainer component={"div"}>
                  <MTable aria-label="customized table">
                    <MTableHead>
                      <TableRow>
                        <StyledTableCell align="center">#</StyledTableCell>
                        <StyledTableCell align="center">User</StyledTableCell>
                        <StyledTableCell align="center">Lecture Title</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
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
                          {usercourse.length > 0 ? (
                            usercourse.map((usercourse, index) => (
                              <MTableRow>
                                <MTableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                >
                                  {index + 1}
                                </MTableCell>
                                <MTableCell
                                  component="th"
                                  scope="row"
                                  align="center"
                                >

                                  <MTypography
                                      gutterBottom
                                      component="h4"
                                      variant="h6"
                                  >
                                    {userData.user}
                                  </MTypography>
                                </MTableCell>
                                <MTableCell align="center">
                                  <MTypography
                                    gutterBottom
                                    component="h4"
                                    variant="h6"
                                  >
                                    {usercourse.title}
                                  </MTypography>
                                </MTableCell>
                                <MTableCell align="center">
                                  <MTypography
                                    gutterBottom
                                    component="h4"
                                    variant="h6"
                                    className={classes.head}
                                  >
                                    {usercourse.pass_quiz ? (
                                      <MButton
                                        size="large"
                                        varient="contained"
                                        className={classes.btnGreen}
                                      // onClick={() => showInfo()}
                                      >
                                        Passed
                                      </MButton>
                                    ) : (
                                      <MButton
                                        size="large"

                                        varient="contained"
                                        className={classes.btnBlock}
                                      // onClick={() => showInfo()}
                                      >
                                        Pending
                                      </MButton>
                                    )
                                    }
                                  </MTypography>
                                </MTableCell>
                              </MTableRow>
                            ))
                          ) : (
                            <MBox mb={1} borderRadius={"4px"}>
                              <NoData />
                            </MBox>
                          )}
                        </>
                      }
                    </MTableBody>
                  </MTable>
                </MTableContainer>
              </MCardContent>
            </MCard>
          </MGrid>
        </MGrid>
      </MBox>
    </div>
  );
}

export default ShowUserCourse;
