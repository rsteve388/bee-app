import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import { Menu, MenuList, Checkbox, Subtitle} from 're-bulma';

import './Widgets.css'


class StudyAreasList extends Component{

    render(){
        var letterstyle = {color: "white"}
        const areas = this.props.areas_list.map((area) =>
            <li key={"study_area_" + area.area_id}>
                <input type="checkbox" />
                <label id={area.areas_id}>{area.study_area}</label>
            </li>)
        return <div>
        <Subtitle style={letterstyle}>1. Study Areas</Subtitle>

        <Menu >
            <MenuList>
            <ul>
                {areas}
            </ul>
            </MenuList>
            </Menu>

        </div>

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyAreasList);
