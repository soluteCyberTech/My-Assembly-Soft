import React, { useState, useEffect } from 'react'
import { TextField, Button, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import logo from '../images/Flexpos.jpg'

function Login() {

    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [companylogo, setcompanylogo] = useState('')
    const [companyname, setcompanyName] = useState('')
    const [company, setcompany] = useState('')
    const [loading ,setloading]=useState(false)

  useEffect(()=>{
      
      axios.get('http://localhost:5000/')
      .then(res=>setcompany(res.data))
       .catch(err=>console.log(err))
  
  },[])
  
  useEffect(()=>{
  
      if(company){
  
        setcompanyName(company[0].name)
        setcompanylogo(company[0].logo)
      }
      
  
  },[company])


   const showError = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(''); 
        }, 3000); 
    };
    

    const loginuser = (e) => {
        e.preventDefault();

        if (!username || !password) {
            showError('Username and password are required.');
            return;
        }

       
    }


    return (

        <div className="container main_pane">
            <div className="row w-100">
                {/* Left Side */}
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center left_side p-4 text-center mt-4">
                    <div className="mb-4 mt-4">
                        <img src={companylogo} alt="Logo" className="img-fluid mb-2 p-3 border rounded shadow-sm" />
                    </div>
                    {<h6 className="com_name mb-3">{companyname}</h6>}
                    <p className="text-muted">Manage Well To Grow</p>
                </div>

                {/* Right Side Login */}
                <div className="col-md-5 login_page p-4 border rounded shadow-sm mb-4">
                    <div className="my_log">
                        <img src={logo} alt="Logo" className="img-fluid mb-2" />
                        
                        <h3>Welcome!</h3>
                    </div>

                    <div className="smal_info">Enter your credentials to access your account</div>

                    <form onSubmit={loginuser}>
                        {/* Username Field */}
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            className="text-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        // required
                        />

                        {/* Password Field */}
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            className="text-field"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={togglePasswordVisibility} sx={{ minWidth: 'auto', padding: 0 }}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                ),
                            }}
                        />

                        {/* Submit Button */}
                        <Button variant="contained" color="primary" fullWidth className="mt-3 login_bu" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <CircularProgress size={24} color="inherit" style={{ marginRight: '8px' }} />
                                    Logging in...
                                </>
                            ) : (
                                'Log In'
                            )}
                        </Button>

                        <div className="text-center mt-3">
                            <a href="#" className="text-success-">Forgot password?</a>
                        </div>

                        <div className="text-center mt-2 own">Powered by Solute Cyber Technology</div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login
