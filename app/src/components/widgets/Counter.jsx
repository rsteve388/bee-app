import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Widgets.css'

class Counter extends Component{
    constructor(props) {
        super(props);
        this.state = {
            busDescr: false,
            railDescr: false
        }
        this.showBusDescr = this.showBusDescr.bind(this)
        this.showRailDescr = this.showRailDescr.bind(this)
    }

    showBusDescr(){
        this.setState({
            busDescr: !this.state.busDescr
        })
    }

    showRailDescr(){
        this.setState({
            railDescr: !this.state.railDescr
        })
    }

    render () {
        return (<div>

            <div className="widget">
                <div className="widget-icon" onMouseEnter={this.showBusDescr} onMouseLeave={this.showBusDescr}>
                    <i className="fa fa-bus fa-2x"/>
                    <p className="vehicle-count">{this.props.busCount}</p>
                </div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                {this.state.busDescr &&
                    <div className="widget-pane" key="pane-bus">
                        <div className="widget-pane-info">
                            This number represents the total number of buses currently in operation.
                        </div>
                    </div>
                }
                </ReactCSSTransitionGroup>

            </div>



        <div className="widget">
            <div className="widget-icon" onMouseEnter={this.showRailDescr} onMouseLeave={this.showRailDescr}>
                <i className="fa fa-train fa-2x"/>
                <p className="vehicle-count">{this.props.railCount}</p>
            </div>
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                {this.state.railDescr &&
                <div className="widget-pane" key="pane-rail">
                    <div className="widget-pane-info">
                        This number represents the total number of trains currently in operations. It does not include the A, B and G lines.
                    </div>
                </div>
                }
            </ReactCSSTransitionGroup>

            </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);