(function () {
    'use strict';

    function OnlinePlugin(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({mask: true, over: true});
        var items = [];
        var html = $('<div></div>');
        var body = $('<div class="online-list category-full"></div>');

        this.create = function () {
            var _this = this;
            this.activity.loader(true);
            
            // Запрос к рабочему публичному балансеру
            var url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://stream.voidboost.cc/embed/' + object.movie.kinopoisk_id);
            
            network.silent(url, function (found) {
                _this.activity.loader(false);
                var iframe = $('<iframe src="https://vidsrc.me/embed/movie?imdb=' + (object.movie.imdb_id || '') + '" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>');
                html.append(iframe);
            }, function () {
                _this.empty();
            });

            return this.render();
        };

        this.empty = function () {
            this.activity.loader(false);
            var empty = $('<div class="empty__title">Источники не найдены или требуют настройки парсера</div>');
            html.append(empty);
        };

        this.render = function () {
            return html;
        };
    }

    // Регистрация кнопки "Онлайн" в Lampa
    function init() {
        if (window.online_plugin_inited) return;
        window.online_plugin_inited = true;

        Lampa.Component.add('online_mod', OnlinePlugin);

        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var render = e.object.activity.render();
                var btn = $('<div class="full-start__button selector button--online"><svg height="24" viewBox="0 0 24 24" width="24"><path d="M8 5v14l11-7z"/><path d="0 0h24v24H0z" fill="none"/></svg><span>Онлайн</span></div>');

                btn.on('hover:enter', function () {
                    Lampa.Activity.push({
                        title: 'Онлайн просмотр',
                        component: 'online_mod',
                        movie: e.object.method == 'tv' ? e.object.card : e.object.card
                    });
                });

                render.find('.full-start__buttons').append(btn);
            }
        });
    }

    if (window.Lampa) {
        init();
    }
})();
