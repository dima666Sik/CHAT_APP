import 'babel-polyfill';

import './../sass/styles.scss';

import avatars from '../js/connect__avatars.js';

if (document.location.pathname == '/index.html') {
    const clickExit = document.querySelector('.btn__exit');
    const clickSendMessage = document.querySelector('.button__send__message');
    function get_cookie(cookie_name) {
        let results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results)
            return (unescape(results[2]));
        else
            return null;
    }
    // alert(document.cookie);
    let id = get_cookie("id_user");
    let user = get_cookie("user");
    // let gender = get_cookie("gender");
    // alert(gender);
    let dateStartSession = new Date(get_cookie("date"));
    const mapAvatars = new Map();
    // function statusOk() {
    //     if (user != undefined && user != null) {

    //     }
    // }
    // let countUsers = 0;
    function usersInChat(method, url) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        let flagCheck = false;
        xhr.onload = () => {
            if (xhr.status >= 400) {
                alert("status>400")
            } else {
                let countOnline = 0, allUsers = 0;
                for (let i = 0; i < xhr.response.length; i++) {
                    let idAvatar = (xhr.response[i].avatarId != undefined) ? xhr.response[i].avatarId : "guest";
                    mapAvatars.set(xhr.response[i].username, idAvatar);
                    let block = document.createElement('div');
                    block.style.border = "1px solid #fff";
                    block.style.padding = '2%';
                    block.style.margin = '2%';
                    block.style.background = 'rgba(50, 50, 50, 0.8)';
                    // block.style.display = 'flex';
                    // block.style.alignItems = 'center';
                    block.style.borderRadius = '15px 15px 15px 15px';
                    div__users__chat.append(block);

                    let blockAvatar = document.createElement('div');
                    blockAvatar.style.display = 'initial';
                    // blockAvatar.style.alignItems = 'flex-end';
                    // blockAvatar.style.border = "1px solid #fff";
                    block.append(blockAvatar);

                    // отображаем аватар пользователя
                    let img = document.createElement('img');
                    img.src = avatars[`${idAvatar}`];
                    img.style.width = '25%';
                    // img.style.height = '20%';
                    img.style.borderRadius = '50%';
                    blockAvatar.append(img);


                    if (user == null && id == null) {
                        document.cookie = "id_user=;max-age=-1";
                        document.location.href = "login.html";
                    }
                    // if (user == undefined && id == undefined) {
                    //     document.cookie = "id_user=;max-age=-1";
                    //     document.location.href = "login.html";
                    // }
                    if (xhr.response[i].username == user && xhr.response[i].user_id == id) {
                        flagCheck = true;
                    }
                    if (xhr.response[i].status == "active") {
                        let divGreen = document.createElement('img');
                        divGreen.src = avatars["green__point"];
                        divGreen.style.marginLeft = '-12%';
                        // divGreen.style.marginTop = '15%';
                        divGreen.style.width = '4%';

                        blockAvatar.append(divGreen);

                        countOnline++;

                    } else {
                        let divRed = document.createElement('img');
                        divRed.src = avatars["red__point"];
                        divRed.style.marginLeft = '-12%';
                        // divRed.style.marginTop = '15%';
                        divRed.style.width = '4%';
                        blockAvatar.append(divRed);
                    }
                    let pLast = document.createElement('div');
                    pLast.innerHTML = xhr.response[i].username;
                    // pLast.style.border = "1px solid #fff";
                    pLast.style.display = 'inline-block';
                    pLast.style.verticalAlign = 'top';
                    pLast.style.marginLeft = '10%';
                    pLast.style.fontSize = '18px';
                    pLast.style.fontFamily = 'Uchen';
                    block.append(pLast);

                    // let tempBlock = document.createElement('div');
                    // tempBlock.innerHTML = '';
                    // tempBlock.style.marginBottom = '2%';
                    // div__users__chat.append(tempBlock);
                    allUsers++;
                    // countUsers++;
                    ///////////////////////////////////////////////////////////////////////////
                    if (xhr.response[i].user_id == id) {
                        let pLast = document.createElement('p');
                        pLast.innerHTML = xhr.response[i].username;
                        pLast.style.display = 'inline-block';
                        pLast.style.fontFamily = 'Uchen';
                        div__time.prepend(pLast);
                        div__time.prepend("User: ");
                    }
                }
                if (!flagCheck) {
                    document.cookie = "id_user=;max-age=-1";
                    document.location.href = "login.html";
                }
                let pOnline = document.createElement('p');
                pOnline.style.display = 'flex';
                pOnline.style.justifyContent = 'space-around';
                pOnline.style.fontSize = '20px';
                pOnline.innerHTML = 'Online: ' + countOnline;
                div__users__chat__online.prepend(pOnline);

                let pAllUsers = document.createElement('p');
                pAllUsers.style.display = 'flex';
                pAllUsers.style.justifyContent = 'space-around';
                pAllUsers.style.fontSize = '26px';
                pAllUsers.innerHTML = 'All users: ' + allUsers;
                div__users__chat__online.prepend(pAllUsers);
            }
        }
        xhr.onerror = () => alert("Error!");

        xhr.send();
    }


    function isShowCurrentDate() {
        let date = new Date();

        let dateTime = addNull(date.getHours()) + ":" + addNull(date.getMinutes());
        // Your local time is:
        let divTime = document.createElement('p');
        divTime.classList.add('divTime1');
        divTime.innerHTML = "Your local time is: " + dateTime;

        div__time.append(divTime);


        let hour = date.getHours() - dateStartSession.getHours();
        let minutes = date.getMinutes() - dateStartSession.getMinutes();
        let days = date.getDay() - dateStartSession.getDay();
        let diff = days + "d " + hour + "h " + minutes + "m";

        let divDiff = document.createElement('p');
        divDiff.classList.add('divDiff1');
        divDiff.innerHTML = "You are online for: " + diff;

        div__time.prepend(divDiff);

    }

    clickSendMessage.onclick = function () {
        const userName = user;

        const messUser = document.getElementById('messages').value;
        // alert(messUser);

        // текущая дата
        let date = new Date().toISOString();
        // alert(date);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "https://studentschat.herokuapp.com/messages");
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({ datetime: date, message: messUser, username: userName }));
        alert(userName + " you send message!");
        xhr.onload = () => alert(xhr.response);

        // document.getElementsByClassName('.div__enter__message').value='';

        // document.location.href = "index.html";
    }

    function addNull(numb) {
        if (numb < 10) {
            return '0' + numb;
        } else
            return numb;
    }

    clickExit.onclick = function () {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", "https://studentschat.herokuapp.com/users/logout");
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({
            user_id: id,
            username: user,
        }));
        xhr.onload = function () {
            if (xhr.status != 200) {
                alert('status!=200 Error');
                document.location.href = 'login.html';
            } else {
                //стираем куки
                document.cookie = "id_user=;max-age=-1";
                document.location.href = 'login.html';
            }
        }
    }
    function make_safe(input) {
        return input.replace("&", "&amp;").replace(/(<?)([^<>]*)(>?)/g, (a, b, c, d) => {
            if ((b + c + d).toLowerCase() === "<br>") return "<br>";

            if (b === "<") b = "&lt;";
            if (b === ">") b = "&gt;";

            if (d === "<") d = "&lt;";
            if (d === ">") d = "&gt;";

            return b + c + d;
        }).replace(/\r?\n/g, "<br>");
    }
    let countMessage = 0;
    function isShowMessage(method, url) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.onload = () => {
            if (xhr.status >= 400) {
                alert("status>400")
            } else {
                for (let i = countMessage; i < xhr.response.length; i++) {
                    let idAvatar = mapAvatars.get(xhr.response[i].username);

                    let date = new Date(xhr.response[i].datetime);
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let dt = date.getDate();
                    let hour = date.getHours();
                    let min = date.getMinutes();
                    if (xhr.response[i].username == user) {

                        let divMessageMe = document.createElement('code');
                        divMessageMe.innerHTML = make_safe(xhr.response[i].message);
                        divMessageMe.style.border = '1px solid #fff';
                        divMessageMe.style.display = 'table';
                        divMessageMe.style.marginLeft = 'auto';
                        divMessageMe.style.marginBottom = '2%';
                        divMessageMe.style.padding = '2%';
                        divMessageMe.style.wordBreak = "break-all";
                        divMessageMe.style.borderRadius = '15px 15px 0 15px';
                        divMessageMe.style.background = 'rgba(0, 0, 0, 0.4)';

                        div__scroll__message.append(divMessageMe);

                        let divMessageName = document.createElement('div');
                        divMessageName.innerHTML = xhr.response[i].username;
                        divMessageName.style.fontSize = '20px';
                        // divMessageName.style.fontFamily = 'Uchen';
                        divMessageName.style.color = "darkorange";
                        divMessageName.style.fontWeight = 'bold';
                        // divMessageName.style.fontStyle = 'italic';
                        divMessageMe.prepend(divMessageName);

                        let divMessageDate = document.createElement('div');
                        divMessageDate.innerHTML = addNull(dt) + "." + addNull(month) + "." + year + " " + addNull(hour) + ":" + addNull(min);
                        divMessageDate.style.textAlign = "end";
                        divMessageDate.style.fontSize = '12px';
                        divMessageMe.append(divMessageDate);

                    } else {
                        let divMessageAll = document.createElement('div');
                        // divMessageAll.innerHTML = make_safe(xhr.response[i].message);
                        divMessageAll.style.border = '1px solid #fff';
                        divMessageAll.style.display = 'table';
                        divMessageAll.style.marginBottom = '2%';
                        divMessageAll.style.borderRadius = '15px 15px 15px 0';
                        divMessageAll.style.padding = '2%';
                        divMessageAll.style.wordBreak = "break-all";
                        divMessageAll.style.background = 'rgba(214, 96, 0, 0.4)';

                        div__scroll__message.append(divMessageAll);

                        let divMessageName = document.createElement('div');
                        divMessageName.innerHTML = xhr.response[i].username;
                        divMessageName.style.display = 'inline-block';
                        divMessageName.style.verticalAlign = 'top';
                        divMessageName.style.fontSize = '18px';
                        // divMessageName.style.fontFamily = 'Uchen';
                        divMessageName.style.fontWeight = 'italic';
                        // divMessageName.style.fontStyle = 'italic';
                        divMessageName.style.color = "rgba(0, 174, 197, 1)";
                        divMessageAll.prepend(divMessageName);

                        let img = document.createElement('img');
                        img.src = avatars[`${idAvatar}`];
                        img.style.width = '60px';
                        img.style.display = 'inline-block';
                        img.style.marginRight = '10px';
                        // img.style.height = '20%';
                        img.style.borderRadius = '50%';
                        divMessageAll.prepend(img);

                        let divMessage = document.createElement('div');
                        divMessage.innerHTML = make_safe(xhr.response[i].message);
                        divMessageAll.append(divMessage);

                        let divMessageDate = document.createElement('div');
                        divMessageDate.innerHTML = addNull(dt) + "." + addNull(month) + "." + year + " " + addNull(hour) + ":" + addNull(min);
                        divMessageDate.style.textAlign = "end";
                        divMessageDate.style.fontSize = '12px';
                        divMessageAll.append(divMessageDate);
                    }
                    countMessage++;

                }
            }
        }
        xhr.onerror = () => alert("Error!");

        xhr.send();
    }

    function BoldText() {

    }

    usersInChat("GET", "https://studentschat.herokuapp.com/users");
    // setInterval(function(){usersInChat("GET", "https://studentschat.herokuapp.com/users")},1000);
    setInterval(function () { isShowMessage("GET", "https://studentschat.herokuapp.com/messages") }, 1000);
    // setInterval(function(){isShowCurrentDate()},5000);
    isShowCurrentDate();
    // statusOk();
}

