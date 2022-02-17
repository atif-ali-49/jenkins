import { lazy } from 'react';


// non crypto
const confirmPassword = lazy(()=> import('src/app/views/auth/confirmpassword/ConfirmPassword'));
const emailVerification = lazy(()=> import('src/app/views/auth/emailVerification/EmailVerification'));
const forgetPassword = lazy(()=> import('src/app/views/auth/forgetPassword/ForgetPassword'));
const secretCode = lazy(()=> import("src/app/views/auth/secret-code/SecretCode"));
const login = lazy(()=> import('src/app/views/auth/login/Login'));
const existReferal = lazy(()=> import('src/app/views/auth/referal/ExistReferal'));
const referal = lazy(()=> import('src/app/views/auth/referal/Referal'));
const register = lazy(()=> import('src/app/views/auth/register/Register'));
const blog = lazy(()=> import('src/app/views/blog/Blog'));
const blogDetail = lazy(()=> import('src/app/views/blog/DetailBlog'));
const contact = lazy(()=> import('src/app/views/Contact/Contact'));
const faq = lazy(()=> import('src/app/views/Faqs/Faq'));
const business = lazy(()=> import('src/app/views/business-package/BusinessPackage'));
const privacy = lazy(()=> import('src/app/views/privacyPolicy/PrivacyPolicy'));
const cart  = lazy(()=> import('src/app/views/cart/Cart'));
const thankyou  = lazy(()=> import('src/app/views/cart/ThankYou'));
const orderSummary  = lazy(()=> import('src/app/views/cart/OrderSummary'));
const donation = lazy(()=> import('src/app/views/home/Components/UnitedPeace/DetailDonation'));
const home = lazy(()=> import('src/app/views/home/Home'));
const certification = lazy(()=> import('src/app/views/PeaceCertification/Certification'));
const peaceMovement = lazy(()=> import('src/app/views/PeaceMovement/PeaceMovement'));
const team = lazy(()=> import('src/app/views/Team/Team'));
const linkview = lazy(()=> import('src/app/views/linkView/LinkView'));
const terms = lazy(()=> import('src/app/views/Terms/Terms'));
const ceoMessage = lazy(()=> import("src/app/views/ceo-message/CeoMsg"));
const frontproduct = lazy(()=> import('src/app/views/product/Product'));
const frontapparel = lazy(()=> import('src/app/views/apparel/Apparel'));

// //crypto routes
const cryptoAbout = lazy(()=> import('src/app/views/crypto/about/CryptoAbout'));
const apparel = lazy(()=> import('src/app/views/crypto/apparel/Apparel'));
const index = lazy(()=> import('src/app/views/crypto/index'));
const metaMask = lazy(()=> import('src/app/views/crypto/meta-mask/MetaMask'));
const product = lazy(()=> import('src/app/views/crypto/product/Product'));
const services = lazy(()=> import('src/app/views/crypto/services/Services'));
const cryptoTerms = lazy(()=> import('src/app/views/crypto/term/Terms'));
const privacyCrypto = lazy(()=> import('src/app/views/crypto/term/PrivacyPolicyCrypto'));
const resource = lazy(()=> import("src/app/views/client-views/resources/Resources"));
const cryptoregister = lazy(()=> import("src/app/views/crypto/register/CryptoRegister"));
const cryptologin = lazy(()=> import("src/app/views/crypto/login/CryptoLogin"));
const cryptoforgetpassword = lazy(()=> import("src/app/views/crypto/auth/forgetpassword/CryptoForgetPassword"));
const  cryptosecretCode = lazy(()=> import("src/app/views/crypto/auth/secret-code/SecretCode"));
const cryptoconfirmPassword = lazy(()=> import('src/app/views/crypto/auth/confirmpassword/ConfirmPassword'));
const crypto_cart  = lazy(()=> import('src/app/views/crypto/cart/Cart'));
const crypto_order = lazy(()=> import('src/app/views/crypto/cart/OrderSummary'));
const businesstraining  = lazy(()=> import('src/app/views/business-package/BusinessTrainingCheckout'));
const paymentType = lazy(()=> import('src/app/views/cart/index'));
const expresscard = lazy (()=> import('src/app/views/cart/ExpOrderCard'));
const peacecoinAnniversary = lazy(()=>import('src/app/views/home/Components/Anniversary/Anniversary'));
// misc
const page404 = lazy(() => import('src/app/views/page-404/Page404'));

const PublicRouteImports = {
    confirmPassword,
    emailVerification,
    forgetPassword,
    secretCode,
    login,
    existReferal,
    referal,
    register,
    blog,
    contact,
    faq,
    home,
    certification,
    peaceMovement,
    team,
    terms,
    page404,
    blogDetail, 
    linkview,
    donation,
    privacy,
    cart,
    orderSummary,
    thankyou,
    business,
    businesstraining,
    
    // crypto
    cryptoAbout,
    apparel,
    privacyCrypto,
    index,
    metaMask,
    product,
    services,
    cryptoTerms,
    resource,
    ceoMessage,
    cryptoregister,
    cryptologin,
    cryptoforgetpassword,
    cryptosecretCode,
    cryptoconfirmPassword,
    frontproduct,
    frontapparel,
    crypto_cart,
    crypto_order,
    paymentType,
    expresscard,
    peacecoinAnniversary
};

export default PublicRouteImports;