import React, { useEffect, useState, Fragment } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Home.css'
import axios from "axios";
import background from '../../../assets/image/wallpaper.jpeg'
import { Link,useNavigate } from "react-router-dom";
import { LINKS } from "../../constants";

const LOCAl_KEY = 'city';

function Home() { 
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');
  const [weatherObj, setWeatherObj] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    let cityName = localStorage.getItem(LOCAl_KEY);

    if(cityName != null && cityName != undefined){
      callSearchApi(cityName)
    }
    // callApi();
  },[]);

  const callSearchApi = (cityName) => {
    axios({
      url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=99d45b7fa3d04057aeb060cd5405712b`,
      // Endpoint to send files
      // url:`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=161051085ea8e2db2c7fd768268b7be2`,
      // url: `http://api.openweathermap.org/data/2.5/weather?q=london&APPID=161051085ea8e2db2c7fd768268b7be2`,
      method: "GET",

    })
      .then((res) => {
        console.log("responseeeee-- " + JSON.stringify(res));
        console.log("responseeeeeMain-- " + res.data.weather[0].description);
        localStorage.setItem(LOCAl_KEY, cityName);
        // setCondition(res.data.weather[0].description)
        setWeatherObj(res.data)
      })
      .catch((err) => { console.log("cannot find the entered place")
      alert('Please enter the correct city name? We Cannot find the entered place')
    setWeatherObj(null)});
  }

  const handlechange = (event) => {
    // setSearch(event.target.value);
    console.log("valueeeee.." + event.target.value);
    let searchtext = event.target.value;
    setSearch(searchtext)
  }
  const handleSearch = () => {
    console.log("dataaaa    " + search);
    if (search != '' && search != undefined && search != null) {
      callSearchApi(search.toLowerCase())
    } else {
      alert("Please enter city name")
    }
  }

  const renderView = (title, value) => {
    return <div style={{ flexDirection: 'row', display: 'flex', }}>
      <p style={{ fontSize: 16, flex: 1, color: 'white' }}>{title}</p>
      <p style={{ fontSize: 18, color: 'white' }}>{value}</p>

    </div>

  }

  const timeset = (value) => {
    const minutes = Math.floor((value / 1000 / 60) % 60);

    const hours = Math.floor((value / 1000 / 60 / 60) % 24);

    return (
        `${hours}:${minutes}`
    )
}


  return (
    <Fragment>
      <div style={{
        backgroundImage: `url(${background})`,
        // backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
      }}
      >

        <div className='dark-overlay'>
          <div class="container">
            {/* <h1><img src={logo} className="App logo" height="40" width="40" alt="logo" />  WeatherNik  Search </h1> */}
            {/* <div class="search"> */}
            <input style={{width:'35%',height:50,fontSize:20,fontWeight:600,padding:10}} 
            class="label" type="search" placeholder="Enter city here...." onChange={handlechange} />
            <button style={{width:'10%',height:50,textAlign:'center',fontSize:26,margin:10}} class="btn btn-dark" onClick={handleSearch}>Search</button>
            {/* </div> */}
          </div>

          {console.log("weatherdta---> ", JSON.stringify(weatherObj))}
          {/* {console.log("weatherdta---> ",JSON.stringify(weatherObj.weather.description))} */}

          
          {
            weatherObj !== null && weatherObj !== undefined ?

            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <div style={{display:'flex',flex:0.33,justifyContent:'center'}} >
               {<img src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@4x.png`} alt="alt"></img>}
               <div>
               </div>
               </div>
              <div style={{display:'flex',flex:0.34,justifyContent:'center'}}  class="container2">
                <div style={{ flex: 1 }}>
                  <h4 style={{ marginLeft: 10 }}>{`${weatherObj.name},${weatherObj.sys.country}`}
                   
                  </h4>

                  <div class="container3">

                    {renderView(`Today's Weather:`, weatherObj.weather[0].description)}
                    {renderView(`TimeZone: `, weatherObj.timezone)}
                    {renderView(`Latitude:`, weatherObj.coord.lat)}
                    {renderView(`Longitude:`, weatherObj.coord.lon)}
                    {renderView(`Sunrise:`, timeset(weatherObj.sys.sunrise))}
                    {renderView(`Sunset:`, timeset(weatherObj.sys.sunset))}
                    {renderView(`Pressure:`, weatherObj.main.pressure)}

                  </div>
                  <div style={{ marginTop: 15, justifyContent:'center', alignItems:'center', flex:'1', display:'flex' }}>
                    {/* <Link to={`/${LINKS.searchpage}`}> */}
                      <button onClick={()=>{navigate(`/${LINKS.searchpage}`, { state: { city: search }})}}  class="btn btn-dark" type="submit">Ver el Futuro</button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
               <div style={{ display:'flex',flex:0.33,
                  justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                  <div style={{ width: 200, height: 200}}>
                    <CircularProgressbar value={weatherObj.main.humidity} text={`${weatherObj.main.humidity}%`} />
                  </div>
                  <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white',marginTop:10 }}>Humidity</p>
                </div>
            </div>
            :
            <p style={{
            display:'flex',
            flex:1,
            color:'white',
            fontSize:30, 
            marginTop:'10%',
            textalign:'center',
            justifyContent:'center'}}>
            Please enter any cityname to 
            check current Weather Condition</p>

          }
        

        </div>
      </div>
    </Fragment>
  );
}

export default Home;
