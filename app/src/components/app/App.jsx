import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import Map from '../map/Map';
import FlowersList from '../widgets/FlowersList';
import StudyAreasList from '../widgets/StudyAreaList';
import PlaceFlowers from '../widgets/PlaceFlowers';
import ConnectDB from '../widgets/ConnectDB';
import {Tile, Title, Subtitle} from 're-bulma'

import './App.css';

class App extends Component {


  render() {
    var style = {borderRadius: '5px', padding: '10px', position: 'relative'};
    var letterstyle = {color: "white"}

    return (
      <div className="App">
          <header className="navbar navbar-default header">
              {/*<div className="title">Bee Caring Capacity</div>*/}
              <Title className="title">BEE CARRYING CAPACITY</Title>
            <ConnectDB className="navbar-icon"/>
            {/*<i className="navbar-icon fa fa-database fa-2x title"/>*/}
          </header>

        <Tile context="isAncestor" className="tile-main">
          <Tile isVertical size="is12">
            <Tile>
              <Tile context="isParent" size="is6">
                <Tile context="isChild" style={style} className="input-tile">
                    <Subtitle style={letterstyle}>Region of Study</Subtitle>
                    <Map/>
                </Tile>
              </Tile>
              <Tile isVertical>

                <Tile>
                  <Tile context="isParent" size="is6">
                    <Tile context="isChild" style={style} className="input-tile">
                      <StudyAreasList/>
                    </Tile>
                  </Tile>
                  <Tile context="isParent" size="is6">
                    <Tile context="isChild" style={style} className="input-tile">
                      <FlowersList/>
                    </Tile>
                  </Tile>
                </Tile>

                <Tile>
                  <Tile context="isParent" size="is6">
                    <Tile context="isChild" style={style} className="input-tile">
                      <PlaceFlowers/>
                    </Tile>
                  </Tile>
                  <Tile context="isParent" size="is6">
                    <Tile context="isChild" style={style} className="result-tile">
                      <Subtitle style={letterstyle}>Results</Subtitle>
                    </Tile>
                  </Tile>
                </Tile>


              </Tile>
            </Tile>
          </Tile>
        </Tile>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
