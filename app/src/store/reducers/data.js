import * as t from '../action-types';

import * as sql from 'sql.js';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

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
            newPlant["0"].plant_placement = '50'

            return {
                ...state,
                use_plants: [...state.use_plants, newPlant[0]]
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
                use_plants: state.use_plants.map((plant) => plant.plant_id == action.update.id ? { ...plant,
                    plant_placement: action.update.val
                } : plant)
            };

        case t.CONNECT_DATABASE:
            const fileBuffer = fs.readFileSync(action.dbDataPath)
            const db = new sql.Database(fileBuffer)
            const dbObj = db
            const dbPath = action.dbDataPath

            const parsedData = parseDB(db)

            return {
                ...state,
                dbObj: db,
                dbPath,
                plants: parsedData[0],
                study_areas: parsedData[1],
            };


        case t.ADD_FLOWER_DB:
            console.log(state)
            let loadedDB = state.dbObj
            let loadedDBPath = state.dbPath

            const newFlowerNameVal = action.newFlowerVals.newFlowerNameVal
            const newFlowerIndexVal = action.newFlowerVals.newFlowerIndexVal
            const newFlowerRadiusVal = action.newFlowerVals.newFlowerRadiusVal

            loadedDB.run("INSERT INTO flowers (plant_name, plant_index, plant_radius) VALUES (:name, :index, :radius)", {
                ':name': newFlowerNameVal,
                ':index': newFlowerIndexVal,
                ':radius': newFlowerRadiusVal
            });



            //TODO: this is an ugly hack to persist the data. It works, though...
            fs.writeFile(loadedDBPath, loadedDB.export())

            loadedDB.close()

            var fileBuffer = fs.readFileSync(state.dbPath)
            var newDB = new sql.Database(fileBuffer)
            var parsedData = parseDB(newDB)

            return {
                ...state,
                dbObj: newDB,
                plants: parsedData[0],
                study_areas: parsedData[1],
            };

        case t.REMOVE_FLOWER_DB:
            console.log(state)
            var loadedDB = state.dbObj
            var loadedDBPath = state.dbPath

            loadedDB.run("DELETE FROM flowers WHERE plant_id = :id", {
                ':id': action.flowerId
            });

            fs.writeFile(loadedDBPath, loadedDB.export())

            loadedDB.close()

            var fileBuffer = fs.readFileSync(state.dbPath)
            var newDB = new sql.Database(fileBuffer)
            var parsedData = parseDB(newDB)

            return {
                ...state,
                dbObj: newDB,
                plants: parsedData[0],
                study_areas: parsedData[1],
            };


        default:
            return state
    }
}

function parseDB (db){
  console.log(db)

  var flowerTable = db.exec('select * from flowers;')
  var areaTable = db.exec('select * from study_areas;')
  const flower_cols = flowerTable[0].columns
  const flower_rows = flowerTable[0].values
  const allFlowers = []

  flower_rows.map((record) => {
      var obj = {}
      obj[flower_cols[0]] = record[0]
      obj[flower_cols[1]] = record[1]
      obj[flower_cols[2]] = record[2]
      obj[flower_cols[3]] = record[3]
      allFlowers.push(obj)
  })

  const area_cols = areaTable[0].columns
  const area_rows = areaTable[0].values
  const allAreas = []

  area_rows.map((record) => {
      var obj = {}
      obj[area_cols[0]] = record[0]
      obj[area_cols[1]] = record[1]
      obj[area_cols[2]] = record[2]
      obj[area_cols[3]] = record[3]
      allAreas.push(obj)
  })

  return [allFlowers, allAreas]
}
