po.namespace('po');

po.task = function (description) {
    
    var localStorage = window.localStorage,
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
    
    function parse(obj) {
        obj = JSON.parse(obj);
        timePoints = obj.timePoints || [];
        description = obj.description || "";
        currentStartStop = obj.currentStartStop || {};
        
        return this;
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
        if (elem.stop === null || elem. stop === undefined) {
            return Date.now() - elem.start;
        }
        return elem.stop - elem.start;
    }
    
    function sum(prevValue, currentValue) {
        return prevValue + currentValue;
    }
    
    function sumOfEffortTime() {
        return $.map(timePoints, calculateTime).reduce(sum, 0);
    }
    
    function sumCurrentEffortTime() {
        if (currentStartStop.start === undefined && 
                currentStartStop.stop === undefined) {
            throw new Error("Please start the task.");
        }
        return calculateTime(currentStartStop);
    }
    
    function getType() {
        return "task";
    }
    
    function save() {
        localStorage.setItem("key", JSON.stringify(this));
    }
    
    function toJSON() {
        return JSON.stringify({
            "timePoints": timePoints, 
            "description": description,
            "currentStartStop": currentStartStop
        });
    }
    
    return {
        getSetDescription: getSetDescription,
        start: start,
        stop: stop,
        getType: getType,
        sumCurrentEffortTime: sumCurrentEffortTime,
        sumOfEffortTime: sumOfEffortTime,
        save: save,
        parse: parse,
        toJSON: toJSON
    };
};