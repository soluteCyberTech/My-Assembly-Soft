import React, { useEffect, useState } from 'react'

import AssemblySetup from './AssemblySetup';
import Login from './Login';
import SetupSteps from './SetupSteps';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';


function SystemStart() {
const [activation ,setactivation]=useState(true)
const [getActivationData , setgetActivationData]=useState()
const [loading, setLoading] = useState(true);

useEffect(()=>{
    
    axios.get('http://localhost:5000/').then(res=>{
        setgetActivationData(res.data)
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
    })

},[])

useEffect(()=>{

    if(getActivationData){

        setactivation(getActivationData[0].state)
    }
    
    

},[getActivationData])

if (loading) {
  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      gap: 2
    }}>
      <CircularProgress />
      <Typography variant="body1">
        Checking system status...
      </Typography>
    </Box>
  );
}

  return (

    <div className=''>
  

    {activation ? 

            <>

           
            <div className=''>
             
             <Login/>
             </div>

            
            </>
            
            : 

            // <AssemblySetup/>
            <SetupSteps/>
        }
   
  
    

   
   
</div>
  )
}

export default SystemStart