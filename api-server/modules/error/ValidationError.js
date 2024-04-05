class ValidationError extends Error{
    constructor(message, errors = null){
        super(message);
        this.errors = errors;
    }
}

module.exports = ValidationError;