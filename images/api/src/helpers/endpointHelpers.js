
/**
 * check name of new student on post
 * @params: student name
 * @returns: false if no match, true if right type
 */


function checkStudentName(name) {
    if (
        name == null 
        || name.length <= 1 
        || typeof(name) != "string" 
        || name.length > 20
        ){
        return false
    }     
    return true

    }

    function checkNumber(value) {
        return typeof value === 'number' && value >= 0 && Number.isInteger(value);
    }

    module.exports = { 
        checkStudentName,
        checkNumber,
    }