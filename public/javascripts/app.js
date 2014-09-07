define(["marionette"], function (Marionette) {
    window.Store = new Backbone.Marionette.Application();

    Store.addRegions({
        categoriesRegion: "#categoriesContainer",
        modalRegion: "#editModal",
        sliderRegion: ".sliderContainer"
    });

    Store.addInitializer(function () {
        require(["routes"], function (StoreRouter) {
            new StoreRouter();
            if(Backbone.history){
                Backbone.history.start();
            }
        });
    });
    return Store;
});
