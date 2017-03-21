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

let layer;
class MainMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editModal: false,
            newAreaName: '',
            newAreaDescription: '',
            newAreaGeom: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleNewGeometry = this.handleNewGeometry.bind(this)
        this.submitArea = this.submitArea.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this._onCreate = this._onCreate.bind(this)
    }

    handleNameChange(event) {
        this.setState({newAreaName: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({newAreaDescription: event.target.value});
    }

    handleNewGeometry(event) {
        this.setState({newAreaGeom: event});
    }

    submitArea() {
        const newAreaNameVal = this.state.newAreaName
        const newAreaDescriptionVal = this.state.newAreaDescription
        const newAreaGeomVal = this.state.newAreaGeom

        this.props.addNewAreaDB({newAreaNameVal, newAreaDescriptionVal, newAreaGeomVal})
    }

    toggleModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }

    _onCreate(e) {
        layer = e.layer
        this.toggleModal()
        console.log(JSON.stringify(layer.toGeoJSON()))
        this.handleNewGeometry(JSON.stringify(layer.toGeoJSON()))
        console.log(this.state)
    }

    _onEditPath(e) {
        console.log('Path edited !');
    }

    render() {
        return (
            <div className='map-wrapper'>
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
                      <Popup isOpen='true'>
                                <Content>
                                <Label>Area Name</Label>
                                <Input type="text" placeholder="Arena Name" onChange={this.handleNameChange}/>
                                <Label>Study Area Description</Label>
                                <Input type="text" placeholder="Study Area Description" onChange={this.handleDescriptionChange}/>
                                <Button color="isSuccess" onClick={this.submitArea}>Add Area</Button>
                            </Content>
                        </Popup>
                    </FeatureGroup>
                </Map>
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMap);
