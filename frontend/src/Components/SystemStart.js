import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AssemblySetup from './AssemblySetup';
import Login from './Login';
import axios from 'axios';


function SystemStart() {
const [activation ,setactivation]=useState(true)
const [getActivationData , setgetActivationData]=useState()

useEffect(()=>{
    
    axios.get('http://localhost:5000/').then(res=>setgetActivationData(res.data)) .catch(err=>console.log(err))

},[])

useEffect(()=>{

    if(getActivationData){

        setactivation(getActivationData[0].state)
    }
    
    

},[getActivationData])
  return (

    <div className=''>
  

    {activation ? 

            <>

           
            <div className=''>
             
             <Login/>
             </div>

            
            </>
            
            : 

            <AssemblySetup/>
        }
   
  
    

   
   
</div>
  )
}

export default SystemStart