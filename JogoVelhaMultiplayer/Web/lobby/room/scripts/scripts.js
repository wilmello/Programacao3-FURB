$(document).ready(function(){    
    //localStorage.setItem("idPlayer", 62);
    //localStorage.setItem("idRoom", 124);
    if((typeof(localStorage) != "undefined")
    && (localStorage.getItem("idPlayer") != null)
    && (localStorage.getItem("idRoom") != null)){
        sessionStorage.setItem("idPlayer", localStorage.getItem("idPlayer"));
        sessionStorage.setItem("idRoom", localStorage.getItem("idRoom"));
        localStorage.removeItem("idPlayer");
        localStorage.removeItem("idRoom");
    }else{
        window.location.href = "../../";
    }    

    createLinkRoomPlayer();    
    
    var room = getRoom();    

    var player = getPlayer();

    showNicknamePlayer( player.data );

    $("#titleRoom").text( room.data.name );
    
    document.title = document.title +" "+ room.data.name;
    
    loadIcons();

    setTimeout(function(){
        updatePlayer()
    }, 2500);
})

function saveIconPlayer(){
    var icons = sendAPI("GET",
                       "http://restapigame.ddns.net:5000/api/v1/icon",
                       false,
                       null);
    icons = icons.data;
    var iconSelected = document.getElementsByClassName("dropdown-item active");
    for(var i = 0; i < icons.length; i++){
        if(icons[i].name == iconSelected[0].textContent){
            var player = sendAPI("GET",
                                 "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                                 false,
                                 null);
            player = player.data;
            player.icongame = icons[i].id;
            jsonUser = JSON.stringify(player);

            sendAPI("PUT",
                    "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                    false,
                    jsonUser);
            return;
        }
    }
}

function resetImgGame(){    
    var player = sendAPI("GET",
                         "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                         false,
                         null);
    player = player.data;                     
    var icon = sendAPI("GET",
                       "http://restapigame.ddns.net:5000/api/v1/icon?idicon="+ player.icongame,
                       false,
                       null);
    icon = icon.data;
    var img = document.getElementById("imgselected");
    img.setAttribute("src", icon.address);
    var icons = document.getElementsByClassName("dropdown-item");
    for(var i = 0; i < icons.length; i++){
        if(icons[i].textContent == icon.name){
            icons[i].setAttribute("class","dropdown-item active");
        }else{
            icons[i].setAttribute("class","dropdown-item");
        }
    }

}

function loadIcons(){
    var icons = sendAPI("GET",
                        "http://restapigame.ddns.net:5000/api/v1/icon",
                        false,
                        null);
    if(icons.data != null){
        var player = sendAPI("GET",
                             "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                             false,
                             null);
        player = player.data;                     
        icons = icons.data;
        for(var i = 0; i < icons.length; i++){            
            var item = document.createElement("a");
            item.innerHTML = icons[i].name;            
            if(player.icongame == icons[i].id){
                item.setAttribute("class", "dropdown-item active");
                var img = document.getElementById("imgselected");
                img.setAttribute("src",icons[i].address);
            }else{
                item.setAttribute("class", "dropdown-item");
            }
            item.setAttribute("href","#");
            item.setAttribute("onclick", "selectIcon('"+ icons[i].name +"','"+ icons[i].address +"')");
            $("#iconsgame").append(item);
        }        
    }
}

function selectIcon(nameIcon, addressIcon){
    var img = document.getElementById("imgselected");
    img.setAttribute("src", addressIcon);
    var icons = document.getElementsByClassName("dropdown-item");
    for(var i = 0; i < icons.length; i++){
        if(icons[i].textContent == nameIcon){
            icons[i].setAttribute("class","dropdown-item active");
        }else{
            icons[i].setAttribute("class","dropdown-item");
        }
    }
}

function createLinkRoomPlayer(){
    sendAPI("POST",
            "http://restapigame.ddns.net:5000/api/v1/roomplayer?idplayer="+ sessionStorage.getItem("idPlayer") +"&idroom="+ sessionStorage.getItem("idRoom"),
            false,
            null
            );
}

function getRoom(){
    return sendAPI("GET",
                   "http://restapigame.ddns.net:5000/api/v1/room?idroom="+ sessionStorage.getItem("idRoom"),
                   false,
                   null);
}

function getPlayer(){
    return sendAPI("GET",
                   "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                   false,
                   null);
}

function leaveRoom(){
    destroyLinkRoomPlayer();
    localStorage.setItem("idPlayer", sessionStorage.getItem("idPlayer"));    
    window.location.href = "../";
}

function destroyLinkRoomPlayer(){
    sendAPI("DELETE",
            "http://restapigame.ddns.net:5000/api/v1/roomplayer?idroom="+ sessionStorage.getItem("idRoom") +"&idplayer="+ sessionStorage.getItem("idPlayer"),
            false,
            null
            );
}

function updatePlayer(){
    //alert("2,5 segundos");    
    var players = sendAPI("GET",
                          "http://restapigame.ddns.net:5000/api/v1/roomplayer?idroom="+ sessionStorage.getItem("idRoom"),
                          false,
                          null);    
    $("tr").remove();
    var buttonPlay = document.getElementById("play");
    buttonPlay.setAttribute("onclick","");
    if(players.data.length > 0){
        if(players.data.length == 2){            
            buttonPlay.setAttribute("onclick","startGame()");
        }
        for(var i = 0; i < players.data.length; i++){
            if($("#idPlayer"+ players.data[i].id).text() == ""){
                var line = document.createElement("tr");
                var column = document.createElement("td");
                column.innerHTML = players.data[i].nickname;
                column.setAttribute("id","idPlayer"+ players.data[i].id);
                line.appendChild(column);
                $("#tablePlayers").append(line);
            }
        }
    }
    setTimeout(function(){
        updatePlayer()
    }, 2500);
}

function startGame(){
    sendAPI("POST",
            "http://restapigame.ddns.net:5000/api/v1/gameboard?idroom="+ sessionStorage.getItem("idRoom"),
            false,
            null
            );
    localStorage.setItem("idPlayer", sessionStorage.getItem("idPlayer"));
    localStorage.setItem("idRoom", sessionStorage.getItem("idRoom"));
    sessionStorage.removeItem("idPlayer");
    sessionStorage.removeItem("idRoom");
    window.location.href = "game/";
}

function showNicknamePlayer( player ){
    $(".nameplayer").html(player.nickname);
}

function sendAPI(method, // Método de submissão
                 url,    // Endereço da API + Recurso da API
                 assync, // False = Síncrono ou True = Assincrono
                 body    // Corpo da solicitação
                ){    
    
    var result = null; // Retorno, caso exista...

    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){        
        if(this.readyState == 4
        && this.status == 200){
            //debugger;
            result = JSON.parse( this.responseText ); // JSON to Object
            //result = result //Retorna os dados necessários
        }
    }
    xhttp.open(method, url, assync); 
    xhttp.setRequestHeader("Content-Type","application/json");
    if(body != null){
        xhttp.send( body );
    }else{
        xhttp.send();        
    }
    return result; //Retorna dos dados do servidor (API)
}