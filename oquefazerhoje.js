/*Declaração de variáveis globais*/
var Lista=document.getElementById('lista');
var Enviar=document.getElementById('enviar');
var Texto=document.getElementById('texto');

/*classe para criar e remover item*/
class Item{
	constructor(a){
		this.criarItem(a);
	}
	criarItem(a){
		/*criação dos elementos e atribuição de classes*/
		var ItemLi = document.createElement('li');
		ItemLi.classList.add('item');
		var ItemCirculo = document.createElement('i');
		ItemCirculo.classList.add('far');
		ItemCirculo.classList.add('fa-circle');
		ItemCirculo.classList.add('circle');
		var ItemP = document.createElement('p');
		ItemP.classList.add('texto');
		var ItemLixeira = document.createElement('i');
		ItemLixeira.classList.add('fas');
		ItemLixeira.classList.add('fa-trash-alt');
		ItemLixeira.classList.add('delete');
		/*Atribuir Nodes*/
		Lista.appendChild(ItemLi);
		ItemLi.appendChild(ItemCirculo);
		ItemLi.appendChild(ItemP);
		ItemLi.appendChild(ItemLixeira);
		var TextoInterno = document.createTextNode(a);
		ItemP.appendChild(TextoInterno);

		ItemLixeira.addEventListener('click', () => this.remove(ItemLi));

		ItemCirculo.addEventListener('click', () => this.check(ItemCirculo));
	}
	remove(b){
		Lista.removeChild(b);
	}
	check(ItemCirculo){
		if(ItemCirculo.classList.contains("fa-circle")==true){
			ItemCirculo.classList.remove("fa-circle");
			ItemCirculo.classList.add("fa-check-circle");
			ItemCirculo.style.color='yellow';
		}else {
			ItemCirculo.classList.remove("fa-check-circle");
			ItemCirculo.classList.add("fa-circle");
			ItemCirculo.style.color='white';
		}
		
	}
}
/*Entrada de texto e chamada da classe*/
Enviar.addEventListener('click',functexto);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		functexto();
	}
});

function functexto(){
	
	if(Texto.value != ""){
		new Item(Texto.value);
		Texto.value='';
	}
	Texto.focus();
}

