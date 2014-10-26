define(["marionette"], function (Marionette) {
    window.Store = new Backbone.Marionette.Application();

    Store.addRegions({
        categoriesRegion: ".categoriesTable",
        modalRegion: "#editModal",
        modalRegionCategory: "#categoryModal",
        modalRegionCurrency: "#currencyModal",
        modalRegionBrands: "#brandsModal",
        modalRegionProducts: "#productsModal",
        modalRegionPrices: "#pricesModal",
        sliderRegion: ".sliderTable",
        warningRegion: ".warningContainer",
        productsRegion: ".productsTable",
        brandsRegion: ".brandsTableContainer",
        currenciesRegion: ".currenciesList",
        currenciesHistoryRegion: ".currenciesHistory",
        pricesRegion: ".pricesTable",
        priceRulesRegion: ".priceRules",
        pricesChartRegion: ".pricesChart",
        specificationsRegion: ".specificationsTable"
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
