import React, { useEffect ,useState} from 'react';
import './Banner.css';
import axios from '../../axios';
import {API_KEY} from '../../constants/constants';
import { imageUrl } from '../../constants/constants';


const Banner = () => {
  const[movie,setMovie]=useState()
  const random=Math.floor(Math.random()*20)

  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
       console.log(response.data.results[0])
      setMovie(response.data.results[random])
      
      
    })
  },[])

  return (
    
    <div className='banner' style={{backgroundImage:`url(${movie ? imageUrl + movie.backdrop_path : ""})`}}>

      {movie &&(
        <div className='content'>
            <h1 className='title'>{movie.title}</h1>
            <div  className='banner_buttons'>
            <button className='button'>Play</button>
            <button className='button'>My list</button>
            </div>
       
        <h1 className='description'>{ movie ? movie.overview:""}</h1>
        </div>
        )}
        <div className='fade_bottom'></div>

    </div>

  );
}

export default Banner;
