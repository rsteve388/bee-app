// import * as actions from '../../store/actions'
import * as actions from '../../store/actions'


export const mapStateToProps = (state) => {
    const data = state.data;
    return {
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        addNewAreaDB: (newArea) => {
          dispatch(actions.addAreaDB(newArea))
        }
    }
}
