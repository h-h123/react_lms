import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Link, Modal, Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../api'
import Navbar from '../../components/navbar'
import Typography from '@mui/material/Typography';
import DriverHome from '../dhome';

export default function Home() {

  const [alert, setAlert] = useState(0);
  const [alert1, setAlert1] = useState(0);
  const navigate = useNavigate();

  const messages = {
    400: ['error', "Required * fields can't be empty"],
    200: ['success', "Successful"],
    201: ['info', "Email not verified, redirecting to verify"],
    401: ['error', "Email or Password is incorrect."],
    500: ['error', "Internal Server error!"]
  }

  const onAlertClosed = () => {
    setAlert1(0);
  }
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openRM, setOpenRM] = React.useState(false);
  const handleOpenRM = () => setOpenRM(true);
  const handleCloseRM = () => setOpenRM(false);
  const [openAB, setOpenAB] = React.useState(false);
  const handleOpenAB = () => setOpenAB(true);
  const handleCloseAB = () => setOpenAB(false);
  const [openRB, setOpenRB] = React.useState(false);
  const handleOpenRB = () => setOpenRB(true);
  const handleCloseRB = () => setOpenRB(false);
  const [openASB, setOpenASB] = React.useState(false);
  const handleOpenASB = () => setOpenASB(true);
  const handleCloseASB = () => setOpenASB(false);
  const [openBL, setOpenBL] = React.useState(false);
  const handleOpenBL = () => setOpenBL(true);
  const handleCloseBL = () => setOpenBL(false);
  const [openML, setOpenML] = React.useState(false);
  const handleOpenML = () => setOpenML(true);
  const handleCloseML = () => setOpenML(false);
  const [books, setBooks] = React.useState([])
  const [members, setMembers] = React.useState([])

  function getBooks(){
    api.get("/getBooks", {withCredentials: true})
    .then((data)=>{
      console.log(data)
      setBooks(data.data);
    })
    .catch(err=>{
      console.log(err)
    })
  }
  function getMembers(){
    api.get("/getMembers", {withCredentials: true})
    .then((data)=>{
      console.log(data)
      setMembers(data.data);
      navigate("/")
    })
    .catch(err=>{
      console.log(err)
    })
  }
  function handleSubmit(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('name') || !data.get('phone')){
      setAlert(400);
      setTimeout(() => {
        onAlertClosed();
      }, 3000);
      return
    }

    const loginDataObj = {
      mname: data.get('name'),
      mnumber: data.get('phone')
    } 
    
    api.post('/addMember', loginDataObj, {withCredentials: true})
    .then(function(res){
      setAlert(res.status);
      if(res.status === 200){
        console.log(res.status)
        setTimeout(function(){
          onAlertClosed();
          navigate("/")
        }, 3000);
      }
      else if(res.status === 201){
        setTimeout(function(){
          onAlertClosed();
        }, 3000);
      }
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
    }); 
  }
  function handleSubmitRM(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('name') || !data.get('phone')){
      setAlert(400);
      setTimeout(() => {
        onAlertClosed();
      }, 3000);
      return
    }

    const loginDataObj = {
      mname: data.get('name'),
      mnumber: data.get('phone')
    } 
    
    api.post('/removeMember', loginDataObj, {withCredentials: true})
    .then(function(res){
      console.log(200)
      setAlert(res.status);
      if(res.status === 200){
        setTimeout(function(){
          onAlertClosed();
          navigate("/")
        }, 3000);
      }
      else if(res.status === 201){
        setTimeout(function(){
          onAlertClosed();
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}})
        }, 3000);
      }
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
    }); 
  }
  function handleSubmitAB(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('aname') || !data.get('bname')){
      setAlert(400);
      setTimeout(() => {
        onAlertClosed();
      }, 3000);
      return
    }

    const loginDataObj = {
      bname: data.get('bname'),
      aname: data.get('aname'),
    } 
    
    api.post('/addBook', loginDataObj, {withCredentials: true})
    .then(function(res){
      console.log(200)
      setAlert(res.status);
      if(res.status === 200){
        setTimeout(function(){
          onAlertClosed();
          navigate("/")
        }, 3000);
      }
      else if(res.status === 201){
        setTimeout(function(){
          onAlertClosed();
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}})
        }, 3000);
      }
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
    }); 
  }
  function handleSubmitRB(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('aname') || !data.get('bname')){
      setAlert(400);
      setTimeout(() => {
        onAlertClosed();
      }, 3000);
      return
    }

    const loginDataObj = {
      bname: data.get('bname'),
      aname: data.get('aname'),
    } 
    
    api.post('/removeBook', loginDataObj, {withCredentials: true})
    .then(function(res){
      console.log(200)
      setAlert(res.status);
      if(res.status === 200){
        setTimeout(function(){
          onAlertClosed();
          navigate("/")
        }, 3000);
      }
      else if(res.status === 201){
        setTimeout(function(){
          onAlertClosed();
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}})
        }, 3000);
      }
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
    }); 
  }
  function handleSubmitASB(event){

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!data.get('aname') || !data.get('bname') || !data.get('mname')){
      setAlert(400);
      setTimeout(() => {
        onAlertClosed();
      }, 3000);
      return
    }

    const loginDataObj = {
      bname: data.get('bname'),
      aname: data.get('aname'),
      userName: data.get('mname')
    } 
    
    api.post('/assignBook', loginDataObj, {withCredentials: true})
    .then(function(res){
      console.log(200)
      setAlert(res.status);
      if(res.status === 200){
        setTimeout(function(){
          onAlertClosed();
          navigate("/")
        }, 3000);
      }
      else if(res.status === 201){
        setTimeout(function(){
          onAlertClosed();
          navigate("/verifyUser", {state: { userId: res.data.userId, email: res.data.email}})
        }, 3000);
      }
    })
    .catch(function(err){
      setAlert(err.response.status);
      setTimeout(function(){
        onAlertClosed();
      }, 3000);
    }); 
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  function onLoad(){
    api.get("/authenticate", {withCredentials:true})
    .then(res=>{
      setUserData(res.data);
      getBooks()
      getMembers()
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    onLoad();
  }, [])



  return (
    <>
    
    {
      (userData)?
      <>
      {
        (userData.userType === "librarian")? <DriverHome/>:<></>
      }
      </>
      :<Navbar isLoggedIn={false}></Navbar>
    }
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box component="form" noValidate onSubmit={handleSubmit} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
    }
  <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Mobile Number"
                  type="number"
                  id="phone"
                  autoComplete="phone"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Submit
            </Button>
  </Box>
</Modal>
    <Button
              type="submit"
              
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              onClick={handleOpen}
              >
              Add Member
            </Button>
            <Modal
              open={openRM}
              onClose={handleCloseRM}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
  <Box component="form" noValidate onSubmit={handleSubmitRM} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
    }
  <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Mobile Number"
                  type="number"
                  id="phone"
                  autoComplete="phone"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Submit
            </Button>
          </Box>
        </Modal>
    <Button
              type="submit"
              onClick={handleOpenRM}
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              >
              Remove Member
            </Button>
  <Modal
    open={openAB}
    onClose={handleCloseAB}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box component="form" noValidate onSubmit={handleSubmitAB} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
    }
  <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bname"
                  label="Book Name"
                  name="bname"
                  autoComplete="name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aname"
                  label="Author Name"
                  type="name"
                  id="aname"
                  autoComplete="phone"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Submit
            </Button>
          </Box>
        </Modal>
    
    <Button
              type="submit"
              onClick={handleOpenAB}
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              >
              Add Book
            </Button>
            <Modal
    open={openRB}
    onClose={handleCloseRB}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box component="form" noValidate onSubmit={handleSubmitRB} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
    }
  <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bname"
                  label="Book Name"
                  name="bname"
                  autoComplete="name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aname"
                  label="Author Name"
                  type="name"
                  id="aname"
                  autoComplete="phone"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Submit
            </Button>
          </Box>
        </Modal>
  
    <Button
              type="submit"
              onClick={handleOpenRB}
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              >
              Remove Book
            </Button>
            <Modal
    open={openASB}
    onClose={handleCloseASB}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  <Box component="form" noValidate onSubmit={handleSubmitASB} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
    }
  <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="bname"
                  label="Book Name"
                  name="bname"
                  autoComplete="name"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aname"
                  label="Author Name"
                  type="name"
                  id="aname"
                  autoComplete="phone"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mname"
                  label="Member Name"
                  name="mname"
                  autoComplete="name"
                  />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              Submit
            </Button>
          </Box>
        </Modal>
    <Button
              type="submit"
              onClick={handleOpenASB}
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              >
              Assign Book
            </Button>
  <Modal
    open={openBL}
    onClose={handleCloseBL}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
        <Box component="form" noValidate onSubmit={getBooks} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
  }

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Book Name</TableCell>
            <TableCell align="right">Author Name</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">User Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book) => (
            <TableRow
              key={book._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{book.bname}</TableCell>
              <TableCell align="right">{book.aname}</TableCell>
              <TableCell align="right">{book.userName}</TableCell>
              <TableCell align="right">{book.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Box>
        </Modal>
    <Button
              type="submit"
              onClick={handleOpenBL}
              variant="contained"
              sx={{ margin:2,mt: 3, mb: 2 }}
              >
              Books List
            </Button>

            <Modal
    open={openML}
    onClose={handleCloseML}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
        <Box component="form" noValidate onSubmit={getBooks} sx={style}>
  {
      (alert)
      ?
      <Alert severity={messages[alert][0]} variant='standard'>{messages[alert][1]}</Alert>
      :
      <></>
  }

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Member Name</TableCell>
            <TableCell align="right">Member Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members?.map((member) => (
            <TableRow
              key={member._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{member.mname}</TableCell>
              <TableCell align="right">{member.mnumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Box>
        </Modal>
    <Button
              type="submit"
              onClick={handleOpenML}
              variant="contained"
              sx={{margin:2, mt: 3, mb: 2 }}
              >
              Members List
            </Button>
    </>
  )
}
