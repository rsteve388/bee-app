import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'

class MainMap extends Component{
    render (){
        return (<Map className='Map' center={[39.739800, -104.911276]} zoom={10} zoomControl={false}>
                <ZoomControl position='topright'/>
            <TileLayer url="http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
                       attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
        </Map>

        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);