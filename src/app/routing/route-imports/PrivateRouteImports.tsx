import { lazy } from 'react';


// client dashboard site imports
// const ethUsdWidget =  lazy(()=> import("src/app/views/client-views/charts/EthUsdWidget"));

const dashboard = lazy(()=> import('src/app/views/client-views/dashboard/Dashboard'));
const coin = lazy(()=> import('src/app/views/client-views/coins/Coin'));
const profile = lazy(()=> import('src/app/views/client-views/profile/Profile'));
const userProfile = lazy(()=> import('src/app/views/client-views/profile/UserProfile'));
const depositFund =  lazy(()=> import("src/app/views/client-views/e-wallet/deposit-fund/DepositFund"));
const walletSummary =  lazy(()=> import("src/app/views/client-views/e-wallet/e-wallet-summary/WalletSummary"));
const apparels = lazy(()=> import('src/app/views/client-views/apparels/Apparel'));
const newsDetail = lazy(()=> import('src/app/views/client-views/dashboard/news-events/news/NewsDetail'));
const newsEventsListing = lazy(()=> import('src/app/views/client-views/dashboard/news-events/Listing'));
const btcUsd =  lazy(()=> import("src/app/views/client-views/charts/BtcUsd"));
const currentRank =  lazy(()=> import("src/app/views/client-views/charts/CurrentRank"));
const ethUsd =  lazy(()=> import("src/app/views/client-views/charts/EthUsd"));

const transferFund = lazy(()=> import('src/app/views/client-views/e-wallet/transfer-fund/TransferFund'));
const transferCoin = lazy(()=> import('src/app/views/client-views/e-wallet/transfer-coin/TranferCoin'));
const executiveTeam =  lazy(()=> import("src/app/views/client-views/executive-team/ExecutiveTeam"));
// auto pay routs
const autopay =  lazy(()=> import("src/app/views/client-views/autopay/AutoPay"));
const autopaytransactions = lazy(()=>import('src/app/views/client-views/autopay/AutoPayTransaction'))
const updateautopay =  lazy(()=> import('src/app/views/client-views/autopay/UpdateAutoPay'));
const updateautopayDate =  lazy(()=> import('src/app/views/client-views/autopay/UpdateAutoPayDate'));
const updatecardinfo = lazy(()=> import('src/app/views/client-views/autopay/UpdateCardInfo'));
// auto pay routes end
const createTicket = lazy(()=> import('src/app/views/client-views/support/CreateTicket'));
const iboLedger = lazy(()=> import('src/app/views/client-views/Ledger/iboLedger/IboLedger'));
const peaceWallet = lazy(()=> import('src/app/views/client-views/peace-wallet/PeaceWallet'));
const cart = lazy(()=> import('src/app/views/client-views/general/cart/Cart'));
const genealogy = lazy(()=> import('src/app/views/client-views/genealogy/Genealogy'));
const referGenelogy = lazy(()=> import('src/app/views/client-views/genealogy/referred-members-list/ReferredMembersList'));
const allUsersList = lazy(()=> import('src/app/views/client-views/genealogy/all-users-list/AllUsersList'));
const referredMembersList = lazy(()=> import('src/app/views/client-views/genealogy/referred-members-list/ReferredMembersList'));
const packageLedger = lazy(()=> import('src/app/views/client-views/Ledger/packageLedger/PackageLedger'));
const registerLedger = lazy(()=> import('src/app/views/client-views/Ledger/registerLedger/RegisterLedger'));
const peaceMakers = lazy(()=> import('src/app/views/client-views/peaceMakers/PeaceMakers'));
const productPkg = lazy(()=> import('src/app/views/client-views/products/product-pkg/ProductPkg'));
const orderSummary = lazy(()=> import('src/app/views/client-views/general/order-summary/OrderSummary'));
const productTransaction = lazy(()=> import('src/app/views/client-views/products/product-transaction/ProductTransaction'));
const ApparelTransaction = lazy(()=> import('src/app/views/client-views/apparels/apparel-transaction/ApparelTransaction'));
const ticketListingNew = lazy(()=> import('src/app/views/client-views/support/TicketListing'));
const liveChat = lazy(()=> import('src/app/views/client-views/support/chat/LiveChat'));
const thankyousecure = lazy(()=> import('src/app/views/client-views/general/thankyou/Thankyou'));
const s1package=lazy(()=> import('src/app/views/client-views/promotion-package/s1-package/S1Package'));
const summitTransaction=lazy(()=> import('src/app/views/client-views/promotion-package/s1-packageTransaction/SummitTransaction'));
const PromotionCheckout=lazy(()=> import('src/app/views/client-views/promotion-package/promotion-checkout/PromotionCheckout'));
const resource =  lazy(()=> import("src/app/views/client-views/resources/Resources"));
const ticketListing = lazy(()=> import('src/app/views/client-views/support/TicketListing'));
const fundTransfer = lazy(()=> import('src/app/views/client-views/e-wallet/fund-transfer/FundTransfer'));
const notifications = lazy(()=> import('src/app/views/client-views/notifications/Notifications'));
const announcements = lazy(()=> import('src/app/views/client-views/announcements/Announcements'));
const profileSuccess =  lazy(()=> import("src/app/views/client-views/top-profile/ProfileSuccess"));
const upGradeIbo =  lazy(()=> import("src/app/views/client-views/IBO/UpGradeIbo"));
const geoChart =  lazy(()=> import("src/app/views/client-views/charts/SvgChart"));
const apparelDetail =  lazy(()=> import("src/app/views/client-views/apparels/ApparelDetail"));
const smartPay = lazy(()=> import('src/app/views/client-views/smart-pay/SmartPay'));
const checkout = lazy(()=> import('src/app/views/client-views/general/checkout/Checkout'));
const paymentType = lazy(()=>import('src/app/views/client-views/general/checkout/index'))
const universityNotifications = lazy(()=> import('src/app/views/client-views/university-notification/UniversityNotifications'));
const courses = lazy(()=> import('src/app/views/client-views/university/courses/Courses'));
const coursesDetails = lazy(()=> import('src/app/views/client-views/university/courses/CourseDetails'));
const coursesList = lazy(()=> import('src/app/views/client-views/university/courses/CoursesList'));
const quizCourse = lazy(()=> import('src/app/views/client-views/university/courses/QuizCourse'));
const peacecoinAreaCordinate = lazy(()=> import('src/app/views/client-views/university/courses/PeacecoinAreaCordinate'));
const showusercourse = lazy(()=> import('src/app/views/client-views/university/courses/ShowUserCourse'));
const showallLecture = lazy(()=> import('src/app/views/client-views/university/courses/ShowAllLecture'));
const quizPdf = lazy(()=> import('src/app/views/client-views/university/courses/QuizComponent'));
const certificate = lazy(()=> import('src/app/views/client-views/university/courses/Certificate'));
const coinTransfer = lazy(()=> import('src/app/views/client-views/university/modal/CoinTransfer'));
const WithdarawalModal = lazy(()=> import('src/app/views/client-views/e-wallet/fund-transfer/WithdrawalModal'));
const userGuide = lazy(()=> import('src/app/views/client-views/genealogy/tree/UserGuide'));
// for expres card

const PrivateRouteImports = {
    dashboard,
    coin,
    profile,
    userProfile,
    depositFund,
    walletSummary,
    apparels,
    newsDetail,
    newsEventsListing,
    btcUsd,
    currentRank,
    ethUsd,
    transferFund,
    transferCoin,
    executiveTeam,
    createTicket,
    iboLedger,
    peaceWallet,
    cart,
    genealogy,
    referGenelogy,
    allUsersList,
    referredMembersList,
    packageLedger,
    registerLedger,
    peaceMakers,
    productPkg,
    orderSummary,
    productTransaction,
    ticketListingNew,
    liveChat,
    resource,
    ticketListing,
    fundTransfer,
    notifications,
    announcements,
    profileSuccess,
    upGradeIbo,
    geoChart,
    apparelDetail,
    smartPay,
    checkout,
    universityNotifications,
    courses,
    coursesDetails,
    coursesList,
    quizCourse,
    peacecoinAreaCordinate,
    showusercourse,
    showallLecture,
    ApparelTransaction,
    autopay,
    autopaytransactions,
    updateautopay,
    updateautopayDate,
    updatecardinfo,
    quizPdf,
    s1package,
    PromotionCheckout,
    summitTransaction,
    thankyousecure,
    certificate,
    coinTransfer,
    paymentType,
    userGuide,
    WithdarawalModal


};

export default PrivateRouteImports;