class Filme {
    constructor(titulo, ano, genero) {
      this.titulo = titulo;
      this.ano = ano;
      this.genero = genero;
    }

    getTitulo(){
        return this.titulo;
    }

    getAno(){
        return this.ano;
    }

    getGenero(){
        return this.genero;
    }

}

function showFilm(){
    debugger;
    var filmes = [new Filme("Carga Explosiva1","2003","Ação"),
                  new Filme("Carga Explosiva2","2006","Ação"),
                  new Filme("Carga Explosiva3","2009","Ação")];
    document.getElementById("filmes").innerHTML = "";
    for(var i = 0; i < 3; i++){        
        document.getElementById("filmes").innerHTML += "título: "+ filmes[i].titulo +" ano: "+ filmes[i].ano +" gênero: "+ filmes[i].genero +"\n";
    }
}