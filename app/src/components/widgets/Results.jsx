import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import { Subtitle } from 're-bulma';


//Load the db from a file path and populate the main store
class Results extends Component{

    render (){
        var letterstyle = {
            color: "white"
        };
        return <div>
            <Subtitle style={letterstyle}>Results</Subtitle>
            <p>Total number of parcels inside the study area is: {this.props.num_intersected_polys}</p>
            <p>Total area is: {this.props.intersected_area}</p>
        </div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Results);