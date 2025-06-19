import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './login.css'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function Login() {
  const api='https://daily-news-server.onrender.com/news';
  const [list,setList]=useState([])
  const [name,setName]=useState('');
  const [id,setId]=useState('');
const navigate=useNavigate('')

    useEffect(()=>{
      async function fetchdata(){
        try{
        const res= await axios.get(api);
          setList(res.data);
        }catch(err){
          console.log(err)
        }
        
        
       }
        fetchdata();
    },[])
const handlesubmit=(e)=>{
  e.preventDefault();
    const valid = list.some((x) => x.name === name && x.password === id);
  const value=list.find((x)=>
    x.name===name && x.password===id
  )
  if(valid){
    alert(`sucessfully login into ${value.name}`)
    navigate(`/home/${value._id}`)
  }
  else{
    alert("Invaild username or password")
  }
}


  return (
    <>

    <div className='labe'>
        
    <Form className='for'> 
     <h5 style={{paddingBottom:"08%"}}>Admin Login</h5>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" >
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Name"
            onChange={(e)=>{
              setName(e.target.value)
             
            }}
          />
        </Col>
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInputGroup" >
          Password
          </Form.Label>
          <Form.Control
          type='password'
            className="mb-2"
            id="inlineFormInput"
            placeholder="Employee Id"
              onChange={(e)=>{
              setId(e.target.value)
          
            }}
          />
        </Col>
       <br></br>
        <Col xs="auto">

         <Button variant="outline-success"
         onClick={(e)=>handlesubmit(e)}
         >Submit</Button>
        </Col>
   
    </Form>
    </div>
    </>
  );
}

export default Login;