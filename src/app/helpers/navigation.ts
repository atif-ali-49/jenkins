import { useHistory } from "react-router-dom";

export const nvigationHelpers = {
    
    GoBack: function(){
        const history = useHistory();
        history.goBack();
    },
    
    GoForward: function(){
        const history = useHistory();
        history.goForward();
    },
    
    GoToPage: function(path:string){
        const history = useHistory();
        history.push(path);
    },
    
};

