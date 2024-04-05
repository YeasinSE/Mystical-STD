const fs = require('fs');
const mime = require('mime-types');


class FileClient{
        /**
         * Make directory
         * 
         * @param {String} path 
         */
        static makeDir(path){
            fs.mkdirSync(path);
        }

        /**
         * 
         * @param {String} path 
         * @param {Boolean} recursive 
         * @returns {Array} array of directory path
         */
        static readDir(path, recursive = false){
            return fs.readdirSync(path, { recursive: recursive });
        }

        /**
         * Check directory exists
         * 
         * @param {String} path 
         * @returns {Boolean}
         */
        static exists(path){
            return fs.existsSync(path)
        }

        /**
         * Create write stream
         * 
         * @param {String} path 
         * @param {String} mode 
         * @returns {WritableStream}
         */
        static createWriteStream(path, mode = 'a'){
            return fs.createWriteStream(path, {flags: mode})
        }

        /**
         * Create read stream
         * 
         * @param {String} path 
         * @returns {ReadableStream}
         */
        static createReadStream(path){
            return fs.createReadStream(path)
        }

        /**
         * Read file
         * 
         * @param {String} path 
         * @returns 
         */
        static readFileSync(path, encode = 'utf-8'){
            return fs.readFileSync(path, encode);
        }

        /**
         * Get file type
         * 
         * @param {*} path 
         * @returns 
         */
        static getMimeType(path){
            return mime.lookup(path);
        }

        /**
         * Check is directory
         */
        static isDirectory(path){
            return fs.lstatSync(path).isDirectory();
        }

}

globalThis.FileClient = FileClient;
