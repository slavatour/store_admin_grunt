var i18n = require('i18next'),
    app = require('./app_config');
// multilamguage modal initialization
i18n.init({
    ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
    resSetPath: 'locales/__lng__/new.__ns__.json',
    saveMissing: true,
    debug: true,
    sendMissingTo: 'fallback',
    preload: ['en-US', 'ru-RU']
});


i18n.registerAppHelper(app)
    .serveClientScript(app)
    .serveDynamicResources(app)
    .serveMissingKeyRoute(app);

i18n.serveWebTranslate(app, {
    i18nextWTOptions: {
        languages: ['en-US', 'ru-RU', 'dev'],
        namespaces: ['ns.common', 'ns.special'],
        resGetPath: "locales/resources.json?lng=__lng__&ns=__ns__",
        resChangePath: 'locales/change/__lng__/__ns__',
        resRemovePath: 'locales/remove/__lng__/__ns__',
        fallbackLng: "dev",
        dynamicLoad: true,

    }
});
