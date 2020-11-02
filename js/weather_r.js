
window.addEventListener('load', WorkR)

function WorkR () {
    // 날씨 위젯
    (function setTimeR () {
        const citysR = ['ulsan', 'daegu', 'jeju', 'incheon'];
        
        let randomCityR = citysR[Math.floor(Math.random() * citysR.length)];
        let apiURIR = "http://api.openweathermap.org/data/2.5/weather?q="+randomCityR+"&appid="+"1ee14e29e3cc6513ab47ca8c99768dc0&units=metric&lang=kr";
        console.log(apiURIR)
        let imgURLR;

        let reqObjR = new XMLHttpRequest();
        reqObjR.open('GET', apiURIR);
        reqObjR.responseType = 'json';
        reqObjR.send();
        reqObjR.onload = function () {
            let myDataR = reqObjR.response;
            console.log(myDataR)
            weather(myDataR);
        }

        function weather (myDataR) {
            const wtimgR = document.querySelector('.weather a.wt_right > span.wt_icon > img')
            const wtLocalR = document.querySelector('.weather a.wt_right > span.wt_local');
            const wtTempR = document.querySelector('.weather a.wt_right > span.wt_temp');

            switch (myDataR.name) {
                case 'Ulsan':
                    wtLocalR.innerText = '울산';
                    break;
                case 'Daegu':
                    wtLocalR.innerText = '대구';
                    break;
                case 'Jeju City':
                    wtLocalR.innerText = '제주';
                    break;
                case 'Incheon':
                    wtLocalR.innerText = '인천';
                    break;
            }  
            imgURLR = "http://openweathermap.org/img/wn/" + myDataR.weather[0].icon + ".png";
            wtimgR.src = imgURLR;
            wtTempR.innerText = myDataR.main.temp_max;               
        } 
        setTimeout(setTimeR, 5000)
    })();

}
