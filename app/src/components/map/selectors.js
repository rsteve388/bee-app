// import * as actions from '../../store/actions'
import * as actions from '../../store/actions'


export const mapStateToProps = (state) => {
    const data = state.data;

    const use_area = data.use_area;

    return {
        use_area
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        addNewAreaDB: (newArea) => {
          dispatch(actions.addAreaDB(newArea))
        }
    }
}
