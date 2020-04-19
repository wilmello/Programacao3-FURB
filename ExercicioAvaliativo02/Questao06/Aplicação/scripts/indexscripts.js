function fatRecursivo(valor){
    if(parseInt(valor) > 0){
        return parseInt(valor) * fatRecursivo(parseInt(valor)-1);
    }else{
        return 1;
    }    
}

function fatorial(){    
    var valor = document.getElementById("input").value;    
    document.getElementById("resultado").innerHTML = fatRecursivo(valor);    
}