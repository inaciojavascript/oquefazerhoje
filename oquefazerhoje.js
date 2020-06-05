/*Declaração de variáveis globais*/
var Lista=document.getElementById('lista');
var Enviar=document.getElementById('enviar');
var Texto=document.getElementById('texto');
const Clear = document.getElementById('resete');
var todosArray= new Array;



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
	
		Clear.addEventListener('click',() => this.resete());
	}
	remove(b){
		/*remove item*/
	
		/*Upper case para padronizar busca*/
		var cont=todosArray.length;
		for (var i = 0; i < cont; i++) {
			todosArray[i]=todosArray[i].toUpperCase();
		}
		/*busca texto do elemento e remove no array*/
		var vai=b.innerText;
		console.log(vai);
		var index = todosArray.indexOf(vai);
		if(index>-1){
			todosArray.splice(index,1);
		}
		/*Reenvia array para local storage*/
		window.localStorage.setItem("todosLocal", JSON.stringify(todosArray));
		/*remove node filho*/
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
	resete(){
		/*zera array*/
		var cont=todosArray.length;
		for (var i = 0; i < cont; i++) {
			todosArray.pop();
		}
		/*remove local storage*/
		localStorage.removeItem("todosLocal");
		/*remove nodesChilds*/
		var child=Lista.lastElementChild;
		while (child){
			Lista.removeChild(child);
			child=Lista.lastElementChild;
		}
	}
}

/*Local storage*/

if(localStorage.todosLocal){
	todosArray = JSON.parse(window.localStorage.getItem("todosLocal"));
	for (var i = 0; i < todosArray.length; i++) {
		new Item(todosArray[i]);
	}
}else{
    window.localStorage.setItem("todosLocal", JSON.stringify(todosArray));
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
		todosArray.push(Texto.value);
		window.localStorage.setItem("todosLocal", JSON.stringify(todosArray));
		Texto.value='';
	}
	Texto.focus();
}
