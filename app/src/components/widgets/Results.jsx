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
        var num_intersected_polys = this.props.num_intersected_polys;
        var intersected_area = this.props.intersected_area;
        return <div>
            <Subtitle style={letterstyle}>Results</Subtitle>
            {num_intersected_polys && <p>Total number of parcels inside the study area is: {num_intersected_polys}</p>}
            {intersected_area && <p>Total area is: {intersected_area} square meters.</p>}
        </div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Results);