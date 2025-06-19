import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import './addnews.css'
import Image from 'react-bootstrap/Image'
import logo from '../homepage/image1.png'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AiOutlineArrowLeft } from "react-icons/ai";


const Addnews = () => {

  const api='https://daily-news-server.onrender.com/news'
  const [image,setImage]=useState('')
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [date,setDate]=useState('')
  const {id}=useParams()
  const navigate=useNavigate('')
  const [list,setList]=useState([])
  const categories = ['Headlines', 'Sports','India', 'Movies', 'Health', 'Science', 'Business'];
   const [type,setType]=useState('')
  const [about,setAbout]=useState('')


useEffect(()=>{
  const fetchdata=async ()=>{
      
      
      try{
            const res =await axios.get(`${api}/${id}/news`);
            setList(res.data)
          
       
           
           
      }
      catch(err){
            console.log("error in fetching the data",err)
      }
    };

    fetchdata();
  },[api,id])




const clicknews = async (e) => {
  e.preventDefault();

  if (title && description && date && image) {
    const newNews = { type,title,about, description, date, image,timestamp: new Date().toISOString() };


  

    try {
      const res = await axios.post(`${api}/${id}/news`, newNews, {
        headers: { "Content-Type": "application/json" },
      });

      
      setList((prevList) => (Array.isArray(prevList) ? [...prevList, res.data] : [res.data]));
      alert("News uploaded successfully");
       navigate(`/home/${id}`);
    } catch (err) {
      console.error("Error uploading news:", err.response?.data || err.message);
    }
  } else {
    alert("Please fill in all the fields");
  }
};





  const newsbase64=(e)=>{
  const file=e.target.files[0];
  if(file){
    const render=new FileReader();
    render.readAsDataURL(file);
     render.onload=function(){
       const result=render.result;
       setImage(result);
      
    };
        render.onerror = function (error) {
            console.log('Error: ', error);
        };
  }
}
  return (
    <>
    
   <div className="container">
 <Image
        src={logo} 
        
         className="image1"
      />
      </div>


  
  <div
      style={{
        position: "relative", // To position the tooltip
        display: "inline-block",
      }}
    >
      <Button
        style={{
          marginLeft:'50px',
          borderRadius: "50%",
          padding: "10px",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "white", // Ensures the icon is visible
          border: "none",
          cursor: "pointer",
        }}

        onClick={()=>{
          navigate(`/home/${id}`)
        }}
        onMouseOver={(e) => {
          const tooltip = document.getElementById("tooltip");
          tooltip.style.visibility = "visible";
          tooltip.style.opacity = 1;
        }}
        onMouseOut={(e) => {
          const tooltip = document.getElementById("tooltip");
          tooltip.style.visibility = "hidden";
          tooltip.style.opacity = 0;
        }}
      >
        <AiOutlineArrowLeft />
      </Button>

      {/* Tooltip */}
      <div
        id="tooltip"
        style={{
          marginLeft:'100px',
          marginTop:'3px',
          visibility: "hidden",
          opacity: 0,
          position: "absolute",
          top: "120%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          transition: "opacity 0.3s ease",
        }}
      >
      Home Page
      </div>
    </div>




   <div className='form'>
     <Form className='formtext'>
      <div className='alignitem'>
         <Row>
      <Col>
        {categories.map((category, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={category}
            name="category" 
              value={category} // Explicitly set the value
  onChange={(e) => {
    setType(e.target.value); // Update state
   
     
  }}
          />
        ))}
      </Col>
    </Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title for this News</Form.Label>
        <Form.Control type="tect" placeholder="Enter Title" 
        onChange={(e)=>{
          setTitle(e.target.value)
          
        }}
        />
        <Form.Text className="text-muted">
          Title for this News.
        </Form.Text>
      </Form.Group>


       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>About for this News</Form.Label>
        <Form.Control type="text" placeholder="Enter About of this News" 
        onChange={(e)=>{
          setAbout(e.target.value)
          
        }}
        />
        <Form.Text className="text-muted">
          About for this News.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description for News</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Description" 
        onChange={(e)=>{
          setDescription(e.target.value)
        }}
        />
        <Form.Text className="text-muted">
          Description for this News.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date of the News</Form.Label>
        <Form.Control type="Date" placeholder="Enter email"
        onChange={(e)=>{
          setDate(e.target.value)
        }}
        />
        <Form.Text className="text-muted">
          Date of the News.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control 
        
        
        type="file" onChange={(e)=>newsbase64(e)} />
      </Form.Group>
      
      
      
     </div>
   <div className='button11'>
     <Button variant="outline-primary" className='button12' style={{backgroundColor:'white'}} type="submit"
      onClick={(e)=>clicknews(e)}
      >
        Submit
      </Button>
      </div>
       </Form>
 </div>
    </>
  )
}

export default Addnews