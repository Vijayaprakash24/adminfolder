import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import './homepage.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import logo from './image1.png'
import { AiOutlineArrowLeft } from "react-icons/ai";


const Homepage = () => {
  const navigate=useNavigate('')
  const {id}=useParams();
const api='https://daily-news-server.onrender.com/news';
const [list,setList]=useState([])
const [news,setNews]=useState([])






  useEffect(()=>{
    async   function fetchdata(){
      
      try{
            const date=await axios.get(api)
            const res =await axios.get(`${api}/${id}/news`);
            setList(date.data)
          
          
           
           
      }
      catch(err){
            console.log("error in fetching the data",err)
      }
    }
    fetchdata();
  },[api,id])

  useEffect(()=>{
    if(list.length>0 && id){
      const valid = list.find((x) => x._id === id);
      if (valid) {
        setNews(valid.news);
       
      
      } else {
        console.error("User not found!");
      }
    }
  }, [list, id]); 


  const add=(e)=>{
    navigate(`/addnews/${id}`)
  }


const deletefile=async (e,id2)=>{
  e.preventDefault();
  try{
    const delete1=await axios.delete(`${api}/${id}/news/${id2}`)
      setNews((x)=>x.filter((news)=>news._id!==id2))
    
  }catch(err){
    console.log(err)
  }

}

  return (
 <>
 <div className="container1">
 
  <Image src={logo} alt="Logo" className="image1" />
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
          navigate('/')
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
      Log Out
      </div>
    </div>

  <div className="modal show" style={{ display: 'flex', flexDirection: 'column', marginTop: "0%" }}>
    <Container className="cardnews">
      <Row className="gy-4">
        {news.map((x, index) => (
<Col key={index} xs={12} sm={6} md={4} lg={3}>
        
           
            <Modal.Dialog className="cardnews ">
              
              <Modal.Header>
                <Modal.Title>{x.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{x.about}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary"
                onClick={(e)=>deletefile(e,x._id)}
                
                >Delete News</Button>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/editnews/${id}/news/${x._id}`)}
                >
                  Edit News
                </Button>
              </Modal.Footer>
            
            </Modal.Dialog>
           
           </Col>
        ))}
      </Row>
   
    <div className="button">
      <Button className="align" variant="outline-success" onClick={(e) => add(e,)}>
        Add News
      </Button>
    </div>
     </Container>
 
</div>

     
</>

  )
}

export default Homepage