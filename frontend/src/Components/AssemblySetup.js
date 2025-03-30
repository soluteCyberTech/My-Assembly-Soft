import React, { useState ,useEffect } from 'react';
import { 
  Button, 
  Container, 
  Card, 
  CardContent,
  FormControl,
  InputLabel ,
  MenuItem ,
  Select,
  TextField,
  Typography
  
} from '@mui/material';
import ImageUploading from "react-images-uploading";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { ErrorMessage ,successMessage ,loadingErrorMessage ,loadingMessage ,resizeFile } from './Message';
import axios from 'axios';
import Swal from 'sweetalert2';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

function AssemblySetup() {

    
    const [getActivationData , setgetActivationData]=useState('')

    const navigate=useNavigate()

    useEffect(()=>{
        
        axios.get('http://localhost:5000/')
        .then(res=>
            
           {
            setgetActivationData(res.data)
           }

        
        )
        .catch(err=>{

            loadingErrorMessage(err)
        })
    
    },[])

    const [ActivationCode ,setActivationCode]=useState()
    const [ActivationId ,setActivationId]=useState()

    useEffect(()=>{
    
        if(getActivationData){
    
            setActivationCode(getActivationData[0].activation_code)
            setActivationId(getActivationData[0].trans_code)
        }
        
    
    },[getActivationData])


    const [images, setImages] = React.useState([]); 
    const maxNumber = 69;
    const [companylogo ,setcompanylogo]=useState('')

    const piconChange = async (imageList, addUpdateIndex) => {
        // data for submit
  
        setImages(imageList);
    
        if(imageList.length < 1){
   
          //setImage(bankInfo.image)
          setcompanylogo('')
    
        } else {

        const image = await resizeFile(imageList[0].file);        
            
          setcompanylogo(image)
         
    
        }
       
      };

    const [showPasswordHead, setshowPasswordHead] = useState(false);
    const togglePasswordVisibility = () => {
        setshowPasswordHead(!showPasswordHead);
    };


    const [showPasswordHeadRety, setshowPasswordHeadRety] = useState(false);
    const togglePasswordVisibilitypasret = () => {
        setshowPasswordHeadRety(!showPasswordHeadRety);
    };

    const [showPasswordAdmin, setshowPasswordAdmin] = useState(false);
    const togglePasswordVisibilityAdm = () => {
        setshowPasswordAdmin(!showPasswordAdmin);
    };


    const [showPasswordrtAdm, setshowPasswordrtAdm] = useState(false);
    const togglePasswordVisibilityadm = () => {
        setshowPasswordrtAdm(!showPasswordrtAdm);
    };


    const [assname ,setassname]=useState('')
    const [assnameError ,setassnameError]=useState(false)

    const [mmda , setmmda]=useState('')
    const [mmdaError , setmmdaError]=useState(false)

    const [regions ,setregions]=useState('')
    const [regionsError ,setregionsError]=useState(false)

    const [location ,setlocation]=useState('')
    const [locationError ,setlocationError]=useState(false)

    const [digitaladd ,setdigitaladd]=useState('')
    const [digitaladdError ,setdigitaladdError]=useState(false)
    

    const [email ,setemail]=useState('')
    const [emailError ,setemailError]=useState(false)

    const [Phone ,setPhone]=useState('')
    const [PhoneError ,setPhoneError]=useState(false)

    const [acckey ,setacckey]=useState()
    const [acckeyError ,setacckeyError]=useState(false)

    //Error Validation
    const AssemblyNameError=()=>{
        if(!assname || assname.length < 4 ){
            setassnameError(true)
            return
        }

        setassnameError(false)
    }

    const mmdaErrorhandel =()=>{
        if(!mmda){
            setmmdaError(true)
            return
        }
        setmmdaError(false)
    }

    const regionsErrorhandel=()=>{
        if(!regions){
        setregionsError(true)
        return
        }
        setregionsError(false)
    }


    const locationErrorhandel=()=>{
        if(!location){
            setlocationError(true)
            return
            }
            setlocationError(false)
    }
    

   const digitaladdErrorhandel=()=>{

    if(!digitaladd){
        setdigitaladdError(true)
        return
    }
        setdigitaladdError(false)
   } 


   const emailErrorhandel=()=>{
    if(!email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$')){
        setemailError(true)
        return
    }

      setemailError(false)
   }

   const PhoneErrorhandel=()=>{
    if(!(Phone.match('^[0-9]{10}$'))){
        setPhoneError(true)
        return
    }

    setPhoneError(false)
   
   }

   const acckeyErrorhandel=()=>{

    if(!acckey || ActivationCode != acckey){
        setacckeyError(true)
        return
    }

    setacckeyError(false)
   
   }


   const [Headname , setHeadname]=useState('')
   const [HeadnameError , setHeadnameError]=useState(false)

   const [HeadstaffId , setHeadstaffId]=useState('')
   const [HeadstaffIdError , setHeadstaffIdError]=useState(false)

   const [HeadGender , setHeadGender]=useState('')
   const [HeadGenderError , setHeadGenderError]=useState(false)

   const [Headphno , setHeadphno]=useState('')
   const [HeadphnoError , setHeadphnoError]=useState(false)

   const [HeadEmaill , setHeadEmaill]=useState('')
   const [HeadEmaillError , setHeadEmaillError]=useState(false)

   const [HeadUsername , setHeadUsername]=useState('')
   const [HeadUsernameError , setHeadUsernameError]=useState(false)

   const [HeadPassword , setHeadPassword]=useState('')
   const [HeadPasswordError , setHeadPasswordError]=useState(false)


   const [HeadReTyPassword , setHeadReTyPassword]=useState('')
   const [HeadReTyPasswordError , setHeadReTyPasswordError]=useState(false)


   const HeadnameErrorhandel=()=>{
    if(!Headname){
        setHeadnameError(true)
        return
    }

    setHeadnameError(false)
   
   }


   
   const HeadstaffIdErrorhandel=()=>{
    if(!HeadstaffId){
        setHeadstaffIdError(true)
        return
    }

    setHeadstaffIdError(false)
   
   }

    
   const HeadGenderErrorhandel=()=>{
    if(!HeadGender){
        setHeadGenderError(true)
        return
    }

    setHeadGenderError(false)
   
   }



   const HeadphnoErrorHandel=()=>{
    if(!(Headphno.match('^[0-9]{10}$'))){
        setHeadphnoError(true)
        return
    }

    setHeadphnoError(false)

   }


   const HeadEmaillErrorhandel=()=>{
    if(!HeadEmaill.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$')){
        setHeadEmaillError(true)
        return
    }

      setHeadEmaillError(false)
   }


   const HeadUsernameErrorhandel=()=>{
    if(!HeadUsername){
        setHeadUsernameError(true)
        return
    }

    setHeadUsernameError(false)
   
   }


   const HeadPasswordErrorhandel=()=>{
    if(!HeadPassword){
        setHeadPasswordError(true)
        return
    }

    setHeadPasswordError(false)
   
   }


   const HeadReTyPasswordErrorhandel=()=>{
    if(!HeadReTyPassword || HeadReTyPassword != HeadPassword){
        setHeadReTyPasswordError(true)
        return
    }

    setHeadReTyPasswordError(false)
   
   }

   const [syname , setsyname]=useState('')
   const [synameError , setsynameError]=useState(false)

   const [systaffId , setsystaffId]=useState('')
   const [systaffIdError , setsystaffIdError]=useState(false)

   const [syGender , setsyGender]=useState('')
   const [syGenderError , setsyGenderError]=useState(false)

   const [syphno , setsyphno]=useState('')
   const [syphnoError , setsyphnoError]=useState(false)

   const [syEmaill , setsyEmaill]=useState('')
   const [syEmaillError , setsyEmaillError]=useState(false)

   const [syUsername , setsyUsername]=useState('')
   const [syUsernameError , setsyUsernameError]=useState(false)

   const [sypassword , setsypassword]=useState('')
   const [syPasswordError , setsyPasswordError]=useState(false)


   const [syReTyPassword , setsyReTyPassword]=useState('')
   const [syReTyPasswordError , setsyReTyPasswordError]=useState(false)




   const synameErrorhandel=()=>{
    if(!syname){
        setsynameError(true)
        return
    }

    setsynameError(false)
   
   }


   
   const systaffIdErrorhandel=()=>{
    if(!systaffId){
        setsystaffIdError(true)
        return
    }

    setsystaffIdError(false)
   
   }

    
   const syGenderErrorhanle=()=>{
    if(!syGender){
        setsyGenderError(true)
        return
    }

    setsyGenderError(false)
   
   }



   const syphnoErrorhandel=()=>{
    if(!(syphno.match('^[0-9]{10}$'))){
        setsyphnoError(true)
        return
    }

    setsyphnoError(false)

   }


   const syEmaillErrorhandel=()=>{
    if(!syEmaill.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$')){
        setsyEmaillError(true)
        return
    }

      setsyEmaillError(false)
   }


   const syUsernameErrorhandel=()=>{
    if(!syUsername){
        setsyUsernameError(true)
        return
    }

    setsyUsernameError(false)
   
   }


   const syPasswordErrorhandel=()=>{
    if(!sypassword){
        setsyPasswordError(true)
        return
    }

    setsyPasswordError(false)
   
   }


   const syReTyPasswordErrorhandel=()=>{
    if(!syReTyPassword || syReTyPassword != sypassword){
        setsyReTyPasswordError(true)
        return
    }

    setsyReTyPasswordError(false)
   
   }

   const [userinfomation ,setuserinfomation]=useState([])


   const saveactivation= async()=>{
    
    try {
        
   
        
   
    if(assnameError || mmdaError || regionsError || locationError || digitaladdError || emailError || PhoneError || acckeyError
         || assname=='' || mmda=='' || regions=='' || location=='' || digitaladd=='' || email=='' || Phone=='' || acckey==''
        
         || HeadnameError || HeadstaffIdError || HeadGenderError || HeadphnoError|| HeadEmaillError || HeadUsernameError || HeadPasswordError || HeadReTyPasswordError
         || Headname=='' || HeadstaffId=='' || HeadGender=='' || Headphno=='' || HeadEmaill=='' || HeadUsername=='' || HeadPassword=='' || HeadReTyPassword==''
       
       
         || synameError || systaffIdError || syGenderError || syphnoError|| syEmaillError || syUsernameError || syPasswordError || syReTyPasswordError
         || syname=='' || systaffId=='' || syGender=='' || syphno=='' || syEmaill=='' || syUsername=='' || sypassword=='' || syReTyPassword==''
        ){
         
        ErrorMessage('Error' ,'Please All Error Must be Resolved Before You Can Proceed')
        AssemblyNameError()
        mmdaErrorhandel()
        regionsErrorhandel()
        locationErrorhandel()
        digitaladdErrorhandel()
        emailErrorhandel()
        PhoneErrorhandel()
        acckeyErrorhandel()

        HeadnameErrorhandel()
        HeadstaffIdErrorhandel()
        HeadGenderErrorhandel()
        HeadphnoErrorHandel()
        HeadEmaillErrorhandel()
        HeadUsernameErrorhandel()
        HeadPasswordErrorhandel()
        HeadReTyPasswordErrorhandel()

        synameErrorhandel()
        systaffIdErrorhandel()
        syGenderErrorhanle()
        syphnoErrorhandel()
        syEmaillErrorhandel()
        syUsernameErrorhandel()
        syPasswordErrorhandel()
        syReTyPasswordErrorhandel()

    }else {
        
        if(ActivationCode != acckey){

            ErrorMessage('error' , 'Please Enter The Correct Activation Code')

            acckeyErrorhandel()

         }else {

            
            const result = await Swal.fire({
                title: 'Save Data?',
                text: 'Activate Assembly Account ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes Activate'
              });

             
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Saving Data',
                  html: 'processing please wait......',
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  }
                });
 
                userinfomation.push({
                    name:Headname,
                    StaffId:HeadstaffId ,
                    gender:HeadGender ,
                    Phone:Headphno ,
                    email:HeadEmaill ,
                    username:HeadUsername ,
                    Password:HeadPassword ,
                    department: 'Head Of Assembly',
                    role:'Head Of Assembly'
                })


                userinfomation.push({
                    name:syname,
                    StaffId:systaffId ,
                    gender:syGender ,
                    Phone:syphno ,
                    email:syEmaill ,
                    username:syUsername ,
                    Password:sypassword ,
                    department: 'System Administrator',
                    role:'System Administrator'
                })

                const state=1
            
                axios.post('http://localhost:5000/createstaff',{data:userinfomation ,assname , mmda , regions ,location, digitaladd ,email ,Phone ,companylogo, state ,ActivationId})
                .then(res=>
               
                    {
                        successMessage('Success' ,'Data successfully Save ')
                        window.location.reload();
                      
                }


                )
                .catch(err=>{

                    loadingErrorMessage(err)
                })

            }

        }


    
    }
} catch (error) {
       console.log(error) 
}

    

   }
   

  return (
    <Container maxWidth="xl">
    <Card elevation={3} sx={{ mt: 3, mb: 3 }}>
      <CardContent>
        
      
       
        <Stack sx={{ width: '100%' }} spacing={2} >
        <Alert severity="success">
            <Typography variant="h6" >Assembly Setup Information</Typography></Alert>
        </Stack>

        <div className='row mt-4'>

        
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2'>
                <div className='card'>
                    <div className='card-header'>Assembly Setup</div>
                    <div className='card-body'>
                       
                    
                        <TextField
                        required
                        fullWidth
                        size="small"
                        label="Assembly Name"
                        error={assnameError}
                         value={assname}
                         onChange={(e) => setassname(e.target.value)}
                        className='mb-4'
                        onBlur={AssemblyNameError}
                        />

                     <FormControl fullWidth size="small" className='mb-4'>
                      <InputLabel required>Select MMDA</InputLabel>
                      <Select
                        value={mmda}
                        onChange={(e) => setmmda(e.target.value)}
                        label="MMDA*"
                        required
                        error={mmdaError}
                        onBlur={mmdaErrorhandel}
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="District">District</MenuItem>
                        <MenuItem value="Municipal">Municipal</MenuItem>
                        <MenuItem value="Metropolitan">Metropolitan</MenuItem>
                      </Select>
                    </FormControl>

                      <FormControl fullWidth size="small" className='mb-4'>
                      <InputLabel required>Regions</InputLabel>
                      <Select
                        value={regions}
                        onChange={(e) => setregions(e.target.value)}
                        required
                        error={regionsError}
                        onBlur={regionsErrorhandel}
                        label="Regions"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Ashanti Region">Ashanti Region</MenuItem>
                        <MenuItem value="Brong Ahafo Region">Brong Ahafo Region</MenuItem>
                        <MenuItem value="Central Region">Central Region</MenuItem>
                        <MenuItem value="Eastern Region">Eastern Region</MenuItem>
                        <MenuItem value="Greater Accra Region">Greater Accra Region</MenuItem>
                        <MenuItem value="Northern Region">Northern Region</MenuItem>
                        <MenuItem value="Upper East Region">Upper East Region</MenuItem>
                        <MenuItem value="Upper West Region">Upper West Region</MenuItem>
                        <MenuItem value="Volta Region">Volta Region</MenuItem>
                        <MenuItem value="Western Region">Western Region</MenuItem>
                        <MenuItem value="Savannah Region">Savannah Region</MenuItem>
                        <MenuItem value="Bono East Region">Bono East Region</MenuItem>
                        <MenuItem value="Oti Region">Oti Region</MenuItem>
                        <MenuItem value="Ahafo Region">Ahafo Region</MenuItem>
                        <MenuItem value="Western North Region">Western North Region</MenuItem>
                        <MenuItem value="North East Region">North East Region</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                        required
                        fullWidth
                        size="small"
                        label="Location"
                        error={locationError}
                        onBlur={locationErrorhandel}
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                        className='mb-4'
                        />

                        <TextField
                        required
                        fullWidth
                        size="small"
                        error={digitaladdError}
                        onBlur={digitaladdErrorhandel}
                        label="Digital Address"
                        value={digitaladd}
                        onChange={(e) => setdigitaladd(e.target.value)}
                        className='mb-4'
                        />

                        <TextField
                        required
                        fullWidth
                        size="small"
                        label="Emaill"
                        value={email}
                        error={emailError}
                        onBlur={emailErrorhandel}
                        onChange={(e) => setemail(e.target.value)}
                        className='mb-4'
                        type='email'
                        />


                        <TextField
                        required
                        fullWidth
                        size="small"
                        label="Phone Contact"
                        error={PhoneError}
                        onBlur={PhoneErrorhandel}
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='mb-4'
                        type='number'
                        />

                        <ImageUploading 
                                multiple
                                value={images}
                                 onChange={piconChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={["jpg" ,'PNG']}
                                className=''
                            >
                                {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    {
                                        images.length ==1 ? '' :(
                                           
                                            <Button
                                            className='btn btn-outline-primary'
                                            variant="outlined"
                                            color="info"
                                            startIcon={<CloudUploadIcon />}
                                            fullWidth
                                            style={isDragging ? { color: "red" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                           
                                            >
                                            Browse For Assembly Logo
                                            </Button>
                                        )

                                    }
                                
                                    &nbsp;
                                
                                    {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                         <div className='row'>
                                            <div className='col-md-2'></div>
                                            <div className='col-md-4'>
                                            <img src={image.data_url} alt="" width="150" className='mb-2'/>
                                            </div>
                                            <div className='col-md-4'>
                                            <div className="image-item__btn-wrapper">
                                            <Button className='edit-btn mt-2' onClick={() => onImageUpdate(index)}>  <CloudUploadIcon size={20}/></Button>
                                            <Button className='' onClick={() => onImageRemove(index)}>  <ClearIcon size={20} /></Button>
                                        </div>
                                            </div>
                                         </div>
                                       
                                    </div>
                                    ))}
                                </div>
                                )}
                            </ImageUploading>

                            <Stack sx={{ width: '100%' }} spacing={2} >
                            <Alert severity="info">Enter Activation Key</Alert>
                            </Stack>

                            <TextField
                            required
                            fullWidth
                            size="small"
                            error={acckeyError}
                            onBlur={acckeyErrorhandel}
                            label="Activation Key"
                            value={acckey}
                            onChange={(e) => setacckey(e.target.value)}
                            className='mb-2 mt-2'
                            type='text'
                            />
                    </div>
                </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2'>
            <div className='card'>
                    <div className='card-header'>Head Of Assembly Setup </div>
                    <div className='card-body'>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            label="Full Name"
                            value={Headname}
                            onChange={(e) => setHeadname(e.target.value)}
                            error={HeadnameError}
                            onBlur={HeadnameErrorhandel}
                            className='mb-4'
                            type='text'
                            />

<                           TextField
                            required
                            fullWidth
                            size="small"
                            label="Staff  Id"
                            value={HeadstaffId}
                            onChange={(e) => setHeadstaffId(e.target.value)}
                            error={HeadstaffIdError}
                            onBlur={HeadstaffIdErrorhandel}
                            className='mb-4'
                            type='text'
                            />

                        <FormControl fullWidth size="small" className='mb-4'>
                      <InputLabel required>Gender</InputLabel>
                      <Select
                        value={HeadGender}
                        onChange={(e) => setHeadGender(e.target.value)}
                        error={HeadGenderError}
                        onBlur={HeadGenderErrorhandel}
                        label="Gender"
                      >
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        
                      </Select>
                      </FormControl>

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="Phone Contact"
                            value={Headphno}
                            onChange={(e) => setHeadphno(e.target.value)}
                            error={HeadphnoError}
                            onBlur={HeadphnoErrorHandel}
                            className='mb-4'
                            type='number'
                            />

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="Email Address"
                            value={HeadEmaill}
                            onChange={(e) => setHeadEmaill(e.target.value)}
                            error={HeadEmaillError}
                            onBlur={HeadEmaillErrorhandel}
                            className='mb-4'
                            type='email'
                            />

                            <Stack sx={{ width: '100%' }} spacing={2} >
                            <Alert severity="info">Create User Account</Alert>
                            </Stack>

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="User Name"
                            value={HeadUsername}
                            onChange={(e) => setHeadUsername(e.target.value)}
                            className='mb-4 mt-3'
                            error={HeadUsernameError}
                            onBlur={HeadUsernameErrorhandel}
                            type='text'
                            />


                            <TextField
                            label="Password"
                            variant="outlined"
                            type={showPasswordHead ? 'text' : 'password'}
                            className="text-field mb-4"
                            fullWidth
                            size="small"
                            value={HeadPassword}
                            onChange={(e) => setHeadPassword(e.target.value)}
                            error={HeadPasswordError}
                            onBlur={HeadPasswordErrorhandel}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={togglePasswordVisibility} sx={{ minWidth: 'auto', padding: 0 }}>
                                        {showPasswordHead ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                ),
                            }}
                        />

                            <TextField
                            label="Retype-Password"
                            variant="outlined"
                            type={showPasswordHeadRety ? 'text' : 'password'}
                            className="text-field mb-2"
                            fullWidth
                            size="small"
                            value={HeadReTyPassword}
                            onChange={(e) => setHeadReTyPassword(e.target.value)}
                            error={HeadReTyPasswordError}
                            onBlur={HeadReTyPasswordErrorhandel}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={togglePasswordVisibilitypasret} sx={{ minWidth: 'auto', padding: 0 }}>
                                        {showPasswordHeadRety ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                ),
                            }}
                        />

                    </div>
                </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2'>
            <div className='card'>
                    <div className='card-header'>System Administrator Setup</div>
                    <div className='card-body'>
                        <TextField
                            required
                            fullWidth
                            size="small"
                            label="Full Name"
                             value={syname}
                             onChange={(e) => setsyname(e.target.value)}
                             error={synameError}
                             onBlur={synameErrorhandel}
                            className='mb-4'
                            type='text'
                            />

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="Staff  Id"
                            value={systaffId}
                            onChange={(e) => setsystaffId(e.target.value)}
                            error={systaffIdError}
                            onBlur={systaffIdErrorhandel}
                            className='mb-4'
                            type='text'
                            />

                        <FormControl fullWidth size="small" className='mb-4'>
                        <InputLabel required>Gender</InputLabel>
                        <Select
                            value={syGender}
                            onChange={(e) => setsyGender(e.target.value)}
                            error={syGenderError}
                            onBlur={syGenderErrorhanle}
                            label="Gender *"
                        >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            
                        </Select>
                        </FormControl>

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="Phone Contact"
                            value={syphno}
                            onChange={(e) => setsyphno(e.target.value)}
                            error={syphnoError}
                            onBlur={syphnoErrorhandel}
                            className='mb-4'
                            type='number'
                            />

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="Email Address"
                            value={syEmaill}
                            onChange={(e) => setsyEmaill(e.target.value)}
                            error={syEmaillError}
                            onBlur={syEmaillErrorhandel}
                            className='mb-4'
                            type='email'
                            />

                            <Stack sx={{ width: '100%' }} spacing={2} >
                            <Alert severity="info">Create User Account</Alert>
                            </Stack>

                            <TextField
                            required
                            fullWidth
                            size="small"
                            label="User Name"
                            value={syUsername}
                            onChange={(e) => setsyUsername(e.target.value)}
                            error={syUsernameError}
                            onBlur={syUsernameErrorhandel}
                            className='mb-4 mt-3'
                            type='text'
                            />


                            <TextField
                            label="Password"
                            variant="outlined"
                            type={showPasswordAdmin ? 'text' : 'password'}
                            className="text-field mb-4"
                            fullWidth
                            size="small"
                            value={sypassword}
                            onChange={(e) => setsypassword(e.target.value)}
                            error={syPasswordError}
                            onBlur={syPasswordErrorhandel}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={togglePasswordVisibilityAdm} sx={{ minWidth: 'auto', padding: 0 }}>
                                        {showPasswordAdmin ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                ),
                            }}
                        />

                            <TextField
                            label="Retype-Password"
                            variant="outlined"
                            type={showPasswordrtAdm ? 'text' : 'password'}
                            className="text-field mb-2"
                            fullWidth
                            size="small"
                            value={syReTyPassword}
                            onChange={(e) => setsyReTyPassword(e.target.value)}
                            error={syReTyPasswordError}
                            onBlur={syReTyPasswordErrorhandel}
                            InputProps={{
                                endAdornment: (
                                    <Button onClick={togglePasswordVisibilityadm} sx={{ minWidth: 'auto', padding: 0 }}>
                                        {showPasswordrtAdm ? <VisibilityOff /> : <Visibility />}
                                    </Button>
                                ),
                            }}
                        />

                    </div>
                </div>
            </div>
       

        </div>
          
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
           onClick={saveactivation}
        >
            Activate Assembly Account & Save Information
        </Button>

      </CardContent>
    </Card>

  
  </Container>
  )
}

export default AssemblySetup