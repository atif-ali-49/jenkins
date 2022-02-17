import React from 'react';
import {Link} from 'react-router-dom'
import './ErrorBoundry.scss'
import {BiArrowBack} from 'react-icons/bi'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <div className="text-center section container">
            <div className="row ErrorBoundary d-flex align-items-center">
              <div className="col-lg-5"><img src="/img/client-dashboard/404robot.png"/></div>
              <div className="col-lg-7"><h2 className="my-30" >Something went wrong &amp; its from our end, we will fix it soon! Please click the below button and refresh page again</h2></div>
            </div>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>	  
            <a className="text-dark mt-3" onClick={()=>window.open('/', '_self')} href="javascript:void(0);"><BiArrowBack className="f-24"/> Go To Home</a><br/><br/>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}