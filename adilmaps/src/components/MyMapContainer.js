import React, { Component } from 'react'
import LocationList from './LocationList';
import locations from './locations.json';

class MyMapContainer extends Component {

	componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCU0i72jjVgxFzZkuijAZHj265LFzlKss4&callback=initMap')

    }
    
     // Constructor
     constructor(props) {
        super(props);
        this.state = {
           AdilLocations: locations,
            'map': '',
            'infowindow': '',
            
        };

        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

     //Close the infowindow for the marker
     // @param {object} location marker
     
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }
   

    
     // Initialise the map once the google map script is loaded
     
    initMap() {
        var self = this;
        var viewmap = document.getElementById('map');
        viewmap.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(viewmap, {
        	zoom: 12,
            center: {lat: 16.314209, lng:80.435028},
            mapTypeControl: false,
            ariaLabel:"location",
            role:"application"
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        var AdilLocations = [];
        this.state.AdilLocations.map(function (location) {
            var name = location.name + location.type;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.name = name;
            location.marker = marker;
            location.display = true;
            AdilLocations.push(location);
        });
        this.setState({
            'AdilLocations': AdilLocations
        });
    }

    
      //Open the infowindow for the marker
     
    
      //Retrive the location data from the foursquare api for the marker and display it in the infowindow
     
     
    getMarkerInfo(marker) {
        var self = this;
        
        var url = "https://api.foursquare.com/v2/venues/search?client_id=3PNEBWP3TZB2OGHBRFOP5NIDZBW0BKRZY2ZQDSOGEKCLRYCK&client_secret=Q2QAAD0OGITXOOIWN4S0HL4YL4GTSJ2UN2RVY2HDEDLFS1Q4&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {

                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data)
                       
                        var location_data = data.response.venues[0];

                     	var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">This data is available in Foursquare Website</a>'
                        self.state.infowindow.setContent();
                        self.state.infowindow.setContent(readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
                alert("Network Error, Please")
            });
    }

    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }


	render(){
		return(
			<div>
	            <h2>NEIGHBORHOOD MAP</h2>

	            <div role="application">
	                <LocationList key="100" AdilLocations={this.state.AdilLocations} openInfoWindow={this.openInfoWindow}
	                              closeInfoWindow={this.closeInfoWindow}/>
	                <div id="map"></div>
	            </div>
			</div>
		)
	}
}
window.gm_authFailure = function() {
   alert('Google maps failed to load!');
}

export default MyMapContainer

function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}