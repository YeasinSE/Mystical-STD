
class QueueManager{

    static createQueue(name, connection, config = {}){
        return require('./ApplicationQueue')(name, connection, config);
    }
}

module.exports = QueueManager;