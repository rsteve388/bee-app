import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import { Menu, MenuList, Subtitle} from 're-bulma';


import './Widgets.css'


class FlowersList extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var letterstyle = {color: "white"};

        const plants = this.props.plants_list.map((plant) => {
            return <li key={plant.plant_id}>
                <input
                    type="checkbox"
                    id={plant.plant_id}
                    checked={(this.props.use_plants.length == 0 ? false : this.props.use_plants.forEach((plantOnList) => (plantOnList.plant_id == plant.plant_id)))}
                    onChange={this.props.toggleFlower}/>
                    <label>{plant.plant_name}</label>
            </li>
        })

        return <div>
        <Subtitle style={letterstyle}>2. Flower List</Subtitle>
        <Menu>
            <MenuList>
                <ul>
                    {plants}
                </ul>
            </MenuList>
        </Menu>
            </div>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowersList);