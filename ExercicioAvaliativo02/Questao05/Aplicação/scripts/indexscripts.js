function somarCampos(){
    debugger;
    var valor1 = document.getElementById("field1").value;
    var valor2 = document.getElementById("field2").value;
    var valor3 = document.getElementById("field3").value;

    if(valor1 == ""){
        valor1 = "0";
    }
    if(valor2 == ""){
        valor2 = "0";
    }
    if(valor3 == ""){
        valor3 = "0";
    }
    var soma = parseInt(valor1) + parseInt(valor2) + parseInt(valor3);

    var paridade = "";
    if((soma % 2) == 0){
        paridade = "par";
    }else{
        paridade = "ímpar";
    }

    alert("O resultado da soma do campo1 + campo2 + campo3 é igual a: "+ soma + "\n"+
          "A soma é "+ paridade);
}