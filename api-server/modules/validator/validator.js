class Validator{

    static REGEX_INVALID_CONTAIN = /[!#$%^&*()_+\-={};':"[|,<>?~]/gm;

    static REGEX_IMAGE_KEY = /[!#$%^&*()={};':"[|,<>?~]/gm;

    static REGEX_SPECIAL_CONTAIN = /[!#$%^*_+={};':"[|<>?~]/gm;

    static REGEXT_EMAIL = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

    static REGEXT_SLUG = /[\w\-]{5,80}/g;

    static REGEX_UUID4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    static REGEXT_ALPHA = /[A-Za-z]+/;

    static REGEXT_ALPHA_SPACE = /[A-Za-z ]+/;

    static REGEXT_ALPHA_HYPHEN = /[A-Za-z-]+/;

    static REGEXT_ALPHA_NUMBER = /[A-Za-z0-9]+/;

    static REGEXT_ALPHA_NUMBER_SPACE = /[A-Za-z0-9 ]+/;

    static REGEXT_ALPHA_NUMBER_UNS = /[\w]+/;

    static REGEXT_UPPER = /[A-Z]+/;

    static REGEXT_LOWER = /[a-z]+/;

    static REGEXT_NUMBER =  /[0-9]+/;

    static REGEXT_DIGTI_DOT = /^\d+(\.\d+)?$/ ; // /\d+[.]/g;

    static REGEXT_SPECIAL = /[!@#$%^&*()+={}|,.?~ ]+/;

    static REGEXT_LINK_WITH_FTP = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    static REGEX_TIME = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/

    /**
     * validation checker func
     *
     * @param value
     * @param regex
     * @returns {*}
     */
    static isValid(value, regex) {
        return regex.test(value);
    }

    static isAlpaSpace(value) {
        return this.isValid(value, this.REGEXT_ALPHA_SPACE);
    }

    static isAlpa(value) {
        return this.isValid(value, this.REGEXT_ALPHA);
    }

    static isUpper(value) {
        return this.isValid(value, this.REGEXT_UPPER);
    }

    static isLower(value) {
        return this.isValid(value, this.REGEXT_LOWER);
    }

    static isAlpaNumber(value) {
        return this.isValid(value, this.REGEXT_ALPHA_NUMBER);
    }

    static isDigit(value) {
        return this.isValid(value, this.REGEXT_NUMBER);
    }

    static isDigitWithDot(value) {
        return this.isValid(value, this.REGEXT_DIGTI_DOT);
    }

    static isSpecial(value) {
        return this.isValid(value, this.REGEXT_SPECIAL);
    }

    static isEmptyWithNoZero(value) {
        return !value && (value !== 0);
    }

    static isEmpty(value) {
        return !value;
    }

    static isValidSlug(value) {
        return this.isValid(value, this.REGEXT_SLUG);
    }

    static isValidEmail(value) {
        return this.isValid(value, this.REGEXT_EMAIL);
    }

    static isInvalidContain(value, regex = null){
        return this.isValid(value, regex || this.REGEX_INVALID_CONTAIN);
    }

    static isBeforDateOFNow(value){
        return this.isValidDate(value) && moment(value).isBefore(moment());
    }

    static clean(value, regex, replace = ''){
        return value?.replace(regex, replace);
    }

    static isValidUUID4(value){
        return this.isValid(value, this.REGEX_UUID4);
    }

    static isValidUrlWithFTP(url){
        return this.isValid(url, this.REGEXT_LINK_WITH_FTP);
    }

    static isUrlValid(url) {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
          'i'
        );
        return this.isValid(url, pattern);
    }
    
    static isValidURL(url) {
        try{
            const validUrl = new URL(url);
            return validUrl.protocol === 'https:' || validUrl.protocol === 'http:';
        }catch(e){
            return false;
        }
    }

}

module.exports = Validator;

