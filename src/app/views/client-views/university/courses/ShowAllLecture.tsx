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
  MCircularProgress
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

function ShowAllLecture(props: any) {
  const [leture, setLecture] = useState<null | any>([]);
  const [course, setCourse] = useState<null | any>({});
  const [loading, setLoading] = useState(false);

  const baseurl = process.env.REACT_APP_API_END_POINT;
  const classes = useStyles();
   const getCourseStatus = () =>{
     let id = props.match.params.id;
     axios.get(baseurl + "/show_all_lectures/" + id)
         .then(function (response) {
           // handle success
           setLecture(response.data.lectures);
           setCourse(response.data);
           console.log(response.data.lectures,'sdfddfsd dfdsfdsf');
           setLoading(false);
         })
         .catch(function (error) {
           console.log(error);
           setLoading(false);
         });
   }
  useEffect(() => {
    setLoading(true);
    getCourseStatus();
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
          PeaceCoin University
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
                      VAC
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
                      Total Course :{course.total_courses ?? "0"}
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
              <MCardHeader title=" Lectures Details" />
              <MCardContent>
                <MTableContainer component={"div"}>
                  <MTable aria-label="customized table">
                    <MTableHead>
                      <TableRow>
                        <StyledTableCell align="center">#</StyledTableCell>
                        <StyledTableCell align="left">
                          Lecture Title
                        </StyledTableCell>
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
                      </MBox> : <>
                        {leture.length > 0 ?
                          (leture.map((leture, index) => (
                            <MTableRow key={index}>
                              <MTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {index + 1}
                              </MTableCell>

                              <MTableCell align="left">
                                <MTypography
                                  gutterBottom
                                  component="h4"
                                  variant="h6"
                                >
                                  {leture.title}
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

export default ShowAllLecture;
