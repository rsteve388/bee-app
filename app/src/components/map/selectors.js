// import * as actions from '../../store/actions'
import * as actions from '../../store/actions'


export const mapStateToProps = (state) => {
    const data = state.data;
    const use_area = data.use_area;
    const intersected_polys = data.intersected_polys;
    return {
        use_area,
        intersected_polys
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        addNewAreaDB: (newArea) => {
          dispatch(actions.addAreaDB(newArea))
        }
    }
}
