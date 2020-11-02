window.addEventListener('load', Work)

function Work () {
    const input = document.querySelector('input.keyword');
    let searchTxt
    input.addEventListener('keydown', enterWork);

    function enterWork () { 
        console.log(event.keyCode)
        if (event.keyCode === 13) {          
            searchTxt = input.value;
            window.location.assign('https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=' + searchTxt); 
        }
    }
    const searchBtn = document.querySelector('.search button.search_btn')
    searchBtn.addEventListener('click', submitWork);

    function submitWork () {
            searchTxt = input.value;
            window.location.assign('https://m.search.daum.net/search?w=tot&nil_mtopsearch=btn&DA=YZR&q=' + searchTxt);     
    }

    // 날씨 위젯
    (function setTime () {
        const Citys = ['seoul', 'busan', 'gwangju', 'daejeon'];  
        let RandomCity = Citys[Math.floor(Math.random() * Citys.length)];
        let apiURI = "http://api.openweathermap.org/data/2.5/weather?q="+RandomCity+"&appid="+"1ee14e29e3cc6513ab47ca8c99768dc0&units=metric&lang=kr";
        console.log(apiURI)
        let imgURL;

        let reqObj = new XMLHttpRequest();
        reqObj.open('GET', apiURI);
        reqObj.responseType = 'json';
        reqObj.send();
        reqObj.onload = function () {
            let myData = reqObj.response;
            console.log(myData)
            weather(myData);
        }

        function weather (myData) {
            const wtimg = document.querySelector('.weather a.wt_left > span.wt_icon > img')
            const wtLocal = document.querySelector('.weather a.wt_left > span.wt_local');
            const wtTemp = document.querySelector('.weather a.wt_left > span.wt_temp');

            switch (myData.name) {
                case 'Seoul':
                    wtLocal.innerText = '서울';
                    break;
                case 'Busan':
                    wtLocal.innerText = '부산';
                    break;
                case 'Gwangju':
                    wtLocal.innerText = '광주';
                    break;
                case 'Daejeon':
                    wtLocal.innerText = '대전';
                    break;
            } 
            imgURL = "http://openweathermap.org/img/wn/" + myData.weather[0].icon + ".png";
            wtimg.src = imgURL;
            wtTemp.innerText = myData.main.temp_max;      
        } 
        setTimeout(setTime, 5000)
    })();

    // main gnb
    const gnbslider = document.querySelector('nav > .slide_menu');

    let gnbisDown = false;
    let gnbstartX;
    let gnbscrollLeft;

    gnbslider.addEventListener('mousedown', (e) => {
        gnbisDown = true;
        gnbslider.classList.add('active');
        gnbstartX = e.pageX - gnbslider.offsetLeft;
        gnbscrollLeft = gnbslider.scrollLeft;
    });
    gnbslider.addEventListener('mouseleave', () => {
        gnbisDown = false;
        gnbslider.classList.remove('active');
    });
    gnbslider.addEventListener('mouseup', () => {
        gnbisDown = false;
    gnbslider.classList.remove('active');
    });
    gnbslider.addEventListener('mousemove', (e) => {
        if (!gnbisDown) return; 
        e.preventDefault();
        const gnbx = e.pageX - gnbslider.offsetLeft;
        const gnbwalk = (gnbx - gnbstartX) * 3;
        gnbslider.scrollLeft = gnbscrollLeft - gnbwalk;
    });

    // nav click event
    const mainNav =  document.querySelector('main > nav > .slide_menu > ul');
    const mainNavLis = mainNav.querySelectorAll('main > nav > .slide_menu > ul > li');
    const navBorder = document.querySelector('main > nav span.nav_border') 
    for (let i = 0; i < mainNavLis.length; i++) {
        mainNavLis[i].addEventListener('click', clickWork);      
    } 
    function clickWork (e) {
        e.preventDefault();
        const width = this.getBoundingClientRect().width;
        const height = this.getBoundingClientRect().height;
        const left =  this.getBoundingClientRect().left + mainNav.parentNode.scrollLeft;

        navBorder.style.width = `${width}px`;
        navBorder.style.height = `${height}px`;
        navBorder.style.left = `${left}px`;
        navBorder.style.top = '-2px';
        navBorder.style.transform = 'none';
    }

    // side menu
    const btnMenu = document.querySelector('.btn_menu')
    const btnClose = document.querySelector('.btn_close');
    const sideMenu = document.querySelector('.side_menu');

    btnMenu.addEventListener('click', openWork);
    btnClose.addEventListener('click', closeWork);
    function openWork (e) {
        e.preventDefault();
        sideMenu.classList.add('on');
    }
    function closeWork (e) {
        e.preventDefault();
        sideMenu.classList.remove('on');
    }

    // main > type click & drag
    const slider = document.querySelector('main ul.type');
    console.log(slider)
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; 
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
    });
}
