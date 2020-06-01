
function validaCampos(){
    debugger;
    nome = document.getElementById("nome").value;
    if(nome.trim() == ""){
        alert("O nome precisa ser preenchido.");        
    }else{
        sobreNome = document.getElementById("sobreNome").value;
        if(sobreNome.trim() == ""){
            alert("O sobrenome precisa ser preenchido.");
        }else{
            senha = document.getElementById("senha").value;
            if(senha.trim() == ""){
                alert("A senha precisa ser preenchida.");
            }else{
                confirmaSenha = document.getElementById("confirmaSenha").value;
                if(confirmaSenha.trim() == ""){
                    alert("É preciso confirmar a senha.");
                }else{
                    if(senha != confirmaSenha){
                        alert("A confirmação da senha está diferente da senha.");
                    }else{                                                
                        email = document.getElementById("email").value;
                        if(email.trim() == ""){
                            alert("O e-mail precisa ser preenchido.");
                        }else{                            
                            email = email.toLowerCase();
                            if((email.indexOf("@hotmail.com") < 5)
                            && (email.indexOf("@gmail.com") < 5)){
                                alert("E-mail inválido. Só é permitido e-mails da Google e da Microsoft.");
                            }else{
                                confirmaEmail = document.getElementById("confirmaEmail").value;
                                if(confirmaEmail.trim() == ""){
                                    alert("É preciso confirmar o e-mail");
                                }else{
                                    if(email != confirmaEmail){
                                        alert("A confirmação do e-mail está diferente do e-mail.");
                                    }else{
                                        nomeUsuario = document.getElementById("nomeUsuario").value;
                                        if(nomeUsuario.trim() == ""){
                                            alert("O nome de usuário precisa ser preenchido.");
                                        }else{
                                            telefone = document.getElementById("telefone").value;
                                            if(telefone.trim() == ""){
                                                alert("O telefone precisa ser preenchido.");
                                            }else{                                            
                                                if(!document.getElementById("termos").checked){
                                                    alert("É preciso confirmar os termos.");
                                                }
                                            }
                                        }
                                    }
                                }
                            }   
                        }
                    }
                }
            }
        }
    }                        
}

function limparcampos(){
    //debugger;
    document.getElementById("nome").value = "";    
    document.getElementById("sobreNome").value = "";    
    document.getElementById("senha").value = "";    
    document.getElementById("confirmaSenha").value = "";    
    document.getElementById("email").value = "";                        
    document.getElementById("confirmaEmail").value = "";                                
    document.getElementById("nomeUsuario").value = "";                                
    document.getElementById("telefone").value = "";                                
    document.getElementById("termos").checked = false;
}