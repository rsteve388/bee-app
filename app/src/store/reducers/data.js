import * as t from '../action-types';

import * as sql from 'sql.js';
import Intersect from 'turf-intersect';
import Area from 'turf-area';
import * as turf from 'turf';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const initialData = {
    plants: [],
    study_areas: [],
    use_plants: [],
    use_area: [],
    intersected_polys: null,
    intersected_area: null,
    errorModal: false
};

export default (state = initialData, action) => {
    switch (action.type) {
        case t.ADD_FLOWER:
            console.log(state)
            const newPlant = state.plants.filter(o => o.plant_id.toString() === action.flower.toString())
            console.log(newPlant)
            newPlant["0"].plant_placement = '50'

            return {
                ...state,
                use_plants: [...state.use_plants, newPlant[0]]
            };

        case t.REMOVE_FLOWER:
            const afterRemoved = state.use_plants.filter(o => o.plant_id.toString() !== action.flower.toString())

            return {
                ...state,
                use_plants: afterRemoved
            };

        case t.UPDATE_PLACEMENT:
            const plantToUpdate = state.use_plants.filter(o => o.plant_id.toString() === action.update.id.toString())
            plantToUpdate["0"].plant_placement = action.update.val

            return {
                ...state,
                use_plants: state.use_plants.map((plant) => plant.plant_id.toString() === action.update.id.toString() ? { ...plant,
                    plant_placement: action.update.val
                } : plant)
            };

        case t.ADD_AREA:
            const newArea = state.study_areas.filter(o => o.area_id.toString() === action.area.toString())

            return {
                ...state,
                use_area: newArea
            };

        case t.CONNECT_DATABASE:
            const fileBuffer = fs.readFileSync(action.dbDataPath)
            const db = new sql.Database(fileBuffer)
            const dbPath = action.dbDataPath

            const parsedData = parseDB(db, dbPath)

            return {
                ...state,
                dbObj: db,
                dbPath,
                plants: parsedData[0],
                study_areas: parsedData[1],
            };

        case t.CONNECT_GEOJSON:
            const geoJSONFile = fs.readFileSync(action.geoJSONDataPath, 'utf8');

            const parsedGeoJSON = JSON.parse(geoJSONFile);

            // console.log(parsedGeoJSON)

            return {
                ...state,
                parsedGeoJSON
            };


        case t.ADD_FLOWER_DB:
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
            var loadedDB = state.dbObj
            var loadedDBPath = state.dbPath

            try {
                loadedDB.run("DELETE FROM flowers WHERE plant_id = :id", {
                    ':id': action.flowerId
                });
            } catch (err){
                var fileBuffer = fs.readFileSync(state.dbPath)
                var newDB = new sql.Database(fileBuffer)
                newDB.run("DELETE FROM flowers WHERE plant_id = :id", {
                    ':id': action.flowerId
                });
            }

            fs.writeFile(loadedDBPath, loadedDB.export())

            loadedDB.close()

            var fileBuffer = fs.readFileSync(state.dbPath)
            var newDB = new sql.Database(fileBuffer)

            var parsedData = parseDB(newDB, loadedDBPath)

            return {
                ...state,
                dbObj: newDB,
                plants: parsedData[0],
                study_areas: parsedData[1],
                use_plants: [],
                use_area: []
            };

        case t.ADD_AREA_DB:
            var loadedDB = state.dbObj
            var loadedDBPath = state.dbPath

            const newAreaNameVal = action.newArea.newAreaNameVal
            const newAreaDescriptionVal = action.newArea.newAreaDescriptionVal
            const newAreaGeomVal = action.newArea.newAreaGeomVal

            loadedDB.run("INSERT INTO study_areas (study_area, study_descr, geom) VALUES (:name, :descr, :geom)", {
                ':name': newAreaNameVal,
                ':descr': newAreaDescriptionVal,
                ':geom': newAreaGeomVal
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

        case t.REMOVE_AREA_DB:
            var loadedDB = state.dbObj
            var loadedDBPath = state.dbPath

            loadedDB.run("DELETE FROM study_areas WHERE area_id = :id", {
                ':id': action.areaId
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
                use_plants: [],
                use_area: []
            };

        case t.RUN_SIMULATION:
            var params = action.params

            let intersection = runSimulation(params, state)

            return{
                ...state,
                intersected_polys: intersection[0],
                intersected_area: intersection[1]
            }

        default:
            return state
    }
}

function parseDB (db, dbPath){
    // var flowerTable = db.exec('select * from flowers;')
    // var areaTable = db.exec('select * from study_areas;')

    try {
        var flowerTable = db.exec('select * from flowers;')
        var areaTable = db.exec('select * from study_areas;')
    } catch (err) {
        console.log('error catched, reconnect to the db! Error: ' + err)
        var loadedDBPath = dbPath
        var fileBuffer = fs.readFileSync(loadedDBPath)
        var reloadedDB = new sql.Database(fileBuffer)
        var flowerTable = reloadedDB.exec('select * from flowers;')
        var areaTable = reloadedDB.exec('select * from study_areas;')
    }


    const allFlowers = []
    const allAreas = []

    if(flowerTable.length > 0) {
        const flower_cols = flowerTable[0].columns
        const flower_rows = flowerTable[0].values


        flower_rows.map((record) => {
            var obj = {}
            obj[flower_cols[0]] = record[0]
            obj[flower_cols[1]] = record[1]
            obj[flower_cols[2]] = record[2]
            obj[flower_cols[3]] = record[3]
            allFlowers.push(obj)
        })
    }

    if (areaTable.length > 0) {
        const area_cols = areaTable[0].columns
        const area_rows = areaTable[0].values


        area_rows.map((record) => {
            var obj = {}
            obj[area_cols[0]] = record[0]
            obj[area_cols[1]] = record[1]
            obj[area_cols[2]] = record[2]
            obj[area_cols[3]] = record[3]
            allAreas.push(obj)
        })
    }

  return [allFlowers, allAreas]
}

function runSimulation (params, state) {
    var studyArea = params.choseArea
    var flowers = params.choseFlowers

    //INTERSECT study_area against parcels and calc total area
    var studyAreaGeomFeature = JSON.parse(studyArea[0].geom)

    var parcel = state.parsedGeoJSON
    var parcelFeatures = parcel.features

    console.log(parcelFeatures.length)

    var conflictlist = [];
    parcelFeatures.forEach( (feature) => {
        var conflict = Intersect(feature, studyAreaGeomFeature);
        if (conflict != null) {
            conflictlist.push(conflict);
        }
    });

    var intersectiontest = turf.featureCollection(conflictlist);

    var areaSqMeters = Area(intersectiontest)

    //Generate geometries for each plant based on the plant_radius

    //Do some magic to get final score

    return [intersectiontest, areaSqMeters]
}