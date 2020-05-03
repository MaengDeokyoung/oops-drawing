(function(){

    var items = [
        {
            title: "canvas 그리기",
            desc: "canvas 돋보기, 그리기",
            url: "/landkid/html/practice.html",
            date: "2017/09/30"
        },
        {
            title: "Psychi Text Animation",
            desc: "This animation is made by canvas drawing.",
            url: "/landkid/html/typo1.html",
            date: "2017/09/30"
        },
        {
            title: "Pado Animation",
            desc: "This animation is made by canvas drawing.",
            url: "/landkid/html/wave.html",
            date: "2017/09/30"
        }

    ];

    var audio = new Audio("../audio/jonhdenver-takemehomecountryroad.mp3");
    audio.repeat = true;
    audio.play();

    window.addEventListener('scroll', function(e){

        var size = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));

        if(window.scrollY > size * 3){
            OPUS.select('header').execute(function (o) {
                o.classList.add('header-fixed');
                o.classList.add('transition');


            })
        } else {
            OPUS.select('header').execute(function (o) {
                o.classList.remove('header-fixed');
                o.classList.remove('transition');

            })
        }
    }, false);

    var listItemEl = function(item, position){
        return '<li class="item">\n' +
        '<div class="item-date">\n' + item.date + '</div>' +
        '<div class="item-title">\n' + item.title + '</div>' +
        '<div class="item-description">' + item.desc + '</div>' +
        '<iframe src="' + item.url + '" scrolling="no" border="no" maginwidth="0" marginheight="0" frameborder="0" ></iframe>' +
        '<div class="link"><a href="' + item.url + '">보러 가기</a></div>' +
        ((position !== items.length - 1) ? '<div style="width: 100px;margin-left: auto;margin-right:auto;margin-top:2rem;"><hr></div>' : '') +
        '</li>'
    };

    OPUS.select('ul.list').execute(function(o){
        for(var i = 0 ; i < items.length ; i++) {
            var item = items[i];
            o.innerHTML += listItemEl(item, i);
        }
    });

    OPUS.select('.music-player-control a').execute(function(o){

    }).on('click', function(e){
       if(this.classList.contains('music-player-pause')){
           this.classList.remove('music-player-pause');
           this.classList.add('music-player-play');
           audio.pause();
       } else {
           this.classList.add('music-player-pause');
           this.classList.remove('music-player-play');
           audio.play();
       }
    }, false);

})();