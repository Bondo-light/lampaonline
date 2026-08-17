(function () {
    'use strict';

    function Component(object) {
        var network = new Lampa.Reguest();
        var scroll  = new Lampa.Scroll({mask: true, over: true});
        var files   = new Lampa.Files();
        var filter  = new Lampa.Filter();
        var html    = $('<div></div>');
        var body    = $('<div class="category-full"></div>');

        this.create = function () {
            var _this = this;
            this.activity.loader(true);

            // Отрисовка базового контейнера источников
            var empty = $('<div class="empty center"><div class="empty__title">Поиск видеопотоков...</div><div class="empty__descr">Если список не загрузился, проверьте настройки парсера или прокси в CUB.</div></div>');
            html.append(empty);

            this.activity.loader(false);
            return this.render();
        };

        this.render = function () {
            return html;
        };
    }

    function start() {
        // Добавление компонента в систему Lampa
        Lampa.Component.add('online_mod_custom', Component);

        // Внедрение кнопки "Онлайн" в карточку фильма
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite') {
                var render = e.object.activity.render();
                
                // Проверяем, чтобы кнопка не дублировалась
                if (render.find('.button--online-custom').length === 0) {
                    var btn = $('<div class="full-start__button selector button--online-custom"><svg height="24" viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>Онлайн</span></div>');

                    btn.on('hover:enter', function () {
                        Lampa.Activity.push({
                            title: 'Онлайн',
                            component: 'online_mod_custom',
                            movie: e.object.card
                        });
                    });

                    render.find('.full-start__buttons').append(btn);
                }
            }
        });
    }

    if (window.Lampa) {
        start();
    }
})();
