const validator = require('validator');
const isEmpty = require('./is-empty.js');


module.exports = function validatePostInput(data) {
    
    let errors = {};
    
    data.text = !isEmpty(data.text) ? data.text: '';
   

    if(!validator.isLength(data.text, {min: 10, max: 300 })){

        errors.text = 'maximum length 300 min 10';

    }
    

    if(validator.isEmpty(data.text)){
        errors.text = 'text is required';
    }

  

    return {
        errors,
        isValid: isEmpty(errors)
    }
}