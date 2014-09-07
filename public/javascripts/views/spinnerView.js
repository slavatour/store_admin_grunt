define(function(){
    function initialize (container) {
        var html = $('#spinnerTemplate').html();
        $(container).append(html);
        this.destroy = function () {
            $('.loader').remove();
        }
    }
    return {
        initialize: initialize,
        destroy: initialize.destroy
    }
});