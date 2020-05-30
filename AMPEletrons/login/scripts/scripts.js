
function validaUsuario(){
    //debugger;
    usuario = document.getElementById("usuario").value;
    if(usuario.trim() == ""){
        alert("O usuário precisa ser preenchido.");
    }else{
        senha = document.getElementById("senha").value;
        if(senha.trim() == ""){
            alert("A senha precisa ser preenchida.");
        }
    }
}