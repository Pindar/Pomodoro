var po = po || {};


po.task = function (description) {
    
    var localStorage = window.localStorage,
        id = localStorage.getItem("task:id"),
        timePoints = [],
        currentStartStop = {};
        
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
        if (!isNaN(currentStartStop.start) && 
            isNaN(currentStartStop.stop)) {
            throw new Error("you have to stop the task first before you" +
                "can start it a secound time.");
        }
        
        currentStartStop = {
            start: Date.now()
        };
        
        timePoints.push(currentStartStop);
    }
    
    function stop() {
        if (!(isNaN(currentStartStop.start) || isNaN(currentStartStop.stop))) {
            throw new Error("you can't stop a tast twice.");
        }
        currentStartStop.stop = Date.now();
    }
    
    function calculateTime(elem) {
        return elem.stop - elem.start;
    }
    
    function sum(prevValue, currentValue) {
        return prevValue + currentValue;
    }
    
    function sumOfEffortTime() {
        return $.map(timePoints, calculateTime).reduce(sum, 0);
    }
    
    function sumCurrentEffortTime() {
        return calculateTime(currentStartStop);
    }
    
    return {
        getSetDescription: getSetDescription,
        start: start,
        stop: stop,
        sumCurrentEffortTime: sumCurrentEffortTime,
        sumOfEffortTime: sumOfEffortTime
    };
};