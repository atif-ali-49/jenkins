import axios from 'axios';
class common{
    private readonly baseurl: any;
    public status: boolean;

    updateStatus =  ()=> {
        return this.status = true;
    }

    constructor(){
        this.baseurl = process.env.REACT_APP_API_END_POINT;
        this.status = false;
    }

    // function for update auto pay pkg
     updateAutoPayPkg = () =>{

         this.updateStatus();
         alert(this.status)
     }
//     for cancel auto pay pkg
     cancelAutoPayPurchasedPkg = (user_id)=>{

        axios.post(this.baseurl+'/cancel_autopay', {
            user_id:user_id
        })
            .then((response) => {
                if(response.status === 200){
                    this.updateStatus();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }



}

export  default new common();