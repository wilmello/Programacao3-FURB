
//Váriaveis Globais

$(document).ready(function() {
    document.getElementById("nome_login").focus();
});

function validaLogin() {    
    var user = document.getElementById("nome_login").value;
    var password = document.getElementById("senha_login").value;

    var result = sendAPI("GET", 
                         "http://localhost:5000/api/v1/player?name="+ user +"&password="+ password, 
                         false, 
                         null);
    
    if (result != null) {
        if(!result.active){
        localStorage.setItem("idPlayer", result.id);
        localStorage.setItem("nickName", result.nickname);
        window.location.href = "lobby/";
        }else{
            alert("Usuário logado!")
            return;
        }
    } else {
        alert("Usuário inválido!");
    }
}

//@Creditos William Mello
function sendAPI(method, // Método de submissão
                 url,    // Endereço da API + Recurso da API
                 assync, // Síncrono ou Assincrono
                 body    // Corpo da solicitação
                ){

    var result; // Retorno, caso exista...

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4
        && this.status == 200) {
            result = JSON.parse(this.responseText); // JSON to Object
            result = result.data; //Retorna os dados dos empregados
        }
    }
    xhttp.open(method, url, assync);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if(body != null){
        xhttp.send( body );
    }else{
        xhttp.send();        
    }
    return result; //Retorna dos dados do servidor (API)
}