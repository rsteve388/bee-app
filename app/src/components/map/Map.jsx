import React, {Component} from 'react';
import {mapStateToProps, mapDispatchToProps} from './selectors';
import {connect} from 'react-redux';
import {Map, TileLayer, ZoomControl, FeatureGroup, Popup} from 'react-leaflet';
import {EditControl} from "react-leaflet-draw"
import {
    Menu,
    MenuList,
    Subtitle,
    Button,
    Modal,
    Content,
    Label,
    Input
} from 're-bulma';

import './Map.css';
import '../../../node_modules/leaflet/dist/leaflet.css'
import '../../../node_modules/leaflet-draw/dist/leaflet.draw.css'

class MainMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newFlowerIndex: '',
            newFlowerName: '',
            newFlowerRadius: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleIndexChange = this.handleIndexChange.bind(this)
        this.handleRadiusChange = this.handleRadiusChange.bind(this)
        this.test = this.test.bind(this)
    }

    handleNameChange(event) {
        this.setState({newFlowerName: event.target.value});
    }

    handleIndexChange(event) {
        this.setState({newFlowerIndex: event.target.value});
    }

    handleRadiusChange(event) {
        this.setState({newFlowerRadius: event.target.value});
    }

    test(e) {
        console.log('test')
    }

    _onCreate(e) {
        var layer = e.layer

        layer.bindPopup(
            "<button onClick={this.test.bind(this)}>test</button>"
        ).openPopup()
    }

    _onEditPath(e) {
        console.log('Path edited !');
    }

    render() {
        return (
            <Map className='Map' center={[39.739800, -104.911276]} zoom={10} zoomControl={false}>
                <ZoomControl position='topright'/>
                <TileLayer url="http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png" attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'/>
                <FeatureGroup>
                    <EditControl position='topright' onEdited={this._onEditPath} onCreated={this._onCreate} onDeleted={this._onDeleted} draw={{
                        polygon: false,
                        circle: false,
                        polyline: false,
                        marker: false
                    }}/>
                </FeatureGroup>
            </Map>

        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
