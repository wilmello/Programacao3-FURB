function addList(){
    debugger;
    var newtopic = document.getElementById('newtopic').value;
    var select = document.getElementById('cboptions');
    var option = document.createElement('option');
    option.appendChild( document.createTextNode(newtopic) );
    option.value = newtopic;
    select.appendChild(option);
    document.getElementById('newtopic').value = "";
}

function generateList(){
    debugger;
    var body = document.getElementsByTagName("body")[0];
    var titleList = document.getElementById('title').value;
    
    /*var table = document.getElementById('lista');    */
    var table = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var td = document.createElement("td");
    
    td.appendChild( document.createTextNode( titleList ) );

    td.style.fontWeight = "bold";

    row.appendChild( td );
    tblBody.appendChild( row );
    table.appendChild( tblBody );
    /*table.setAttribute("border", "2");*/
    body.appendChild(table);

    var row2 = document.createElement("tr");
    var tblBody2 = document.createElement("tbody");
    var td2 = document.createElement("td");

    var combo = document.getElementById("cboptions");

    var i;
    var ul = document.createElement("ul");
    for (i = 0; i < combo.length; i = i + 1) {
        var li = document.createElement("li");
        li.appendChild( document.createTextNode(combo.options[i].value) );
        li.style.fontSize = "16px";
        li.style.fontFamily = "arial";        
        li.style.color = "blue";
        ul.appendChild(li);
    }
    td2.appendChild(ul);
    row2.appendChild(td2);
    tblBody2.appendChild(row2);
    table.appendChild(tblBody2);
}

function addArray(){
    var array = ["Pepino", "Tomate", "Repolho", "Beterraba"];
    debugger;
    var body = document.getElementsByTagName("body")[0];
    var titleList = document.getElementById('title').value;
    
    /*var table = document.getElementById('lista');    */
    var table = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var td = document.createElement("td");
    
    td.appendChild( document.createTextNode( titleList ) );

    td.style.fontWeight = "bold";

    row.appendChild( td );
    tblBody.appendChild( row );
    table.appendChild( tblBody );
    /*table.setAttribute("border", "2");*/
    body.appendChild(table);

    var row2 = document.createElement("tr");
    var tblBody2 = document.createElement("tbody");
    var td2 = document.createElement("td");

    var i;
    var ul = document.createElement("ul");
    for (i = 0; i < array.length; i = i + 1) {
        var li = document.createElement("li");
        li.appendChild( document.createTextNode(array[i]) );
        li.style.fontSize = "16px";
        li.style.fontFamily = "arial";        
        li.style.color = "blue";
        ul.appendChild(li);
    }
    td2.appendChild(ul);
    row2.appendChild(td2);
    tblBody2.appendChild(row2);
    table.appendChild(tblBody2);
}