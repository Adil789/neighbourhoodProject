import React, {Component} from 'react';
import LocationItem from './LocationItem';


class LocationList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            'locations': '',
            'query': '',
            'suggestions': true,
        };

        this.filterLocations = this.filterLocations.bind(this);
        this.toggleSuggestions = this.toggleSuggestions.bind(this);
    }

     // it is based on filter location of query
     
    filterLocations(event) {
        this.props.closeInfoWindow();
        const {value} = event.target;
        var locations = [];
        this.props.AdilLocations.forEach(function (location) {
            if (location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                location.marker.setVisible(true);
                locations.push(location);
            } else {
                location.marker.setVisible(false);
            }
        });

        this.setState({
            'locations': locations,
            'query': value
        });
    }

    componentWillMount() {
        this.setState({
            'locations': this.props.AdilLocations
        });
    }
     // Show and hide suggestions
     
    toggleSuggestions() {
        this.setState({
            'suggestions': !this.state.suggestions
        });
    }

    // Render function of LocationList
     
    render() {
        var locationlist = this.state.locations.map(function (listItem, index) {
            return (
                <LocationItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
                 );
        }, this);

        return (

            <div className="saw">
            <button className="Plug" onClick={this.toggleSuggestions}>=</button>
                    <input role="saw" aria-labelledby="Search Here" id="saw-field" className="saw-field" type="text" placeholder="Search Here"
                        value={this.state.query} onChange={this.filterLocations}/>
                <ul className="Lists">
                    {this.state.suggestions && locationlist}
                </ul>
                
            </div>
        );
    }
}

export default LocationList;