
$(document).ready(function(){
    //localStorage.setItem("idPlayer", 1);
    //localStorage.setItem("idRoom", 3);
    if((typeof(localStorage) != "undefined")
    && (localStorage.getItem("idPlayer") != null)
    && (localStorage.getItem("idRoom") != null)){
        sessionStorage.setItem("idPlayer", localStorage.getItem("idPlayer"));
        sessionStorage.setItem("idRoom", localStorage.getItem("idRoom"));
        localStorage.removeItem("idPlayer");
        localStorage.removeItem("idRoom");
    }else{
        window.location.href = "../../../";
    }

    updateStatusGame();

    setTimeout(function(){
        updateStatusGame()
    }, 2500);
})

function updateStatusGame(){    
    var gameBoard = returnGameBoardOpponent();
    gameBoards    = gameBoard.data;
    var empate    = false;
    if(gameBoards.length == 2){        
        var gameBoardOpponent = gameBoards[0]; // Adversário
        var gameBoardMy       = gameBoards[1]; // jogador Atual
        var playerOpponent    = sendAPI("GET",
                                        "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ gameBoardOpponent.idplayer,
                                        false,
                                        null);
        playerOpponent = playerOpponent.data;
        var iconOpponent      = sendAPI("GET",
                                        "http://restapigame.ddns.net:5000/api/v1/icon?idicon="+ playerOpponent.icongame,
                                        false,
                                        null);
        iconOpponent = iconOpponent.data;
        var someoneWon        = SomeoneWon(gameBoardOpponent, gameBoardMy);        
        if((someoneWon != null)
        || (gameBoardMy.inturn)){ // Só habilita os controles o cara estiver na vez dele                        
            empate = true;
            var cells = $("td");
            for(cell = 0; cell < cells.length; cell++){                    
                //debugger;
                if(((cell == 0) && (!gameBoardOpponent.pos1) && (!gameBoardMy.pos1))
                || ((cell == 1) && (!gameBoardOpponent.pos2) && (!gameBoardMy.pos2))
                || ((cell == 2) && (!gameBoardOpponent.pos3) && (!gameBoardMy.pos3))
                || ((cell == 3) && (!gameBoardOpponent.pos4) && (!gameBoardMy.pos4))
                || ((cell == 4) && (!gameBoardOpponent.pos5) && (!gameBoardMy.pos5))
                || ((cell == 5) && (!gameBoardOpponent.pos6) && (!gameBoardMy.pos6))
                || ((cell == 6) && (!gameBoardOpponent.pos7) && (!gameBoardMy.pos7)) // Só irá habilitar a posição da matriz, caso ninguem tenha jogado ainda nela
                || ((cell == 7) && (!gameBoardOpponent.pos8) && (!gameBoardMy.pos8)) // por isso ele verificar posição por posição
                || ((cell == 8) && (!gameBoardOpponent.pos9) && (!gameBoardMy.pos9))){                    
                    empate = false;
                    if(someoneWon == null){ 
                        // Se ninguém ganhou ainda, habilita os controles para continuar jogando
                        cells[cell].setAttribute("id","cell");
                        cells[cell].setAttribute("onclick","selectPos("+ (cell+1) +")");
                        empate = false;
                    }else{
                        //Se alguém ganhou, desativa todos os controles
                        cells[cell].setAttribute("id","");
                        cells[cell].setAttribute("onclick","");
                    
                    }
                }else{
                    if(((cell == 0) && (gameBoardOpponent.pos1))
                    || ((cell == 1) && (gameBoardOpponent.pos2))
                    || ((cell == 2) && (gameBoardOpponent.pos3))
                    || ((cell == 3) && (gameBoardOpponent.pos4))
                    || ((cell == 4) && (gameBoardOpponent.pos5))
                    || ((cell == 5) && (gameBoardOpponent.pos6))
                    || ((cell == 6) && (gameBoardOpponent.pos7))
                    || ((cell == 7) && (gameBoardOpponent.pos8))
                    || ((cell == 8) && (gameBoardOpponent.pos9))){ // Verifica se a posição é do adversário, para pintar com o desenho
                        cells[cell].style.backgroundImage    = "url('"+ iconOpponent.address +"')";
                        //cells[cell].style.backgroundImage    = "url('https://i.ibb.co/kSXZ89L/x1.png')";
                        cells[cell].style.backgroundPosition = "center top";
                        cells[cell].style.backgroundSize     = "auto 100%";
                        cells[cell].style.backgroundRepeat   = "no-repeat";
                    }
                    cells[cell].setAttribute("id","");
                    cells[cell].setAttribute("onclick","");
                }
            }            
        }else{
            if(!gameBoardMy.inturn){
                disableAllControls();
            }
        }   
        
        if(empate){
            alert("O jogo empatou!");
            exitGameBoard();
        }else{
            if(someoneWon != null){
                if(someoneWon.id == sessionStorage.getItem("idPlayer")){
                    alert("Você ganhou o jogo!! + 10 pontos na classificação.");
                    // Colocar aqui o método para aumentar a pontuação do jogador
                }else{
                    alert("Você não ganhou o jogo!!");
                }
                exitGameBoard();
            }else{
                setTimeout(function(){
                    updateStatusGame()
                }, 2500);
            }          
        }    
    }else{
        alert("O adversário saiu do jogo inesperadamente!! Você será redirecinado para a sala.");
        exitGameBoard();
    }        
}

function SomeoneWon(gameBoardOpponent, gameBoardMy){    
    if(( (gameBoardOpponent.pos1) && (gameBoardOpponent.pos2) && (gameBoardOpponent.pos3) )
    || ( (gameBoardOpponent.pos4) && (gameBoardOpponent.pos5) && (gameBoardOpponent.pos6) ) // Comparações horizontais
    || ( (gameBoardOpponent.pos7) && (gameBoardOpponent.pos8) && (gameBoardOpponent.pos9) )
    
    || ( (gameBoardOpponent.pos1) && (gameBoardOpponent.pos4) && (gameBoardOpponent.pos7) ) 
    || ( (gameBoardOpponent.pos2) && (gameBoardOpponent.pos5) && (gameBoardOpponent.pos8) ) // Comparações verticais
    || ( (gameBoardOpponent.pos3) && (gameBoardOpponent.pos6) && (gameBoardOpponent.pos9) )

    || ( (gameBoardOpponent.pos1) && (gameBoardOpponent.pos5) && (gameBoardOpponent.pos9) ) // Comparações diagonais
    || ( (gameBoardOpponent.pos3) && (gameBoardOpponent.pos5) && (gameBoardOpponent.pos7) ) ){
        // Adversário ganhou o jogo
        var player = sendAPI("GET",
                             "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ gameBoardOpponent.idplayer,
                             false,
                             null);
        return player.data;
    }else{
        if(( (gameBoardMy.pos1) && (gameBoardMy.pos2) && (gameBoardMy.pos3) )
        || ( (gameBoardMy.pos4) && (gameBoardMy.pos5) && (gameBoardMy.pos6) ) // Comparações horizontais
        || ( (gameBoardMy.pos7) && (gameBoardMy.pos8) && (gameBoardMy.pos9) )
        
        || ( (gameBoardMy.pos1) && (gameBoardMy.pos4) && (gameBoardMy.pos7) ) 
        || ( (gameBoardMy.pos2) && (gameBoardMy.pos5) && (gameBoardMy.pos8) ) // Comparações verticais
        || ( (gameBoardMy.pos3) && (gameBoardMy.pos6) && (gameBoardMy.pos9) )

        || ( (gameBoardMy.pos1) && (gameBoardMy.pos5) && (gameBoardMy.pos9) ) // Comparações diagonais
        || ( (gameBoardMy.pos3) && (gameBoardMy.pos5) && (gameBoardMy.pos7) ) ){
            // O jogador atual ganhou o jogo
            var player = sendAPI("GET",
                                 "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ gameBoardMy.idplayer,
                                 false,
                                 null);
            return player.data;
        }else{
            return null;
        }
    }    
}

function returnGameBoardOpponent(){
    return sendAPI("GET",
                   "http://restapigame.ddns.net:5000/api/v1/gameboard?idroom="+ sessionStorage.getItem("idRoom") +"&idplayer="+ sessionStorage.getItem("idPlayer"),
                   false,
                   null
                   );
}

function selectPos(pos){    
    sendAPI("PUT",
            "http://restapigame.ddns.net:5000/api/v1/gameboard?idroom="+ sessionStorage.getItem("idRoom") +"&idplayer="+ sessionStorage.getItem("idPlayer") +"&pos="+ pos,
            false,
            null
            );
    var player = sendAPI("GET",
                         "http://restapigame.ddns.net:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"),
                         false,
                         null
                         );
    player = player.data;
    var icon = sendAPI("GET",
                       "http://restapigame.ddns.net:5000/api/v1/icon?idicon="+ player.icongame,
                       false,
                       null
                       );
    icon = icon.data
    var cells = $("td");
    for(i = 0; i < cells.length; i++){
        if(i == (pos-1)){            
            cells[i].style.backgroundImage    = "url('"+ icon.address +"')";
            //cells[i].style.backgroundImage    = "url('https://i.ibb.co/dJhwyxG/nuclear2.png')";
            cells[i].style.backgroundPosition = "center top";
            cells[i].style.backgroundSize     = "auto 100%";
            cells[i].style.backgroundRepeat   = "no-repeat";
            cells[i].setAttribute("id","");
            cells[i].setAttribute("onclick","");
        }
    }
    disableAllControls();
}

function disableAllControls(){
    var cells = $("td");
    for(i = 0; i < cells.length; i++){        
        cells[i].setAttribute("id","");
        cells[i].setAttribute("onclick","");        
    }   
}

function exitGameBoard(){
    sendAPI("DELETE", // Remove o jogador da sala, caso ele tenha saído da partida
            "http://restapigame.ddns.net:5000/api/v1/gameboard?idroom="+ sessionStorage.getItem("idRoom") +"&idplayer="+ sessionStorage.getItem("idPlayer"),
            false,
            null
            );
    
    localStorage.setItem("idPlayer", sessionStorage.getItem("idPlayer"));
    localStorage.setItem("idRoom", sessionStorage.getItem("idRoom"));           

    sessionStorage.removeItem("idPlayer");
    sessionStorage.removeItem("idRoom");
    window.location.href = "../";
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