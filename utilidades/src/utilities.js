/*
Pone title sobre uno o varios elementos
Ejemplo:
	cargarToolTip([[elementId,mensaje],...]
	cargarToolTip([['btn_finalizar','Finalizar'],['btn_continuar','Buscar']]);
*/
function cargarToolTips(arrayElementsId){
	var tamanio = arrayElementsId.length;
	for (var i = 0; i < tamanio; i++) {
		document.getElementById(arrayElementsId[i][0]).title = arrayElementsId[i][1];
	}
}

/*
Cambia el cursor a un puntero sobre el elemento
Ejemplo:
	setCursorPointer(['btn_finalizar',btn_continuar']);
*/
function setCursorPointer(arrayElementsId){
	var tamanio = arrayElementsId.length;
	for (var i = 0; i < tamanio; i++) {
		document.getElementById(arrayElementsId[i]).style.cursor = "pointer";
	}
}

function changePic1(e) {
    e.style.cursor = "pointer"; // cambio el puntero cuando esta encima del elemento
    var tipos = ["png","gif","jpg"];
    var i;
    for (i = 0; i < tipos.length; i++){
        if (e.src.split("."+tipos[i])[1] === ""){
            break;
        }
    }
	e.src = [e.src.split("."+tipos[i])[0],"2."+tipos[i]].join("");
}

function changePic2(e){
    var tipos = ["png","gif","jpg"];
    var i;
    for (i = 0; i < tipos.length; i++){
        if (e.src.split("."+tipos[i])[1] === ""){
            break;
        }
    }
	e.src = [e.src.split("2."+tipos[i])[0],"."+tipos[i]].join("");
}


/*
Cambia la imagen segun el id y el grupo de <img>
*/
function changeTabs(idTab,clase){
	var path, index;
	var tabs = document.querySelectorAll("." + clase);
	for (var i = 0; i < tabs.length; i++){
		index = tabs[i].src.indexOf("2.png");
		if (index > 0){
			tabs[i].src = tabs[i].src.substring(0,index) + ".png";
		}
	}
	path = tabs[idTab-1].src;
	tabs[idTab-1].src = path.substring(0,path.indexOf(".png")) + "2.png";
}
/*
Sirve para cambiar el src de un img en pantalla cuando hace click sobre ella.
Por ejemplo se suele usar en pestañas	
*/
function changeTabsWithImage(idTab,clase){
	var tabs = document.querySelectorAll("." + clase);
	var path = tabs[idTab].src;
	var ext = path.substr(path.length - 4);
	if (path.substr(path.length - 5) !== '2'+ext) return;
	for (var i = 0; i < tabs.length; i++){
		var src = tabs[i].src;
		var last5chars = src.substr(src.length-5);
		tabs[i].src = src.substring(0, src.length - (last5chars === '2'+ext ? 5 : 4)) + '2' + ext;
	}
	tabs[idTab].src = path.substring(0, path.length - 5) + ext;
}

function changeTabsWithStyle(idTab,clase,classClicked){
  var tabs = document.querySelectorAll("." + clase);
  for (var i = 0; i < tabs.length; i++) {
    changeStyleElement(tabs[i], (tabs[i].id === idTab), classClicked);
  }
}

function changeStyleElement(elem, clicked, classClicked) {
  if (clicked) {
    elem.className = elem.className.split(' ')[0] + ' ' + classClicked;
  } else {
    elem.className = elem.className.split(' ')[0];
  }
}



// Tilda o destilda toda una columna formada por checkbox segun el tercer parametro.
function CheckTodaUnaColumna(tabla_ctl, nro_columna, bool){
	
	var tabla = document.getElementsByName(tabla_ctl)[0];
	
	if (tabla.tBodies.length === 0 || tabla.tBodies[0].rows.length === 0) return;
	
	var filas = tabla.tBodies[0].rows;
	
	for (var i = 0; i<filas.length; i++){
		filas[i].cells[nro_columna].getElementsByTagName('input')[0].checked = bool;
	}
} 

function TildarDestildarChecks(tabla_ctl, nro_columna, checkbox){
	if(checkbox.checked)
		CheckTodaUnaColumna(tabla_ctl, nro_columna - 1, true);
	else
		CheckTodaUnaColumna(tabla_ctl, nro_columna - 1, false);
}

function RemoveHeaderTable(tabla_ctl){
	var tabla = document.getElementsByName(tabla_ctl)[0];
	if (!tabla) return;
	tabla.deleteTHead();	
}

function ChangeColorBorderTable(tabla_ctl, color){
	var tabla = document.getElementsByName(tabla_ctl)[0];
	if (!tabla) return;
	tabla.parentNode.style.border = "1px solid " + (color ? color : "white");
}

function ChangeColorBorderAllTables(color){
	var divs = document.querySelectorAll('.scrollTableContainer');
	if (!divs) return;
	for (var i = 0; i < divs.length; i++){
		if (color) {
			divs[i].style.borderColor = color
		} else {
			divs[i].style.borderStyle = "none";
		}
	}
}

function OcultarLabelEngage(texto){
    var etiquetas = document.getElementsByTagName('div'); // labelDiv es el name de los labels de engage
    for (var i = 0; i < etiquetas.length; i++) {
        if (etiquetas[i].getAttribute("name") === 'labelDiv' && etiquetas[i].innerText === texto) {
            etiquetas[i].style.visibility = 'hidden';
            break;
        }
    } 
}

// Cambias el color de fondo del tag padre
function CambiarColorFondo(clase, color){
    var tds = document.querySelectorAll('.'+clase); 
    for (var i=0; i<tds.length; i++){tds[i].parentNode.style.background = color;}
}


function GrabarIdCheckboxSeleccionados(clase, campoTmt){
    //var polizas = document.getElementsByClassName(clase);
    var polizas = document.querySelectorAll('.'+clase);
    var seleccionados = [];
    for (var i = 0; i < polizas.length; i++){
        if (polizas[i].checked){
            seleccionados.push(polizas[i].id);
        }
    }
    almacenarSeleccion(campoTmt, seleccionados.length + '|' + seleccionados.join('|'));
    return seleccionados.length;
}

// Sirve para dimensionar el ancho de una columna de una grilla engage
function ResizeWidthColumn(clase, px){
    var elementos = document.querySelectorAll('.'+clase);
    for (var i = 0; i < elementos.length; i++){
        elementos[i].parentNode.style.width = px + 'px';
    }
}

// Oculta campos input de 1x1
function OcultarCampos() {
    var inputs = document.getElementsByTagName('input');
    var len = inputs.length;
    for (var i = 0; i < len; i++) {
        if (inputs[i].style.height === '1px' && inputs[i].style.width === '1px') {
            inputs[i].style.visibility = 'hidden';
        }
    }
}

function EditarUnValorDentroDeTabla(clave, fnGrabar){
  var div = document.getElementById(clave);
  if (div.childNodes.length > 1) return;
  var prev = Object.assign({}, {dato: div.innerHTML});

  var input = document.createElement("INPUT");
  input.setAttribute('id', 'input_'+clave)
  input.setAttribute("type", "text");
  input.setAttribute("value", prev.dato);
  
  var img_ok = document.createElement('IMG');
  img_ok.setAttribute("src","./../fotos/ok_icon.png");
  img_ok.onclick = function(){fnGrabar(clave);};
  img_ok.style.margin = '0px 2px';
  
  var img_cancel = document.createElement('IMG');
  img_cancel.setAttribute("src","./../fotos/cancel_icon.png");
  img_cancel.onclick = function(){ div.innerHTML = prev.dato };
  img_cancel.style.margin = '0px 2px';

  div.innerHTML = '';

  div.appendChild(input);
  div.appendChild(img_ok);
  div.appendChild(img_cancel);  
}


// Si Object.assign no esta definido
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // pasamos si es undefined o null
        for (var nextKey in nextSource) {
          // Evita un error cuando 'hasOwnProperty' ha sido sobrescrito
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

function setValueHtml(value, storeId){
	var store = document.getElementById(storeId);
    if (!store) {
        store = document.createElement('input');
        store.id = storeId;
        store.type = 'hidden';
        document.body.appendChild(store);
    }
    store.value = value;
}

function getValueHtml(field, ctl, storeId){
  var inputEng = document.getElementsByName('CALL.'+field+':ctl_'+ctl)[0];
  if (!inputEng) return;
  setValueHtml(inputEng.value, storeId);
}


function DoClickTabWhenRefresh(tabId, defectoId, fn){
  if (!tabId) tabId = defectoId;
  if (!defectoId) return;
  if (tabId === defectoId) {
    if (fn) {
      fn(defectoId);
      return;
    }
  } else {
    var elemento = document.getElementById(tabId);
    if (!elemento) return;
    setTimeout(function(){ elemento.click() },500);
  }
}


function waitForElement(elemId, callback, iframeId){
  var iframe, elemento;
  if (iframeId) {
    iframe = document.getElementById(iframeId);
  }
  if (iframe) {
    elemento = iframe.contentWindow.document.getElementById('Actividad').contentWindow.document.getElementById(elemId);
  } else {
    elemento = document.getElementById(elemId);
  }

  if (elemento) {
    callback();
  } else {
    setTimeout(function(){
      waitForElement(elemId, callback, iframeId);
    }, 100);
  }
}