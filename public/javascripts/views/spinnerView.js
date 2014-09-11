define(function(){
    function initialize (container) {
        var html = $('#spinnerTemplate').html();
        $(container).append(html);
        this.destroy = function () {
            $('.loaderContainer').remove();
        }
    }
    return {
        initialize: initialize,
        destroy: initialize.destroy
    }
});