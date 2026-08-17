(function () {
    var pluginUrl = 'http://cub.red/plugin/online';
    
    if (window.Lampa && Lampa.Utils && Lampa.Utils.putScript) {
        Lampa.Utils.putScript([pluginUrl], function () {
            console.log('Online plugin loaded via CUB');
        }, function () {
            // Резервный источник, если CUB временно недоступен
            Lampa.Utils.putScript(['https://cdn.jsdelivr.net/gh/lampaplugins/store@main/plugins/online.js'], function () {});
        });
    }
})();
