import React,{useEffect,useState} from 'react';
import './RowPost.css';
import axios from '../../axios';
import YouTube from 'react-youtube';
import {imageUrl,API_KEY} from '../../constants/constants'

function RowPost(props) {
  
  const[movies,setMovies]=useState([])
  const [urlId,setUrlId]=useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data);
      setMovies(response.data.results);
    }).catch(err=>{
      // alert('network error')
    })
  },[])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      //  https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}`).then((response) => {
        console.log('RESPONSE---',response.data);
        if(response.data.results.length!==0)
        {
          console.log('keeeeeeeeey',response.data.results[0]);
          setUrlId(response.data.results[0].key)
        }else{
          console.log('array empty')
        }

    })
}


  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>
          <img onClick={() => handleMovie(obj.id)} src={`${imageUrl+obj.backdrop_path}`} alt='posters' className={props.isSmall ? 'smallPoster' : 'poster'}></img> 
  
        )}                                                                                                                  
     

      </div>
      
     { urlId && <YouTube opts={opts } videoId={urlId}/>} 

      </div>
   
  )
}

export default RowPost
