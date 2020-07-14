
function cadastrarUsuario() {    
    if(validateDuplicatedNickname()){
        savePlayer();
    }    
}

function validateDuplicatedNickname(){
    var user = document.getElementById("nome_cad").value;    

    var result = sendAPI("GET", 
                         "http://localhost:5000/api/v1/player", 
                         false, 
                         null);

    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].nickname == user) {
                alert("Usuário já existente, por favor informe outro nome!");
                limparFormUsuario();
                return false;
            }
        }
    }
    return true;
}
function savePlayer(){
    var user = document.getElementById("nome_cad").value;
    var password = document.getElementById("senha_cad").value;
    var confimerdPassword = document.getElementById("senha_cad_confirm").value;

    if (password != confimerdPassword) {
        alert("Senhas divergentes, por favor verifique!")
        limparFormSenha();
    }else{
        var objUser = new Object();
        objUser.nickname = user;
        objUser.password = password;
        jsonUser = JSON.stringify(objUser);
        debugger;
        result = sendAPI("POST", 
                         "http://localhost:5000/api/v1/player",
                         false, 
                         jsonUser);

        //Caso cadastro seja efetuado redireciona o mesmo para o lobby!
        if(result != null){
            limparFormCadastro();
            localStorage.setItem("idPlayer", result.id);
            localStorage.setItem("nickName", result.nickname);
            window.location.href = "../lobby/"
        }
    }
}

function limparFormCadastro() {
    document.getElementById("nome_cad").value = "";
    document.getElementById("senha_cad").value = "";
    document.getElementById("senha_cad_confirm").value = "";
}

function limparFormSenha() {
    document.getElementById("senha_cad").value = "";
    document.getElementById("senha_cad_confirm").value = "";
}

function limparFormUsuario() {
    document.getElementById("nome_cad").value = "";
}

function sendAPI(method, // Método de submissão
                 url,    // Endereço da API + Recurso da API
                 assync, // Síncrono ou Assincrono
                 body    // Corpo da solicitação
                ) {

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