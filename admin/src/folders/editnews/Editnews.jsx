import axios, { AxiosHeaders } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/Image'
import logo from '../homepage/image1.png'
import { AiOutlineArrowLeft } from "react-icons/ai";

const Editnews = () => {
    const {id,id1}=useParams();
    const [list,setList]=useState([]);
    const api='https://daily-news-server.onrender.com/news';
    const [news,setNews]=useState([]);
    const [title1,setTitle1]=useState('')
    const [description1,setDescription1]=useState('')
    const navigate=useNavigate('')

useEffect(()=>{
    const fetchdata=async ()=>{
        try{
      
        const res=await axios.get(`${api}/${id}/news/${id1}`)
        setList(res.data);
        
       
        }
        catch(err){
            console.log(err)
        }
     
    };
    fetchdata();
},[api,id,id1]);

useEffect(()=>{
    const newsdetails=()=>{
        if(list.news){
        const valid=list.news.find((x)=>x._id===id1);
        if(valid){
            setNews(valid);
          
        }else{
            console.log("No new found")
        }}
    };newsdetails();
},[list,id1])


const change = async (e) => {
  e.preventDefault();

  const news = list?.news?.find((x) => x._id === id1);
  if (!news) {
    console.error('News not found in list.news');
    return;
  }

  const updatenews = {
    ...news,
    title: title1 || news.title,
    description: description1 || news.description,
  };

  

  try {
    const response = await axios.put(`${api}/${id}/news/${id1}`, updatenews);
    if (response.status === 200) {
      console.log('News Updated Correctly');
      setNews((prevNews) => {
        if (!Array.isArray(prevNews)) {
          
          return [];
        }
        return prevNews.map((x) =>
          x._id === id1 ? { ...x, ...updatenews } : x
        );
      });
      navigate(`/home/${id}`);
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (err) {
    console.error(
      'Error updating News:',
      err.response?.data || err.message
    );
  }
};



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






<div className='center1'>
    <Form className='bar1'>
      <h2 style={{textAlign:"center"}}>Edit the News</h2>
      <div className='alignitem'>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title for the News"
        defaultValue={news.title} onChange={(e)=>{
          setTitle1(e.target.value)
        }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Description" 
        defaultValue={news.description}
         onChange={(e)=>{
          setDescription1(e.target.value)
        }}
        />
      </Form.Group>
     
      </div>
    <div className='button11' >
     <Button variant='outline-warning' className='button11' onClick={(e)=>change(e)} >save</Button>
</div>
</Form>
 </div>
   </>
  )
}

export default Editnews