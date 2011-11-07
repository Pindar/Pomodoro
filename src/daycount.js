po.namespace('po');

po.dayCount = function (dataService) {
    
    var daysTask = {};
    
    function init() {
        daysTask = dataService.restoreListOfTasks();
        daysTask[(new Date()).toDateString()] = daysTask[(new Date()).toDateString()]
            || po.task();
            
        dataService.saveListOfTasksForDays(daysTask);
        return this;
    }
    
    function getTask() {
        return daysTask[(new Date()).toDateString()];
    }
    
    function startTask() {
        getTask().start();
        dataService.saveListOfTasksForDays(daysTask);
    }
    
    function stopTask() {
        getTask().stop();
        dataService.saveListOfTasksForDays(daysTask);
    }
    
    function getDaysEffort() {
        return getTask().sumOfEffortTime();
    }
    
    function toJSON() {
        return JSON.stringify(daysTask);
    }
    
    return ({
        init: init,
        getTask: getTask,
        getDaysEffort: getDaysEffort,
        startTask: startTask,
        stopTask: stopTask
    }).init();
    
};