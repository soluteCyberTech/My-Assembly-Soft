import React from 'react'
import { Alert } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios';
import Resizer from "react-image-file-resizer";



function Message({variant , children}) {
  return (
    <Alert variant= {variant}>
      {children}
    </Alert>
  )

  
}


export default Message


export const successMessage=(title ,message) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: title ,
    text: message,
    showConfirmButton: false,
    timer: 10000
  });
}

export const ErrorMessage=(title ,message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: title ,
    text: message,
    showConfirmButton: false,
    timer: 1500000
    
  });

}


export const loadingErrorMessage=(err) => {
 
  Swal.fire({
    title: 'Error!',
    text: err,
    icon: 'error'
  });

}





export const  sms_Deposit =(tel ,cname,acno,drcr,amount,desc,dat,bal)=> {
  
  const data = {"sender": "Startccu",
               "message": "Hi "+ cname + " Your A/C N0:XXXX" +acno +" has been "+drcr+" GHS "+amount+"\n"+"Desc:"+desc+" \n"+"Date:"+dat+"\n"+"Bal:GHS "+bal,
               "recipients": [tel]};
   
  const config = {
    method: 'post',
    url: 'https://sms.arkesel.com/api/v2/sms/send',
    headers: {
     'api-key': 'WktJUlNWUGxhVU5oUHBCRU1aa3Q'
    },
    data : data
  };
 
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
 
     }



     
 export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "PNG" ,
       70,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

    



