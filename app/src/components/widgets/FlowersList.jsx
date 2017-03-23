import React, {Component} from 'react';
import {mapStateToProps, mapDispatchToProps} from './selectors';
import {connect} from 'react-redux';
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

import './Widgets.css'

class FlowersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addModalState: false,
            newFlowerIndex: '',
            newFlowerName: '',
            newFlowerRadius: ''
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.submitNewFlower = this.submitNewFlower.bind(this)
        this.deleteFlower = this.deleteFlower.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleIndexChange = this.handleIndexChange.bind(this)
        this.handleRadiusChange = this.handleRadiusChange.bind(this)
    }

    toggleModal() {
        this.setState({
            addModalState: !this.state.addModalState
        })
    }

    deleteFlower(e) {
        console.log(e)
        this.props.removeFlowerDB(e)
    }

    submitNewFlower() {
        const newFlowerNameVal = this.state.newFlowerName
        const newFlowerIndexVal = this.state.newFlowerIndex
        const newFlowerRadiusVal = this.state.newFlowerRadius

        this.props.addNewFlowerDB({newFlowerNameVal, newFlowerIndexVal, newFlowerRadiusVal})

        this.setState({
            addModalState: !this.state.addModalState
        })
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

    render() {
        var letterstyle = {
            color: "white"
        };

        const plants = this.props.plants_list.map((plant) => {
            return <li key={'flower_' + plant.plant_id} className="input-item" id={plant.plant_id} onClick={this.props.toggleFlower}>
                <input type="checkbox" checked={(this.props.use_plants.length == 0
                    ? false
                    : this.props.use_plants.forEach((plantOnList) => (plantOnList.plant_id == plant.plant_id)))} id={plant.plant_id}/>
                <label id={plant.plant_id}>{plant.plant_name}</label>
                <i className="fa fa-times-circle delete-icon" onClick={this.deleteFlower.bind(this, plant.plant_id)}/>
            </li>
        })

        return <div>
            <Modal type="card" headerContent="Add a new flower to the Database" isActive={this.state.addModalState} onCloseRequest={() => this.setState({addModalState: false})}>
                <Content>
                    <Label>Flower Name</Label>
                    <Input type="text" placeholder="Flower Name" onChange={this.handleNameChange}/>
                    <Label>Flower Index</Label>
                    <Input type="number" placeholder="Flower Index" onChange={this.handleIndexChange}/>
                    <Label>Flower Radius</Label>
                    <Input type="number" placeholder="Flower Radius" onChange={this.handleRadiusChange}/>
                    <Button color="isSuccess" onClick={this.submitNewFlower.bind(this)}>Add Flower</Button>
                </Content>
            </Modal>
            <Subtitle style={letterstyle}>2. Flower List</Subtitle>
            <div className="menu-list">
                <Menu>
                    <MenuList>{plants}</MenuList>
                </Menu>
            </div>
            <Button color="isPrimary" className="add-btn" onClick={this.toggleModal}>Add Flower</Button>
        </div>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowersList);
