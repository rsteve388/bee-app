import React, {Component} from 'react';
import {mapStateToProps, mapDispatchToProps} from './selectors';
import {connect} from 'react-redux';
import {Menu, MenuList, Checkbox, Subtitle} from 're-bulma';

import './Widgets.css'

class StudyAreasList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.deleteArea = this.deleteArea.bind(this)
    }

    deleteArea(e) {
        console.log(e)
        this.props.removeAreaDB(e)
    }

    render(){
        var letterstyle = {color: "white"}
        const areas = this.props.areas_list.map((area) =>
            <li key={"study_area_" + area.area_id} className="input-item">
                <input type="checkbox" />
                <label id={area.areas_id}>{area.study_area}</label>
                <i className="fa fa-times-circle delete-icon" onClick={this.deleteArea.bind(this, area.area_id)}/>
            </li>)
        return <div>
        <Subtitle style={letterstyle}>1. Study Areas</Subtitle>

            <div className="menu-list" id="area-list">
                <Menu>
                    <MenuList>{areas}</MenuList>
                </Menu>
            </div>
          </div>
        }
      }

      export default connect(mapStateToProps, mapDispatchToProps)(StudyAreasList);
