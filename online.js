(function () {
    'use strict';

    // Базовый адрес прокси-мидлсена для обхода CORS и блокировок
    var PROXY_SERVER = 'https://ts.lampac.sh';

    function loadOriginalMod() {
        // Загружаем оригинальный модуль online_mod
        Lampa.Utils.putScript(['https://nb557.github.io/plugins/online_mod.js'], function () {
            
            // Перехватываем сетевой класс Lampa для автоматического проксирования запросов
            if (Lampa.Reguest) {
                var originalSilent = Lampa.Reguest.prototype.silent;
                
                Lampa.Reguest.prototype.silent = function (url, success, error, post_data, params) {
                    // Если запрос идет к сторонним балансерам (rezka, collaps, vidsrc и т.д.), перенаправляем через мидлсен
                    if (typeof url === 'string' && !url.includes(PROXY_SERVER) && (url.includes('rezka') || url.includes('stream') || url.includes('voidboost') || url.includes('kinopoisk'))) {
                        url = PROXY_SERVER + '/relays?url=' + encodeURIComponent(url);
                    }
                    return originalSilent.call(this, url, success, error, post_data, params);
                };
            }

            // Переопределяем настройки источников по умолчанию на JacRed / Lampac
            if (window.lampa_settings) {
                window.lampa_settings.online_proxy = PROXY_SERVER;
            }
            
            console.log('Online Mod successfully patched with Middleman proxy!');
        }, function () {
            console.log('Error loading original online_mod.js');
        });
    }

    if (window.Lampa) {
        loadOriginalMod();
    }
})();
