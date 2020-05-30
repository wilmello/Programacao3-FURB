
function copyText(text){
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function copyWhatsApp(){
    copyText("(48)998236290");
}

function copyHotmail(){    
    copyText("amp_maquinas@hotmail.com");    
}

function copyFacebook(){    
    copyText("facebook_amp_eletrons");    
}