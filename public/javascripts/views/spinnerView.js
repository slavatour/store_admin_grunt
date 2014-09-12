define(function(){
    function initialize (container) {
        var html = $('#spinnerTemplate').html();
        $(container).append(html);
        this.destroy = function (options) {
            var timeout;
            !options || !options.timeout ?  timeout = 0 : timeout = options.timeout;
            setTimeout(function(){
                $('.loaderContainer').remove();

            }, timeout);
        }
    }
    return {
        initialize: initialize,
        destroy: initialize.destroy
    }
});