import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Messages extends React.Component{
notify = () => toast("Wow so easy !");
render(){
// const alert2 = useAlert();

if(this.props.result != undefined ) {
toast.success(this.props.result, {
position: toast.POSITION.TOP_RIGHT
});
}

if(this.props.result == undefined && this.props.status!= undefined) {
var error = this.props.status + "white-space: pre-line;" + this.props.message;
var mss = this.props.message;
var pos = mss.indexOf(":");
if(pos > 0)
mss = mss.substring(0, pos);
toast.error(<div>{this.props.status}<br /> {mss} </div>, { position: toast.POSITION.UPPER_RIGHT });
}

return(

<div>
<ToastContainer />
</div>

);

}

};

export default Messages;