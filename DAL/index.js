const { states } = require('../constants');
const pg = require('../db/pool');





async function getRows(pid) {
    try {
        const query = `
        UPDATE statemachine
        SET pid = $1
        WHERE  id in (
        SELECT id
        FROM  statemachine
        WHERE pid is null
        and state not in ($2,$3)
        LIMIT 10
        FOR UPDATE SKIP LOCKED
        )
        RETURNING *
        `;
        const params = [pid,states.FAILED,states.PROCESSED];
        const { rows } = await pg.query(query, params)
        return rows
    }
    catch (error) {
        console.log("🚩 ~ file: index.js ~ line 11 ~ getRows ~ error", error)
    }

}
async function releaseRow(pid) {
    try {
        const query = `UPDATE statemachine SET pid = null where pid = $1 and state != $2 or (state = $2 and extract("SEC" from now() - lastupdate) > $3 and pid = $1)`;
        const params = [pid,states.BIGPROCESS,100];
        const { rows } = await pg.query(query, params)
        return rows
    }
    catch (error) {
        console.log("🚩 ~ file: index.js ~ line 11 ~ getRows ~ error", error)
    }

}

async function setErrorRow(id,errorMessage){

    try {
        const query = `update statemachine set pid = null , state = $2, error = true , message = $3 where id = $1`;
        const params = [id,states.FAILED,errorMessage];
        const { rows } = await pg.query(query, params)
        return rows
    }
    catch (error) {
        console.log("🚩 ~ file: index.js ~ line 11 ~ getRows ~ error", error)
    }
}

async function updateRow(id,state,data,message,error,response){
    try {
        const query = `update statemachine set pid = null , state = $2, error = $5 ,data=$3, message = $4,response=$6,lastupdate=now() where id = $1`;
        const params = [id,state,data,message,error,response];
        const { rows } = await pg.query(query, params)
        return rows
    }
    catch (error) {
        console.log("🚩 ~ file: index.js ~ line 11 ~ getRows ~ error", error)
    }
}

async function retryRow() {
    try {
        const query = `UPDATE statemachine SET pid = null where state != $1 or (state = $1 and extract("SEC" from now() - lastupdate) > $2 )`;
        const params = [states.BIGPROCESS,100];
        const { rows } = await pg.query(query, params)
        return rows
    }
    catch (error) {
        console.log("🚩 ~ file: index.js ~ line 11 ~ getRows ~ error", error)
    }

}

module.exports = {
    getRows,
    releaseRow,
    setErrorRow,
    updateRow,
    retryRow
}