po.namespace('po.dayCountController');

po.dayCountController = function (options) {
    
    options || (options = {
        "jQuery": jQuery,
        "playTarget": jQuery('#play'),
        "stopTarget": jQuery('#stop'),
        "dayCount": po.dayCount(),
        "dayTimerTarget": jQuery("#time > ul > li:first-child")
    });
    
    var $ = options.jQuery,
        timer = 0;
    
    function format(ms) {
        var minutes = ms / 1000 / 60,
            restMin = 0;
        
        if (minutes >= 60) {
            restMin = (minutes % 60);
            return (minutes / 60).toFixed(0) + " h " + restMin.toFixed(0) + " min";
        }
        
        return minutes.toFixed(0) + " min";
    }
    
    function refresh() {
        options.dayTimerTarget.text(format(options.dayCount.getDaysEffort()));
    }
    
    function init() {
        var self = this;

        options.playTarget.bind("click", function () {
            options.stopTarget.show();
            $(this).hide();
            options.dayCount.startTask();
            self.refresh();
            timer = window.setInterval(self.refresh, 1000 * 60);
        });
        
        options.stopTarget.bind("click", function () {
            options.playTarget.show();
            $(this).hide();
            options.dayCount.stopTask();
            window.clearInterval(timer);
        });
        
        return this;
    }
    
    return ({
        init: init,
        refresh: refresh,
        format: format
    });
};