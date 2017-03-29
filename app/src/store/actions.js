/**
 * Created by ricardooliveira on 2/26/17.
 */
import * as t from './action-types';

export const addFlower = (flower) => {
    return {
        type: t.ADD_FLOWER,
        flower
    }
};

export const removeFlower = (flower) => {
    return {
        type: t.REMOVE_FLOWER,
        flower
    }
};

export const addArea = (area) => {
    return {
        type: t.ADD_AREA,
        area
    }
};

export const removeArea = (area) => {
    return {
        type: t.REMOVE_AREA,
        area
    }
};

export const updatePlacement = (id, val) => {
    return {
        type: t.UPDATE_PLACEMENT,
        update: {
            id: id,
            val: val
        }
    }
};

export const connectDatabase = (path) => {
    return {
        type: t.CONNECT_DATABASE,
        dbDataPath: path
    }
};

export const connectGeoJSON = (path) => {
    return {
        type: t.CONNECT_GEOJSON,
        geoJSONDataPath: path
    }
};

export const addFlowerDB = (newFlower) => {
    const newFlowerVals = newFlower

    return {
        type: t.ADD_FLOWER_DB,
        newFlowerVals
    }
};

export const removeFlowerDB = (flowerId) => {
    console.log('flower to be removed: ' + flowerId)

    return {
        type: t.REMOVE_FLOWER_DB,
        flowerId
    }
};

export const addAreaDB = (newArea) => {
    console.log('area to be added: ' + newArea)

    return {
        type: t.ADD_AREA_DB,
        newArea
    }
};

export const removeAreaDB = (areaId) => {
    console.log('area to be removed: ' + areaId)

    return {
        type: t.REMOVE_AREA_DB,
        areaId
    }
};

export const runSimulation = (params) => {
    console.log('running simulation for the following params:' + params)

    return {
        type: t.RUN_SIMULATION,
        params
    }
}