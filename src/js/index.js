import 'babel-polyfill';

import './../sass/styles.scss';

import avatars from '../js/connect__avatars.js';

if (document.location.pathname == '/index.html') {
    const divWindowUsers = document.querySelector('.users');;
    const divChats = document.querySelector('.div__tabs');;
    const countCE = document.querySelector('.characters__entered');;
    const countLE = document.querySelector('.letters__endered');;
    const countWC = document.querySelector('.whitespace__characters');;
    const countPM = document.querySelector('.punctuation__marks');;
    const clickExit = document.querySelector('.btn__exit');
    const clickSendMessage = document.querySelector('.button__send__message');
    const fieldMessage = document.getElementById("messages");
    const clickBoldText = document.querySelector('.button__message__bold');
    const clickItalicText = document.querySelector('.button__message__italic');
    const clickUnderlineText = document.querySelector('.button__message__underline');
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
    const mapUsers = new Map();
    mapUsers.set("start", 0);
    mapUsers.set("allUsers", 0);
    mapUsers.set("startCountOnline", 0);
    mapUsers.set("flagTime", 0);
    // var fl = 0;
    function usersInChat(method, url) {

        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        let flagCheck = false;
        xhr.onload = function () {
            if (xhr.status >= 400) {
                alert("status>400")
            } else {
                let countOnline = 0;
                // alert("lenght = " + xhr.response.length);
                // alert(" mapUsers.get('startCountOnline') = " + mapUsers.get("startCountOnline"));
                // alert(" mapUsers.get('countOnline') = " + mapUsers.get("countOnline"));
                for (let i = mapUsers.get("start"); i < xhr.response.length; i++) {
                    let idAvatar = (xhr.response[i].avatarId != undefined) ? xhr.response[i].avatarId : "guest";
                    mapAvatars.set(xhr.response[i].username, idAvatar);
                    let block = document.createElement('div');
                    block.className = `clickOnUser`;
                    block.style.border = "1px solid #fff";
                    block.style.padding = '2%';
                    block.style.margin = '2%';
                    block.style.background = 'rgba(50, 50, 50, 0.8)';
                    block.style.borderRadius = '15px 15px 15px 15px';
                    div__users__chat.append(block);

                    let blockAvatar = document.createElement('div');
                    blockAvatar.style.display = 'initial';
                    block.append(blockAvatar);

                    // отображаем аватар пользователя
                    let img = document.createElement('img');
                    img.src = avatars[`${idAvatar}`];
                    img.style.width = '25%';
                    img.style.borderRadius = '50%';
                    blockAvatar.append(img);


                    if (user == null && id == null) {
                        document.cookie = "id_user=;max-age=-1";
                        document.location.href = "login.html";
                    }
                    if (user == undefined && id == undefined) {
                        document.cookie = "id_user=;max-age=-1";
                        document.location.href = "login.html";
                    }
                    // if (xhr.response[i].username == user && xhr.response[i].user_id == id) {
                    //     flagCheck = true;
                    // }
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
                    pLast.className = 'name__user';
                    // pLast.style.border = "1px solid #fff";
                    pLast.style.display = 'inline-block';
                    pLast.style.verticalAlign = 'top';
                    pLast.style.marginLeft = '10%';
                    pLast.style.fontSize = '18px';
                    pLast.style.fontFamily = 'Uchen';
                    block.append(pLast);

                    let j = i;
                    // alert("start = " + mapUsers.get("start"));
                    // alert("allUsers = " + mapUsers.get("allUsers"));


                    mapUsers.set("allUsers", ++j);
                    mapUsers.set("start", mapUsers.get("allUsers"));
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
                // mapUsers.set("countOnline",countOnline);
                // if (!flagCheck) {
                //     document.cookie = "id_user=;max-age=-1";
                //     document.location.href = "login.html";
                // }

                // if (j != mapUsers.get("allUsers")) 
                // { alert("flagtimer");
                //     mapUsers.set("flagTime", 0);
                // }

                mapUsers.set("countOnline", countOnline);
                mapUsers.set("startCountOnline", mapUsers.get("startCountOnline") + mapUsers.get("countOnline"));

                let appOnline = document.getElementById('div__users__chat__online');
                let pOnline = document.createElement('p');
                pOnline.className = 'pOnline';
                pOnline.style.justifyContent = 'space-around';
                pOnline.style.fontSize = '20px';
                pOnline.style.display = 'flex';
                pOnline.innerHTML = 'Online: ' + mapUsers.get("startCountOnline");
                appOnline.prepend(pOnline);

                let appAllOnline = document.getElementById('div__users__chat__online');
                let pAllUsers = document.createElement('p');
                pAllUsers.style.justifyContent = 'space-around';
                pAllUsers.style.fontSize = '26px';
                pAllUsers.style.display = 'flex';
                pAllUsers.innerHTML = 'All users: ' + mapUsers.get("allUsers");
                appAllOnline.prepend(pAllUsers);

                if (mapUsers.get("flagTime")) {
                    appOnline.removeChild(pOnline);
                    appAllOnline.removeChild(pAllUsers);
                }

                mapUsers.set("flagTime", 1);
            }
            createNewChat();

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

        // текущая дата
        let date = new Date().toISOString();
        // alert(date);

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "https://studentschat.herokuapp.com/messages");
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify({ datetime: date, message: messUser, username: userName }));
        // alert(userName + " you send message!");
        xhr.onload = function () {
            // alert(xhr.response);
        };

        var messageField = document.getElementById('messages');
        messageField.value = '';
        clickSendMessage.style.background = 'rgba(194, 231, 245, 0.5)';
        window.setTimeout(function () { clickSendMessage.style.background = 'rgba(50, 50, 50, 0.6)' }, 100);
        countCE.innerHTML = 0 + " characters entered;";
        countLE.innerHTML = 0 + " letters endered;";
        countWC.innerHTML = 0 + " whitespace characters entered;";
        countPM.innerHTML = 0 + " punctuation marks entered.";

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
        return input.toString().replace("&", "&amp;").replace(/(<?)([^<>]*)(>?)/g, (a, b, c, d) => {
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

                };
            }
        }
        xhr.onerror = () => alert("Error!");

        xhr.send();
    }
    function buttonStyleMessage() {
        // var mF1 = document.getElementById('messages');
        var mF = document.getElementById('messages');
        if (mF) {
            // window.onload = function () {
            clickBoldText.addEventListener("click", function () {
                // Toggle the bold class on the text element
                mF.classList.toggle("bold");
                clickBoldText.style.background = 'rgba(194, 231, 245, 0.5)';
                window.setTimeout(function () { clickBoldText.style.background = 'rgba(50, 50, 50, 0.6)' }, 100);
            });
            clickItalicText.addEventListener("click", function () {
                // Toggle the bold class on the text element
                mF.classList.toggle("italic");
                clickItalicText.style.background = 'rgba(194, 231, 245, 0.5)';
                window.setTimeout(function () { clickItalicText.style.background = 'rgba(50, 50, 50, 0.6)' }, 100);
            });
            clickUnderlineText.addEventListener("click", function () {
                // Toggle the bold class on the text element
                mF.classList.toggle("underline");
                clickUnderlineText.style.background = 'rgba(194, 231, 245, 0.5)';
                window.setTimeout(function () { clickUnderlineText.style.background = 'rgba(50, 50, 50, 0.6)' }, 100);
            });
        }
    }

    fieldMessage.oninput = function () {
        var x = fieldMessage.value;
        // alert(typeof x);
        let countAll = 0, countWhitespace = 0, countLetters = 0, countPunc = 0;
        for (let i = 0; i < x.length; i++) {
            countAll++;
            if (x[i] == " " || x[i] == "\t" || x[i] == "\n") countWhitespace++;
            if (/^[a-zA-ZА-я]+$/.test(x[i])) countLetters++;
            if (/^[.,\/#!$%\^&\*;:{}=\-_`~()]+$/.test(x[i])) countPunc++;
        }
        countCE.innerHTML = countAll + " characters entered;";
        countLE.innerHTML = countLetters + " letters endered;";
        countWC.innerHTML = countWhitespace + " whitespace characters entered;";
        countPM.innerHTML = countPunc + " punctuation marks entered.";
    }

    function createNewChat() {
        const clickOnUser = document.querySelectorAll('.clickOnUser');
        let pBlock = document.createElement('p');
        pBlock.className = 'p__tabs__private';
        pBlock.style.border = '3px solid #fff';
        pBlock.style.borderBottom = 'none';
        pBlock.style.display = 'inline-block';
        pBlock.style.width = '15%';
        pBlock.style.textAlign = 'center';
        pBlock.style.background = 'rgba(50, 50, 50, 0.6)';
        for (let i = 0; i < clickOnUser.length; i++) {
            clickOnUser[i].onclick = function () {
                const p = document.createElement('button');
                pBlock.innerHTML = 'Chat with ' + clickOnUser[i].querySelector('.name__user').innerHTML;
                divChats.appendChild(pBlock);
                p.className = 'close';
                p.style.color = 'red';
                p.style.display = 'inline-block';
                p.style.marginLeft = '5%';
                p.style.background = 'grey';
                p.style.fontWeight = 'bold';
                p.innerHTML = 'X';
                pBlock.appendChild(p);
                // createNewWindowForChat();
                closeChat();
            }
        }
    }

    // function createNewWindowForChat(){
    //     const newWindow = document.createElement('div');
    //     newWindow.style.display = 'block';
    //     newWindow.innerHTML = "qwertyuio";
    //     divWindowUsers.appendChild(newWindow);
    // }

    function closeChat()
    {
        const pRemoveChat = document.querySelectorAll('.close');
            for(let i = 0; i < pRemoveChat.length; i++){
                  pRemoveChat[i].onclick = function(){
                        pRemoveChat[i].parentNode.parentNode.removeChild(pRemoveChat[i].parentNode);
                  }
            }
    }
    buttonStyleMessage();
    setInterval(function () {
        usersInChat("GET", "https://studentschat.herokuapp.com/users")
    }, 500);
    setInterval(function () { isShowMessage("GET", "https://studentschat.herokuapp.com/messages") }, 1000);
    isShowCurrentDate();

    // window.setTimeout(function () {
    //     window.location.reload();
    // }, 300000);
}

