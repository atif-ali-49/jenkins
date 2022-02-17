import React, {useState,useEffect} from 'react'
import { MBox, MTypography, MPaper,MPagination } from 'src/app/components/mui';
import { RouterBreadcrumbs } from 'src/app/mui/breadcrumbs/Breadcrumbs';
import useStyles from './CoinStyles'
import axios from 'axios';
import CoinList from './CoinList'


function Coin(props:any) {
    const classes = useStyles();
    const[coins, setCoins]=useState([]);
    const[loading, setLoading] = useState(false);
    const[recordsPerPage, setRecordsPerPage] = useState(30);
    const[currentPage, setCurrentPage] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    let coinId = props.match.params.id
    let title = props.match.params.title
    const baseurl = process.env.REACT_APP_API_END_POINT;
    const getCoins = async  () => {
        setLoading(true);
        await axios.get(baseurl+`/user_coin/${coinId}/${recordsPerPage}`)
        .then(function (response) {
            setLoading(false)
            if(response.status === 200){
                setCoins(response.data.coins);
                setTotalPages(response.data['meta']['last_page']);
            }
        })
        .catch(function (err) {
            setLoading(false)
            console.log(err);
        })
    }
    useEffect(() => {
        getCoins();
    },[coinId, currentPage]);
    return (
        <div>
            <MBox className="pageHeader">
				<MTypography className="mainHeading textCapitalize" gutterBottom component="h1" variant="h4">{title.replace('-', ' ')}</MTypography>
				<RouterBreadcrumbs />
            </MBox>
            <MBox className="contentBox" component={MPaper}>
            <CoinList data={coins} loading={loading} />
            {totalPages > 1 &&  
                <MBox mt={3} display="flex" justifyContent="flex-end">
                    <MPagination count={totalPages} page={currentPage} color="primary" setCurrentPage={setCurrentPage} />
                </MBox>
            }
            </MBox>
         </div>
    )
}

export default Coin
