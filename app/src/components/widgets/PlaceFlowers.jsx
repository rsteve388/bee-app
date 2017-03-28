import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import {Subtitle, Notification, Button, Menu, MenuList} from 're-bulma';
import Slider from 'rc-slider';

import './Widgets.css'
import '../../../node_modules/rc-slider/assets/index.css';


class PlaceFlowers extends Component{
    constructor(props){
        super(props)
        this.state = {
            totalPlacement: 0
        }
        this.runSimulation = this.runSimulation.bind(this)
    }

    runSimulation() {
        let choseFlowers = this.props.use_plants
        let choseArea = this.props.use_area

        console.log(choseFlowers, choseArea)
    }

    componentWillReceiveProps(nextProps) {
        let sumPlacement = 0;
        nextProps.use_plants.forEach((plant) => {
            sumPlacement += parseFloat(plant.plant_placement)
        })

        this.setState({totalPlacement: sumPlacement})

    }

    render(){
        var letterstyle = {color: "white"}
        const use_plants = this.props.use_plants.map((plant) => {
            return <li key={"place-flower-"+plant.plant_id}>
                <label>
                {plant.plant_name}: {plant.plant_placement} %
                </label>

                <Slider dots step={5} min={0} max={100} defaultValue={50} onAfterChange={this.props.updateFlowerPlacement.bind(this, plant.plant_id)} key={"place-flower-slider-"+plant.plant_id}/>

            </li>
        })
        return <div>
        <Subtitle style={letterstyle}>3. Flower Placement</Subtitle>
            <Menu>
                <MenuList>
                    <ul>
                        {use_plants}
                    </ul>
                </MenuList>
            </Menu>
            {this.state.totalPlacement > 100 ?
                <Notification color="isDanger" className="placement-notification" size="is6">Sum of all flowers exceed 100% of available land, please alter the placement.</Notification> :
                <Button color="isSuccess" className="run-btn" onClick={this.runSimulation}>Run Simulation</Button>}
            </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceFlowers);