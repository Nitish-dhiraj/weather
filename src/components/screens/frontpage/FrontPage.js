import React, { useEffect } from "react";
import './FrontPage.css'
// import logo from "./weatherlogo.png"
import logo from '../../../weather1.png'
import { Link } from "react-router-dom";
import { LINKS } from "../../constants";

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = ([
    {
        id: "1",
        message: "Welcome to WeatherNikBot, I am here to help you.",
        trigger: "2"
    },
    {
        id: "2",
        message: "Please provide your name",
        trigger: "3"
    },
    {
        id: "3",
        user: true,
        trigger: "4"
    },

    {
        id: "4",
        message: 'Hi {previousValue}, nice to meet you!   How are you?',
        trigger: "5"
    },
    {
        id: "5",
        user: true,
        trigger: "6"
    },
    {
        id:'6',
        message:"Please Select the options below:",
        trigger:'7'
    },
    {
        id:'7',
        options: [
            { value: 1, label: "Know About WeatherNik", trigger: "8" },
            { value: 2, label: "Any other Query", trigger: "9" },
          ]
    },
    {
        id: "8",
        message: 'It is a weather app which can give you the weather related details of various places.You can click on the Button Get Started and Easily Search any location to know about their weather status.Thanks for Visiting Here....!',
        end:true
    },
    {
        id: "9",
        component: (
            <div> Now you can click on the link below to know about your all the Queries <a href="https://www.google.co.in">BotSearch</a> </div>
          ),
        end: true
    },


]);

// Creating our own theme
const theme = {
    background: '#606060',
    headerBgColor: '#202020',
    headerFontSize: '30px',
    botBubbleColor: '#404040',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#404040',
    userFontColor: 'white',
};

// Set some properties of the bot
const config = {
    // botAvatar: "logo192.png",
    floating: true,
};



function FrontPage() {

    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <div className='dark-overlay'
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row', height: '100vh'
            }}>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 0.5,
            }}>

                <img className=".App-logo" style={{ alignSelf: 'center' }} src={logo} width="350" height="350" alt="logo" />

            </div>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                flex: 0.5,
                flexDirection: 'column'
            }}>

                <h1 style={{ textAlign: 'center', fontSize: 50, color: 'white' }}>Welcome To WeatherNik</h1>
                <Link to={`/${LINKS.home}`}>
                    <button type="submit" class="btn btn-secondary">GET Started </button>
                </Link>

            </div>


            <div className="App">
                <ThemeProvider theme={theme}>
                    <ChatBot

                        // This appears as the header
                        // text for the chat bot
                        headerTitle="WeatherNikBot"
                        steps={steps}
                        {...config}

                    />
                </ThemeProvider>
            </div>





        </div>
    );
}
export default FrontPage;

