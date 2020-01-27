import React, { useState } from 'react';
import _ from 'lodash'; 
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
//process.env.REACT_APP_RES_API_KEY

// Responsive Title
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);



export default function Res(){

    const [lat, setLat] = useState(-33.865143);
    const [lng, setLng] = useState(151.209900);
    const [currentRestaurant, setCurrentRestaurant] = useState(null);


    function handleLatChange(event){
        setLat(event.target.value);
        

    }

    function handleLngChange(event){
        setLng(event.target.value);
        
    }


    function handleSearch(event){
        const location = new window.google.maps.LatLng(lat,lng);

        const map = new window.google.maps.Map(document.getElementById('map'), {
            center:location,
            zoom: 15
        });

        const request = {
            location: location,
            radius: '1200',
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


    return(
        <div className="outer-container">
            <ThemeProvider theme={theme}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom >
                <Box>Random Restaurant Generator</Box>
            </Typography>
            <div className="subtitle2">
            <Typography variant="h5" align="center" color="textSecondary" display="inline">
                <Box >Enter the coordinates of a city and discover a restaurant!</Box>
            </Typography>
            </div>
            </ThemeProvider>
            <div className ="lat-lng">
                <Input placeholder = "search for lat here. default is -33.865143" onChange={handleLatChange}/>
                <Input placeholder = "search for lng here default is 151.209900" onChange={handleLngChange}/>
            </div>
            <Button onClick={handleSearch} color ="secondary" variant="outlined">Search</Button>
            {currentRandomRestaurant}
        </div>
            
    
    );
}