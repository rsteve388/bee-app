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
            addModalState: false
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            addModalState: !this.state.addModalState
        })
    }

    render() {
        var letterstyle = {
            color: "white"
        };

        const plants = this.props.plants_list.map((plant) => {
            return <li key={'flower_' + plant.plant_id} className="flower-item" id={plant.plant_id} onClick={this.props.toggleFlower}>
                <input type="checkbox"  checked={(this.props.use_plants.length == 0
                    ? false
                    : this.props.use_plants.forEach((plantOnList) => (plantOnList.plant_id == plant.plant_id)))} id={plant.plant_id}/>
                  <label id={plant.plant_id}>{plant.plant_name}</label>
                <i className="fa fa-times-circle delete-icon" />
            </li>
        })

        return <div>
            <Modal type="card" headerContent="Add a new flower to the Database" isActive={this.state.addModalState} onCloseRequest={() => this.setState({addModalState: false})}>
                <Content>
                    <Label>Flower Name</Label>
                    <Input type="text" placeholder="Text input"/>
                    <Label>Flower Index</Label>
                    <Input type="number" placeholder="Text input"/>
                    <Button color="isSuccess" onClick={this.getpath}>Add Flower</Button>
                </Content>
            </Modal>
            <Subtitle style={letterstyle}>2. Flower List</Subtitle>
            <Menu>
                <MenuList>
                    <ul>
                        {plants}
                    </ul>
                </MenuList>
            </Menu>
            <Button color="isPrimary" className="add-btn" onClick={this.toggleModal}>Add Flower</Button>
        </div>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowersList);
