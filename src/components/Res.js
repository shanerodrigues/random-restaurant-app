import React, { useState } from 'react';
import _ from 'lodash'; 
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
//process.env.REACT_APP_RES_API_KEY

// Responsive Title
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

var api_key = 'bd548102b4ae420185f6f1dd430dc27b'
var api_url = 'https://api.opencagedata.com/geocode/v1/json?'
//q=PLACENAME&key=bd548102b4ae420185f6f1dd430dc27b'

// https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=bd548102b4ae420185f6f1dd430dc27b
// https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=bd548102b4ae420185f6f1dd430dc27b

/*
            
        <div className="flex.container">
            <ThemeProvider theme={theme}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                <Box>Random Restaurant Generator</Box>
            </Typography>
            <div className="subtitle2">
            <Typography variant="h5" align="center" color="textSecondary" display="inline">
                <Box >Enter the coordinates of a city and discover a restaurant!</Box>
            </Typography>
            <div className="menu">
                <div className ="lat-lng">
                    <Input placeholder = "search for lat here. default is -33.865143" onChange={handleLatChange}/>
                    <Input placeholder = "search for lng here default is 151.209900" onChange={handleLngChange}/>
                    <Button onClick={handleSearch} color ="secondary" variant="outlined">Search</Button>
                </div>
                <div className="other">
                    <div className='other-input'>
                        <Input placeholder = "search for city here default is Sydney" onChange={handleSearchChange}></Input>
                        
                    </div>
                    <Button onClick={handleRequest} color="secondary" variant="outlined">Search demo</Button>
                </div>
                {currentRandomRestaurant}
            </div>
        </div>

        // mess up
        <div class="wrapper">
            <header class="header">
                Welcome
            </header>
            <div class="aside aside-1">
                <Input placeholder = "search for lat here. default is -33.865143" onChange={handleLatChange}/>
                <Input placeholder = "search for lng here default is 151.209900" onChange={handleLngChange}/>
                <Button onClick={handleSearch} color ="secondary" variant="outlined">Search</Button>
            </div>
            <div class="aside aside-2">
                <Input placeholder = "search for city here default is Sydney" onChange={handleSearchChange}></Input>
                <Button onClick={handleRequest} color="secondary" variant="outlined">Search demo</Button>
            </div>
            <footer class="footer">
                {currentRandomRestaurant}
            </footer>
        </div>
        // Text search
                        <div className="other">
                    <div className='other-input'>
                        <Input placeholder = "search for city here default is Sydney" onChange={handleSearchChange}></Input>
                        
                    </div>
                    <Button onClick={handleRequest} color="secondary" variant="outlined">Search demo</Button>
                </div>
*/



export default function Res(){


    var [lat, setLat] = useState(-33.865143);
    var [lng, setLng] = useState(151.209900);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    var [place, setPlace] = useState('Sydney');
    var textLat = null;
    var textLng = null;


    var state ={ 
        loading: true,
    };
    
    


    async function handleRequest(event){
        
        

        var request_url = api_url 
        + 'q=' + place
        + '&key=' + api_key
        console.log(place);


        const response = await fetch(request_url);
        const data = await response.json();
        //setXLat(data.results[0].geometry.lat);
        var textLat = (data.results[0].geometry.lat);
        var textLng = (data.results[0].geometry.lng);
        console.log(textLat + ' lat ' + textLng + ' lng ');
        lat = (textLat);
        lng = (textLng);
        console.log(lat + ' lat ' + lng + ' lng ');
        handleSearch();
        
    }


    function handleSearchChange(event){
        place = (event.target.value);
        //console.log(place);

    }
    function handleLatChange(event){
        setLat(event.target.value);
        textLat = lat;

    }

    function handleLngChange(event){
        setLng(event.target.value);
        textLng = lng;
    }


    function handleSearch(event){
        const location = new window.google.maps.LatLng(lat,lng);

        const map = new window.google.maps.Map(document.getElementById('map'), {
            center:location,
            zoom: 15
        });

        const request = {
            location: location,
            // Radius is in metres.
            radius: '1500',
            type: ['restaurant']
        };

        const service = new window.google.maps.places.PlacesService(map);

        service.nearbySearch(request, (results) =>{
            const randomRestaurant = results[_.random(0,19)];
            setCurrentRestaurant(randomRestaurant); 
            });
    }
    
    let currentRandomRestaurant = null;
    if (currentRestaurant) {
        currentRandomRestaurant = (
            <div className="random-restaurant">
                <Typography>The current random restaurant is: </Typography>
                <div>{currentRestaurant.name}</div>
                <div>{currentRestaurant.vicinity}</div>
            </div>

        )
    }


    // grid

    return(
        <div className="outer-container">
            <ThemeProvider theme={theme}>
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                    <Box>Random Restaurant Generator</Box>
                </Typography>
            <div className="subtitle1">
                <Typography variant="h5" align="center" color="textSecondary" display="inline">
                    <Box >Enter the coordinates of a city and discover a restaurant!</Box>
                </Typography>
            </div>
            </ThemeProvider>
            <div className ="lat-lng">
                <Input placeholder = "search for lat here default is -33.865143" onChange={handleLatChange}/>
                <Input placeholder = "search for lng here default is 151.209900" onChange={handleLngChange}/>
            </div>
            <Button onClick={handleSearch} color ="secondary" variant="outlined">Search</Button>
            <div className="subtitle2">
                <Typography variant="h5" align="center" color="textSecondary" display="inline">
                    <Box >Enter a city and discover a restaurant!</Box>
                </Typography>
            </div>
            <div className="other">
                <div className='lat-lng'>
                    <Input placeholder = "search for a city here default is Sydney" onChange={handleSearchChange}></Input> 
                </div>
            </div>
            <Button onClick={handleRequest} color="secondary" variant="outlined">Search</Button>
            {currentRandomRestaurant}
        </div>
    );
}