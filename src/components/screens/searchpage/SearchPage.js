import React, { useState } from 'react'
import './SearchPage.css'
import axios from "axios";
import BarChart from "react-bar-chart";
import { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import LineChart from 'react-linechart';


function SearchPage() {
    const [temp, setTemp] = useState("")
    const [tempData, setTempData] = useState([])
    const [humidData, setHumidData] = useState([])
    const [pressData, setPressData] = useState([])
    const location = useLocation();
    const navigate = useNavigate();


    // const seconds = Math.floor((milliseconds / 1000) % 60);



    const timeset = (value) => {
        const time = new Date(value).toISOString().slice(11, 19);
        let splittedTime = time.split(':');
        const CTime = splittedTime[0] + ":" + splittedTime[1]

        return (
            CTime
            // new Date(value).toISOString().slice(11, 19)
            // value.toString().padStart(2, 0)
        )
    }
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        callApi(location.state.city);
        console.log("jhhfhdjfsd    " + location.state.city)
        // _callResponse(response.data.list);
    }, []);

    const _callResponse = (list) => {
        var tempList = list;
        var humidArray = new Array();
        var tempArray = new Array();
        var pressArray = new Array();


        for (let index = 0; index < 10; index++) {
            // for (let index = 0; index < tempList.length; index++) {
            const element = tempList[index];
            humidArray = [...humidArray, { text: timeset(element.dt_txt), value: element.main.humidity }]
            tempArray = [...tempArray, { text: timeset(element.dt_txt), value: element.main.temp }]
            pressArray = [...pressArray, { text: timeset(element.dt_txt), value: element.main.grnd_level }]


        }

        console.log("humidArrayhumidArrayhumidArray-- " + JSON.stringify(humidArray));
        console.log("respongfgfgfggseeeee-- " + JSON.stringify(tempArray));
        console.log("humidArrayhumidArrayhumidArray-- " + JSON.stringify(pressArray));
        setHumidData(humidArray)
        setTempData(tempArray)
        setPressData(pressArray)
    }

    const callApi = (city) => {
        axios({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=99d45b7fa3d04057aeb060cd5405712b`,
            method: "GET",

        })
            .then((res) => {
                console.log("responseeeee-- " + JSON.stringify(res));
                // setCondition(res.data.weather[0].description)
                var tempList = res.data.list;
                _callResponse(tempList)

            })
            .catch((err) => { console.log("cannot find the entered place") })
    }
    const data = [
        {
            color: "steelblue",
            points: [{ x: 29, y: 200 }, { x: 30, y: 500 }, { x: 31, y: 300 }]
        }
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
        <div className='dark-overlay'>
            <div style={{ display: 'flex', marginTop: '5%', flexdirection: 'row' }}>
                <div style={{ width: "50%", padding: 10, justifyContent: 'center', alignItems: 'center', display: 'flex', flex: 0.33, flexDirection: 'column' }}>
                    <BarChart
                        ylabel="Humidity Level"
                        width={400}
                        height={420}
                        margin={margin}
                        data={humidData}
                    />
                    <h4 style={{ fontSize: 26, fontWeight: 'bolder', color: 'white' }}>Humidity Level(%)</h4>
                </div>
                <div style={{ width: "50%", padding: 10, flex: 0.33, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChart
                    ylabel="Temperature"
                    width={400}
                    height={420}
                    margin={margin}
                    data={tempData}              
                />
                    {/* <LineChart
                        width={450}
                        height={420}
                        margin={margin}
                        data={data}
                    /> */}
                    <h4 style={{ fontSize: 26, fontWeight: 'bolder', color: 'white' }}>Temperature Level(Kelvin)</h4>
                </div>
                <div style={{ width: "50%", padding: 10, flex: 0.33, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChart
                        ylabel="Pressure"
                        width={400}
                        height={420}
                        margin={margin}
                        data={pressData}
                    />
                    <h4 style={{ fontSize: 26, fontWeight: 'bolder', color: 'white' }}>Pressure Level</h4>
                </div>
            </div>
        </div>
    );
}
export default SearchPage;       