po.namespace('po');

po.dayCount = function () {
    
    var daysTask = {};
    
    function init() {
        daysTask[(new Date()).toDateString()] = po.task();
        return this;
    }
    
    function getTask() {
        return daysTask[(new Date()).toDateString()];
    }
    
    function startTask() {
        getTask().start();
    }
    
    function stopTask() {
        getTask().stop();
    }
    
    function getDaysEffort() {
        return getTask().sumOfEffortTime();
    }
    
    return ({
        init: init,
        getTask: getTask,
        getDaysEffort: getDaysEffort,
        startTask: startTask,
        stopTask: stopTask
    }).init();
    
};