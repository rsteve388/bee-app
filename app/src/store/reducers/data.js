import * as t from '../action-types';

const initialData = {
    plants: [],
    study_areas: [],
    use_plants: [],
    modalState: true
};

export default (state = initialData, action) => {
    switch (action.type) {
        case t.ADD_FLOWER:
            const newPlant = state.plants.filter(o => o.plant_id == action.flower)
            newPlant["0"].plant_placement =  '50'

             return  {
                 ...state,
                 use_plants:[...state.use_plants, newPlant[0]]
             };

        case t.REMOVE_FLOWER:
            const afterRemoved = state.use_plants.filter(o => o.plant_id != action.flower)

            return {
                ...state,
                use_plants: afterRemoved
            };

        case t.UPDATE_PLACEMENT:
            const plantToUpdate = state.use_plants.filter(o => o.plant_id == action.update.id)
            const newArray = state.use_plants.filter(o => o.plant_id != action.update.id)
            plantToUpdate["0"].plant_placement = action.update.val

            return {
                ...state,
                use_plants: state.use_plants.map((plant) => plant.plant_id == action.update.id ? {...plant, plant_placement: action.update.val} : plant )
            };

        case t.CONNECT_DATABASE:
            console.log(action.dbData[0])
            console.log(action.dbData)

            const flower_cols = action.dbData[0][0].columns
            const flower_rows = action.dbData[0][0].values
            const allFlowers = []

            flower_rows.map((record) => {
                var obj = {}
                obj[flower_cols[0]] = record[0]
                obj[flower_cols[1]] = record[1]
                obj[flower_cols[2]] = record[2]
                obj[flower_cols[3]] = record[3]
                allFlowers.push(obj)

            })

            const area_cols = action.dbData[1][0].columns
            const area_rows = action.dbData[1][0].values
            const allAreas = []

            area_rows.map((record) => {
                var obj = {}
                obj[area_cols[0]] = record[0]
                obj[area_cols[1]] = record[1]
                obj[area_cols[2]] = record[2]
                obj[area_cols[3]] = record[3]
                allAreas.push(obj)

            })



            return{
                ...state,
                plants: allFlowers,
                study_areas: allAreas
            }

        default:
            return state
    }
}