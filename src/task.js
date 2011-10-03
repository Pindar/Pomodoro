var po = po || {};


po.task = function (description) {
    
    var localStorage = window.localStorage,
        id = localStorage.getItem("task:id"),
        startTimePoints = [],
        stopTimePoints = [];
        
    description = description || "";
    
    function getSetDescription() {
        if (arguments.length > 0) {
            if (arguments[0] === null) {
                throw new TypeError("wrong type");
            }
            description = arguments[0];
        }
        
        return description;
    }
    
    function start() {
        startTimePoints.push(Date.now());
    }
    
    function stop() {
        stopTimePoints.push(Date.now());
    }
    
    function sumOfEffortTime() {
        
    }
    
    return {
        getSetDescription: getSetDescription,
        start: start,
        stop: stop,
        sumOfEffortTime: sumOfEffortTime
    };
};