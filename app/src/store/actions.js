/**
 * Created by ricardooliveira on 2/26/17.
 */
import * as t from './action-types';

import * as sql from 'sql.js';

const electron = window.require('electron');
const fs = electron.remote.require('fs');


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

export const updatePlacement = (id, val) => {
    return {
        type: t.UPDATE_PLACEMENT,
        update: {id: id,
                val: val}
    }
}

export const connectDatabase = (path) => {
    console.log('initiated db upload!')
    // console.log(path)
    const fileBuffer = fs.readFileSync(path)
    const db = new sql.Database(fileBuffer)
    var flowerTable = db.exec('select * from flowers;')
    var areaTable = db.exec('select * from study_areas;')


    // console.log(res)
    return {
        type: t.CONNECT_DATABASE,
        dbData: [flowerTable, areaTable]
    }
}