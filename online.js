(function () {
    'use strict';

    function startPlugin() {
        var mirrors = [
            'https://lampac.sh/online.js',
            'https://plugin.root34.ru/online.js',
            'http://bwa.to/o'
        ];

        function tryLoad(index) {
            if (index >= mirrors.length) return;
            
            Lampa.Utils.putScript([mirrors[index]], function () {
                console.log('Online module loaded successfully from:', mirrors[index]);
            }, function () {
                tryLoad(index + 1);
            });
        }

        tryLoad(0);
    }

    if (window.Lampa) {
        startPlugin();
    }
})();
