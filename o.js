    // version 2

(function () {
    'use strict';

    // Рабочий сервер-парсер
    var PARSER_URL = 'https://ts.lampac.sh';

    function initOnlineFix() {
        // Подменяем настройки онлайн-источников в Lampa на рабочий Lampac
        if (window.Lampa) {
            Lampa.Storage.set('online_proxy', PARSER_URL);
            Lampa.Storage.set('parser_use', 'true');
            Lampa.Storage.set('parser_torrent_type', 'jackett');
            
            // Если включен модуль CUB, перенаправляем его запросы
            Lampa.Listener.follow('app', function (e) {
                if (e.type === 'ready') {
                    if (Lampa.Settings && Lampa.Settings.main) {
                        Lampa.Storage.set('source_use', 'cub');
                    }
                }
            });
        }

        // Загружаем основной скрипт онлайн-мода
        Lampa.Utils.putScript(['https://nb557.github.io/plugins/online_mod.js'], function () {
            console.log('Online Mod successfully loaded');
        }, function () {
            // Резервная загрузка
            Lampa.Utils.putScript(['https://lampac.sh/online.js']);
        });
    }

    if (window.Lampa) {
        initOnlineFix();
    }
})();
