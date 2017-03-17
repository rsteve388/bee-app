import React, { Component } from 'react';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import { connect } from 'react-redux';
import { Modal, Content, Button } from 're-bulma';


//Load the db from a file path and populate the main store
class ConnectDB extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalState: true
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.getpath = this.getpath.bind(this)
    }

    toggleModal() {
        this.setState({
            modalState: !this.state.modalState
        })
    }

    getpath() {
        const path = document.getElementById("fileDB").files[0].path
        this.props.loadDBFromDisk(path)
        this.toggleModal()
    }

    render (){
        // this.props.loadDBFromDisk()
        return <div className="navbar-icon title">
        <i className="navbar-icon fa fa-database fa-2x" onClick={this.toggleModal}/>
            <Modal
                type="card"
                headerContent="Connect to a Database"
                isActive={this.state.modalState}
                onCloseRequest={() => this.setState({ modalState: false })}
            >
                <Content>
                    Choose SQLite Database: <input id="fileDB" type="file"/>
                    <br />
                    <br />
                    <Button color="isSuccess" onClick={this.getpath}>Load Database</Button>
                </Content>
            </Modal>
            </div>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDB);