import * as actions from '../../store/actions'
import _ from 'lodash'

export const mapStateToProps = (state) => {
    const plants_list_arr = [];
    const areas_list_arr = [];

    state.data.plants.forEach((plant) =>
        plants_list_arr.push(plant)
    )

    state.data.study_areas.forEach((area) =>
        areas_list_arr.push(area)
    )

    const use_plants =  state.data.use_plants;
    const use_area = state.data.use_area;

    return {
        plants_list: plants_list_arr,
        areas_list: areas_list_arr,
        use_plants,
        use_area
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        toggleFlower: (e) => {
            const flower = e.target.id;
            //TODO: alter logic so it doens't depend on the e.target.checked to decide which action to dispatch
            dispatch(e.target.checked ? actions.addFlower(flower) : actions.removeFlower(flower))
        },

        toggleArea: (e) => {
            console.log(e.target)
            const area = e.target.id;
            dispatch(e.target.checked ? actions.addArea(area) : actions.removeArea(area))
        },

        updateFlowerPlacement: (val, id) => {
            dispatch(actions.updatePlacement(val, id))
        },

        loadDBFromDisk: (path) => {
            dispatch(actions.connectDatabase(path))
        },

        addNewFlowerDB: (newFlower) => {
          dispatch(actions.addFlowerDB(newFlower))
        },

        removeFlowerDB: (flowerID) => {
          dispatch(actions.removeFlowerDB(flowerID))
        },

        addNewAreaDB: (newArea) => {
          dispatch(actions.addAreaDB(newArea))
        },

        removeAreaDB: (areaID) => {
            dispatch(actions.removeAreaDB(areaID))
        }
    }
}
