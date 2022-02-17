import CloseIcon from '@material-ui/icons/Close';
import { SnackbarProvider } from 'notistack';
import { createRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { showAlert } from "src/app/store";
import './App.scss';
import { ComingSoonModal, ErrorBoundary, GlobalAlert } from './components';
import { MIconButton } from './components/mui';
import ClientLayout from './views/layouts/client';
import PublicLayout from './views/layouts/public';


function App(props:any) {
	const isLoggedIn = useSelector((store: any) => store.auth.isLoggedIn);
	const [isClientSite, setIsClientSite] = useState(false);
	const notistackRef = createRef<any>();
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(()=>{
		let pathname = location.pathname.split('/');
        if( (pathname[1] !== 'client') ){
			setIsClientSite(false);
		}else{
			setIsClientSite(true);
		}
	},[location.pathname]);

	useEffect(()=>{
		const showOnlineAlert = () => {
			dispatch(showAlert({
				message: "Connected! .You're back",
				messageType: 'success',
				showAlertMessage: true
			}));
		}
		window.addEventListener('online', function(e) { showOnlineAlert()})
		return function cleanupListener() {
			window.removeEventListener('online', showOnlineAlert)
		}
	},[]);

	useEffect(()=>{
		const showOfflineAlert = () => {
			dispatch(showAlert({
				message: "You're offline. Check your internet connection.",
				messageType: 'error',
				showAlertMessage: true
			}));
		}
		window.addEventListener('offline', function(e) { showOfflineAlert()})		
		return function cleanupListener() {
			window.removeEventListener('offline', showOfflineAlert)
		}
	},[]);

	const onClickDismiss = (key)=> {
		notistackRef.current.closeSnackbar(key);
	}

  return (
	<SnackbarProvider 
	maxSnack={6}
	ref={notistackRef}
	anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
	preventDuplicate action={(key) => (
        <MIconButton size="small" aria-label="close" color="inherit" onClick={ ()=>onClickDismiss(key)}>
              <CloseIcon fontSize="small" />
		</MIconButton>
    )}>
  	 <ToastProvider>
		<div className="app">
			{/* <ApolloProvider client={client}> */}
				<ErrorBoundary {...props}>
					<GlobalAlert />
					<ComingSoonModal />
					
						{ (isLoggedIn && isClientSite ) ?
							<ClientLayout />
						:
							<PublicLayout />
						}
				</ErrorBoundary>
			{/* </ApolloProvider> */}
		</div>
	 </ToastProvider>
	 </SnackbarProvider>
  );
}

export default App;

