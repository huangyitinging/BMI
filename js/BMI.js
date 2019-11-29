//BMI

var sendData  =  document.querySelector('.send');
var list  =  document.querySelector('.listBMI');
var data  =  JSON.parse(localStorage.getItem('listData')) || [];
var btnresult  =  document.querySelector('.button-result');

//監聽
sendData.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
updataListBMI(data);

//btnresult.addEventListener('click',btnstart);

function addData(e) {
    e.preventDefault();
    var tall = document.querySelector('#tall').value;
    var weight = document.querySelector('#weight').value;
    var tallBMI = parseInt(document.querySelector('#tall').value);
    var weightBMI = parseInt(document.querySelector('#weight').value);
    var txtBMI = weightBMI/((tallBMI/100)*(tallBMI/100));
    var txt = txtBMI.toFixed(2);
    console.log(txt,txtBMI);
    var status = "";
    var BMIcolor = '';
    var space = "";
    var circle = "";
    var text = "";
    var spin = "";
    if (txt<16) {
        status = '嚴重過輕';
        BMIcolor = 'defcolor';
        space = "mr-0";
        circle = "defcircle";
        text = "def-text";
        spin = "bg-def";
    } else if (txt >= 16 && txt < 18.5) {
        status = '過輕';
        BMIcolor = 'lesscolor';
        space = "mr4";
        circle = "lesscircle";
        text = "less-text";
        spin = "bg-less";
    } else if(txt >= 18.5 && txt < 25) {
        status = '理想';
        BMIcolor  =  'idealcolor';
        space = "mr4";
        circle = "idealcircle";
        text = "ideal-text";
        spin = "bg-ideal";
    } else if (txt >= 25 && txt < 30) {
        status = '輕度肥胖';
        BMIcolor = 'medfatcolor';
        space = "mr-0";
        circle = "medfatcircle";
        text = "medfat-text";
        spin = "bg-medfat";
    } else if (txt >= 35 && txt < 40) {
        status = '中度肥胖';
        BMIcolor = 'defatcolor';
        space = "mr-0";
        circle = "defatcircle";
        text = "defat-text";
        spin = "bg-defat"; 
    } else if (txt >= 40) {
        status = '重度肥胖'
        BMIcolor  =  'serfatcolor';
        space = "mr-0";
        circle = "serfatcircle";
        text = "serfat-text";
        spin = "bg-serfat";  
    }
    var today  =  new Date();
    var getNewDate  = ( today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1) + '-' +(today.getDate() < 10 ? '0' : '')+ today.getDate() + '-' + today.getFullYear();
    var todo = {
        height:tallBMI,
        weight:weightBMI,
        bmi:txt,
        status:status,
        time:getNewDate,
        color:BMIcolor,
        borderleft:space,
    }
    if (!tall || !weight ){
        alert('請輸入正確資料！！');
        document.querySelector('#tall').value = '';
        document.querySelector('#weight').value = '';
    } else {
        data.push(todo);
        updataListBMI(data);
        localStorage.setItem('listData', JSON.stringify(data));
        
        reset();
        sendData.setAttribute('class', 'd-none');
        
        var BMIbtn  =  [circle, txt, spin, text, status];
        showBMIbtn(BMIbtn);
        var rotate  =  document.querySelector('#spin-icon');
        rotate.addEventListener('click', hideBMIBtn);
    }
};

//更新網頁
function updataListBMI(data) {
    str = '';
    var len = data.length;
    for (var i = 0; i < len; i++) {
        str += '<li class = "d-flex justify-content-between bg-white mb-3 ' + data[i].color + '">';
        str += '<div class = "text-lg bg-white ' + data[i].borderleft + '">' + data[i].status + '</div>';
        str += '<div class = "text-lg bg-white"><small class = "text-sm mr-1">BMI</small>' + data[i].bmi + '</div>';
        str += '<div class = "text-lg bg-white"><small class = "text-sm mr-1">height</small>' + data[i].height + 'cm</div>';
        str += '<div class = "text-lg bg-white"><small class = "text-sm mr-1">weight</small>' + data[i].weight + 'kg</div>';
        str += '<div class = "align-self-stretch align-items-end bg-white">' + data[i].time + '</div>';
        str += '<div class = "align-self-stretch align-items-end bg-white"><a href = "#"><i class = "fas fa-times" data-index = ' + i + '></i></a></div>';
        str += '</li>';
    }list.innerHTML  =  str;
}

//刪除紀錄

function toggleDone(e) {
    e.preventDefault () ;
    if (e.target.nodeName !== 'I'){ return }
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updataListBMI(data);
}

//清除輸入框

function reset() {
    document.querySelector('#tall').value = "";
    document.querySelector('#weight').value = "";
}

function showBMIbtn(BMIbtn) {
    var str = '';
    str += `<div id = "circle-icon" class = "text-center ${BMIbtn[0]}">
    <p class = "h2 mb-0">${BMIbtn[1]}</p>
    <span class = "font-14">BMI</span>
    <img id = "spin-icon" src = "https://upload.cc/i1/2019/02/05/687Wof.png" class = "${BMIbtn[2]}">
    </div>
    <p class = "h4 d-flex align-self-center ml-2 ${BMIbtn[3]}">${BMIbtn[4]}</p>`;
    btnresult.innerHTML = str;
}
function hideBMIBtn() {
    btnresult.innerHTML  =  '';
    sendData.setAttribute('class', 'btn');
    sendData.setAttribute('class', 'send');
}

