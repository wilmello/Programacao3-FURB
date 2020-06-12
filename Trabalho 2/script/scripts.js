
$(document).ready(function(){
             
    loadEmployess();

});

function loadEmployess(){

    debugger;

    if(document.getElementById( "idTableEmployees" ) != null){
        $("#idTableEmployees").remove();
    }

    var employees = sendAPI("GET", "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/employees", false, null); // Solicita a requisição
                
    var header = document.createElement("tr"); //Cabeçalho
    
    var columnId           = document.createElement("th"); //Coluna ID
    var columnName         = document.createElement("th"); //Coluna Nome
    var columnSalary       = document.createElement("th"); //Coluna Salário
    var columnAge          = document.createElement("th"); //Coluna Idade
    var columnProfileImage = document.createElement("th"); //Coluna Avatar
    var columnAction       = document.createElement("th"); //Coluna Ações

    columnId.innerHTML           = "ID";
    columnName.innerHTML         = "Nome";
    columnSalary.innerHTML       = "Salário";
    columnAge.innerHTML          = "Idade";
    columnProfileImage.innerHTML = "Avatar";
    columnAction.innerHTML       = "Ações";

    header.appendChild( columnId );
    header.appendChild( columnName );
    header.appendChild( columnSalary );
    header.appendChild( columnAge );
    header.appendChild( columnProfileImage );
    header.appendChild( columnAction );

    var table = document.createElement("table");
    table.appendChild( header );
    
    for(var i = 0; i < employees.length; i++){        

        var line = document.createElement("tr"); // Linha do registro
        
        columnId           = document.createElement("td");                
        columnName         = document.createElement("td");                
        columnSalary       = document.createElement("td");                
        columnAge          = document.createElement("td");                
        columnProfileImage = document.createElement("td");
        columnAction       = document.createElement("td");
        
        columnId.innerHTML           = employees[i].id;
        columnName.innerHTML         = employees[i].employee_name;
        columnSalary.innerHTML       = "R$ "+ employees[i].employee_salary;
        columnAge.innerHTML          = employees[i].employee_age;
        columnProfileImage.innerHTML = employees[i].profile_imagem;
        
        ActionEdit   = document.createElement("img");
        ActionDelete = document.createElement("img");
        
        ActionEdit.setAttribute("id", "iconEdit");        
        ActionDelete.setAttribute("id", "iconDelete");

        ActionEdit.src   = "img/edit.png";
        ActionDelete.src = "img/delete.png";
                

        ActionEdit.setAttribute("onclick", "editEmployee("+ employees[i].id +",'"+ employees[i].employee_name +"','"+ employees[i].employee_salary +"','"+ employees[i].employee_age +"','"+ employees[i].profile_image +"')"); // Maldito onclick que ninguem do google sabe como setar, kkkkk
        ActionDelete.setAttribute("onclick", "deleteEmployee("+ employees[i].id +",'"+ employees[i].employee_name +"')"); // Maldito onclick que ninguem do google sabe como setar, kkkkk

        columnAction.appendChild( ActionEdit );
        columnAction.appendChild( ActionDelete );            

        line.appendChild( columnId );
        line.appendChild( columnName );
        line.appendChild( columnSalary );
        line.appendChild( columnAge );
        line.appendChild( columnProfileImage );
        line.appendChild( columnAction );

        table.appendChild( line );
    }

    table.setAttribute("class", "tableEmployees");
    table.setAttribute("id", "idTableEmployees");

    document.getElementById("componentMain").appendChild( table );    
}

function editEmployee(idEmployee, nameEmployee, salaryEmployee, ageEmployee, profileImageEmployee){    
    document.getElementById("titleForm").innerHTML   = "Empreado #"+ idEmployee;
    $('html, body').animate({scrollTop : 0},100);        
    document.getElementById("employee_id").value     = idEmployee;
    document.getElementById("employee_name").value   = nameEmployee;
// Simulando uma variável global em uma das propriedades do botão salvar kkkkkkkk    
    document.getElementById("employee_name").placeHolder = nameEmployee;    
// Simulando uma variável global em uma das propriedades do botão salvar kkkkkkkk    
    document.getElementById("employee_salary").value = salaryEmployee;
    document.getElementById("employee_age").value    = ageEmployee;
    document.getElementById("profile_image").value   = profileImageEmployee;
}

function saveEmployee(){

    //var spinner = document.createElement("span");
    //spinner.setAttribute("class","spinner-border spinner-border-sm");
    //spinner.setAttribute("id", "spinSave");    
    //document.getElementById("btnSave").innerHTML = "Salvando...";    
    //$("#btnSave").append( spinner );
    
    var employee_id = document.getElementById("employee_id").value;    

    if(employee_id == 0 
    || employee_id == ""
    || employee_id == null){
        //Se cair aqui é por que o cabomgue meteu um insert                        
        postEmployee();        
    }else{
        //Se cair aqui é por que o cabomgue meteu um update        
        putEmployee(employee_id);
    }
    loadEmployess();
    //$("#spinSave").remove();
    //$("#btnSave").innerHTML = "Salvar";
    //document.getElementById("btnSave").innerHTML = "Salvar";
}

function postEmployee(){

    //POST
    var myEmployeeInf           = new Object(); // Employee Object
    myEmployeeInf.name          = document.getElementById("employee_name").value;
    myEmployeeInf.salary        = document.getElementById("employee_salary").value;
    myEmployeeInf.age           = document.getElementById("employee_age").value;
    myEmployeeInf.profile_image = document.getElementById("profile_image").value;        
    myJSON                      = JSON.stringify( myEmployeeInf ); // String to JSON Object

    //sendAPI
    sendAPI("POST", 
            "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/create", 
            false,
            myJSON);
    
    successMessage("Empregado "+ myEmployeeInf.name +" adicionado com sucesso!");

    //RestarForm
    clearForm();    
    
}

function putEmployee(idEmployee){    

    //PUT
    var myEmployeeInf           = new Object(); // Employee Object
    myEmployeeInf.name          = document.getElementById("employee_name").value;
    myEmployeeInf.salary        = document.getElementById("employee_salary").value;
    myEmployeeInf.age           = document.getElementById("employee_age").value;
    myEmployeeInf.profile_image = document.getElementById("profile_image").value;        
    myJSON                      = JSON.stringify( myEmployeeInf ); // String to JSON Object

    //sendAPI
    sendAPI("PUT",
            "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/update/"+ idEmployee,
            false,
            myJSON
            );

    successMessage("Empregado "+ document.getElementById("employee_name").placeHolder +" atualizado com sucesso!");

    //RestarForm
    clearForm();    
}

function deleteEmployee(idEmployee, nameEmployee){
    
    if(confirm("Deseja realmente remover o empregado "+ nameEmployee +"?")){

        //Delete
        sendAPI("DELETE",
                "https://us-central1-rest-api-employees.cloudfunctions.net/api/v1/delete/"+ idEmployee,
                false,
                ""
                );
        successMessage("Empregado "+ nameEmployee +" removido com sucesso!");
        
        //RestarForm
        clearForm();
        loadEmployess();
    }
}

function sendAPI(method, // Método de submissão
                 url,    // Endereço da API + Recurso da API
                 assync, // Síncrono ou Assincrono
                 body    // Corpo da solicitação
                ){    

    var result; // Retorno, caso exista...

    var xhttp = new XMLHttpRequest();    
    xhttp.onreadystatechange = function(){        
        if(this.readyState == 4
        && this.status == 200){
            result = JSON.parse( this.responseText ); // JSON to Object
            result = result.data; //Retorna os dados dos empregados
        }
    }
    xhttp.open(method, url, assync); 
    xhttp.setRequestHeader("Content-Type","application/json");
    if(method == "POST"
    || method == "PUT"){
        xhttp.send( body );
    }else{// Esperado que seja o GET
        xhttp.send();
        return result; //Retorna o(s) dado(s) do(s) empregado(s)
    }    
}

function successMessage(message){    
    $('html, body').animate({scrollTop : 0},100);
    var divAlertSucess = document.createElement("div");
    divAlertSucess.setAttribute("class", "alert success");
    divAlertSucess.setAttribute("id", "divAlertSuccess");
    divAlertSucess.innerHTML = message;
    $("body").prepend( divAlertSucess );    
    setTimeout(timeOut, 5000);
}

function timeOut(){
    $("#divAlertSuccess").remove();
}

function clearForm(){    
    document.getElementById("titleForm").innerHTML   = "Novo Empregado";
    document.getElementById("employee_id").value     = "";
    document.getElementById("employee_name").value   = "";
    document.getElementById("employee_salary").value = "";
    document.getElementById("employee_age").value    = "";
    document.getElementById("profile_image").value   = "";
}
