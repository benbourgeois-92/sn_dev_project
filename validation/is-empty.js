const isEmpty = (value) => {

    //Will return true if any of the following is true
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
};

module.exports = isEmpty;