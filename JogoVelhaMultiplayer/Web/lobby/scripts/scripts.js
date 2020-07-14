$(document).ready(function() {
    //localStorage.setItem("idPlayer", 1);
    if((typeof(localStorage) != "undefined")
    && (localStorage.getItem("idPlayer") != null)){
        sessionStorage.setItem("idPlayer", localStorage.getItem("idPlayer"));
        localStorage.removeItem("idPlayer");
    }else{
        window.location.href = "../"
    }
    
    activePlayer();
        
    setTimeout(function(){
        updateAvaliableRooms();
    }, 2500);
});

function updateAvaliableRooms(){            
    $("tr").remove();

    var roomsAvaliable = getAvaliableRooms();

    if(roomsAvaliable[0]!= null){
        var columnName;
        var columnAction;
        var link;
        for(var i = 0; i < roomsAvaliable.length; i++){            
            var line = document.createElement("tr"); // Linha do registro
                    
            columnName   = document.createElement("td");
            columnAction = document.createElement("td");

            columnName.innerHTML = roomsAvaliable[i].name;                        
            
            columnAction.innerHTML = "+";
                                 
            columnAction.setAttribute("onclick", "joinRoom("+ roomsAvaliable[i].id +")"); // Maldito onclick que ninguem do google sabe como setar, kkkkk            
            columnAction.setAttribute("id","buttonJoinRoom");
            columnAction.setAttribute("class","button blue");                    
            
            line.appendChild( columnName );
            line.appendChild( columnAction );

            $(".tableLobby").append( line );
        }                
    }    
    setTimeout(function(){
        updateAvaliableRooms();
    }, 2500);
}

function getAvaliableRooms(){
    var result = sendAPI("GET",
                         "http://restapigame.ddns.net:5000/api/v1/RoomPlayer",
                         false,
                         null); 
    return result;
}

function activePlayer(){    
    var object = returnPlayer( sessionStorage.getItem("idPlayer") );
    object.active = true;
    
    json = JSON.stringify(object);
    
    var player = sendAPI("PUT",
                         "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                         false,
                         json); // Ativar o usuário, caso ainda não esteja ativo
    showNicknamePlayer( player );        
}

function showNicknamePlayer( player ){
    $(".nameplayer").html(player.nickname);
}

function desactivePlayer(){
    var object = returnPlayer( sessionStorage.getItem("idPlayer") );
    object.active = false;
    
    json = JSON.stringify(object);

    sendAPI("PUT",
            "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
            false,
            json); // Ativar o usuário, caso ainda não esteja ativo    
}

function returnPlayer(idplayer){
    var url = "http://restapigame.ddns.net:5000/api/v1/Player";
    if(idplayer > 0){
        url = url +"?idplayer="+ idplayer;
    } 
    return sendAPI("GET",
                   url,
                   false,
                   null);
}

function disconnect(){
    desactivePlayer();
    window.location.href = "../"; // Volta para o login 
}

function addRoom(){     
    $("#edNameRoom").val("");
    $("#edNameRoom").css("border-color","#ced4da");
    if($("#smallAlert").length > 0){
        $("#smallAlert").remove();
    }    
    document.getElementById("edNameRoom").focus();
}

function createRoom(){    
    var nameRoom = $("#edNameRoom").val();
    if(nameRoom != ""){        
        var room = sendAPI("POST",
                           "http://restapigame.ddns.net:5000/api/v1/room?nameroom="+ nameRoom,
                           false,
                           null           
                           );
        joinRoom(room.id);
    }else{
        if($("#smallAlert").length == 0){
            $("#edNameRoom").css("border-color","red");
            var smallAlert = document.createElement("small");
            smallAlert.setAttribute("id","smallAlert");
            smallAlert.innerHTML = "O nome da sala precisa ser preenchido";
            $("#edNameRoom").after(smallAlert);
        }    
    }
}

function joinRoom(idRoom){
    localStorage.setItem("idPlayer", sessionStorage.getItem("idPlayer"));
    localStorage.setItem("idRoom", idRoom);
    sessionStorage.removeItem("idPlayer");
    window.location.href = "room/";
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
            result = JSON.parse( this.responseText ); // JSON to Object
            result = result.data; //Retorna os dados necessários
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