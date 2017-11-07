var xhr = new XMLHttpRequest();

function hasOneDayPassed() {
    var date = new Date().toLocaleDateString();
    if (localStorage.yourapp_date == date) return false;

    localStorage.yourapp_date = date;
    return true;
}

xhr.open('GET', 'http://mtaapi.herokuapp.com/api?id=F27N');
xhr.onload = function () {
    let arr = JSON.parse(xhr.responseText).result.arrivals.sort();
    let filteredArray = arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
    });
    getTimes(filteredArray);
    setInterval(function () { getTimes(filteredArray) }, 30000);
};
xhr.send();

function getTimes(arr) {
    let time = new Date();
    let hours = time.getHours();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    let arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].substring(0, 2) >= hours && arr[i].substring(3, 5) >= mins && arr2.length <= 10) {
            arr2.push(arr[i]);
        }
    }

    let res = arr2.join("<br> ");
    document.getElementsByClassName('text')[0].innerHTML = res;
}