import React from 'react'
import {useEffect} from 'react'

const Translate=()=> {
	
 const googleTranslateElementInit = () => {
   new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT }, 'google_translate_element')
  }
  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.append(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [])
	return (
		<div>		
      <div id="google_translate_element"></div>
		</div>
	)
}

export default Translate
