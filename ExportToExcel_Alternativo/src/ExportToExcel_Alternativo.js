function ExportToExcel(gridIndex, opts){
    var allGridsIds = null;
    var gridsCount = 0;
    if (!allGridsIds) {
        allGridsIds = [];
        var allDivTags = document.getElementsByTagName("DIV");
        if (allDivTags) {
            for (var i = 0; i < allDivTags.length; i++) {
                var divName = allDivTags[i].getAttribute("name");
                if (divName == 'sqlTableDiv' || divName == 'sqlGridDiv' || divName == 'sqlFilteredGridDiv') {
                    var id = "EngageGrid_" + gridsCount;
                    allGridsIds.push(id);
                    allDivTags[i].id = id;
                    gridsCount++;
                }
            }
        }
    }

    if (allGridsIds.length > 0) {
        if ((gridIndex >= 0) && (gridIndex < gridsCount)) {

            var newGridId = allGridsIds[gridIndex];
            newGridId = QuitarCombosDeGrillaFiltrada(newGridId); // Si es grilla filtrada, quitara los combos de los headers
            newGridId = (opts && opts.edit) ? EditarCeldas(newGridId, opts.edit) : newGridId;
            newGridId = (opts && opts.deny) ? EliminarColumnas(newGridId, opts.deny) : newGridId;

            $get('iframeSaveDocument').contentWindow.location.href = './../Aspx/ExportToExcel.aspx?GridId=' + newGridId;
        }
    }
}

/* ejemplo
    opts: {
        deny: [1,2,7],
        edit: [[col1,fn1],[col2,fn2],[col3,fn3]]
    }
*/


//////////////////////////////////     CORE        /////////////////////////////////////////////////

function CrearGrillaNueva(divGrid) {
    var div = document.getElementById('grilla_filtrada');
    if (!div) {
        var newDiv = document.createElement("div");     // creo un nuevo div
        newDiv.setAttribute("id", "grilla_filtrada");   // lo identifico al div
        newDiv.style.visibility = 'hidden';             // lo pongo invisible en la pantalla
        newDiv.appendChild(divGrid);                    // agrego la grilla con los cambios en esta
        document.body.appendChild(newDiv);              // la grilla creada lo pongo en la pantalla
    } else {
        div.innerHTML = '';         // vacio su contenido
        div.appendChild(divGrid);   // agrego con un nuevo contenido
    }
}


function EditarCeldas(gridId, edit){
    var divGrilla = document.getElementById(gridId);
    var divCloneGrilla = divGrilla.cloneNode(true);     // clono la original grilla para no alterar sus datos
    divCloneGrilla.id = divCloneGrilla.id + '_edit';    // le asigno un nuevo id al clon
    var divName = divCloneGrilla.getAttribute("name");

    // Selecciono la tabla correspondiente.
    // Si index es 0 => tipo tabla; si es 0 => tipo grilla
    var tabla = divCloneGrilla.getElementsByTagName('table')[(divName === 'sqlTableDiv') ? 0 : 1];
    
    // valido si el segundo parametro se ingreso.
    if (!edit.length) return gridId;

    if (tabla.tBodies && tabla.tBodies[0] && tabla.tBodies[0].rows.length){
        var body = tabla.tBodies[0];
        var cantFilas = body.rows.length;
        var cantColumnas = body.rows[0].cells.length;
        for (var i = 0; i < cantFilas; i++){
            var fila = body.rows[i];
            for (var k = 0; k < edit.length; k++){
                // Aplico la funcion al <td> objeto
                edit[k][1](fila.cells[edit[k][0] - 1]);
            }
        }

        CrearGrillaNueva(divCloneGrilla);
        return divCloneGrilla.id;
    } else {
        return gridId;
    }
    
}

function EliminarColumnas(gridId, deny){
    var divGrilla = document.getElementById(gridId);
    var divCloneGrilla = divGrilla.cloneNode(true);
    divCloneGrilla.id = divCloneGrilla.id + '_elim';
        
    function EliminarColumnasEnTabla(index){
        var tabla = divCloneGrilla.getElementsByTagName('table')[index];

        if (tabla.tHead && tabla.tHead.rows.length){
            var fila = tabla.tHead.rows[0];
            var cantTds = fila.cells.length;
            // la eliminacion es mutable, asi que guardo la cantidad de veces para sumar con el indice y eliminar la correcta.
            var eliminados = 0;
            for (var i = 0; i < deny.length; i++){
                // si el indice de columna a eliminar es mayor a la que hay, paso a la siguiente.
                if (deny[i]>cantTds) continue;
                // selecciono la celda para eliminar.
                var td = fila.cells[deny[i] - 1 - eliminados];
                // elimino
                fila.removeChild(td);
                eliminados++;
            }
        }

        // Eliminar columna del body[0] de la tabla.
        if (tabla.tBodies && tabla.tBodies[0]){
            var body = tabla.tBodies[0];
            var cantFilas = body.rows.length;
            var cantColumnas = body.rows[0].cells.length;
            for (var i = 0; i < cantFilas; i++){
                var fila = body.rows[i];
                var eliminados = 0;
                for (var k = 0; k < deny.length; k++){
                    // si el indice de columna a eliminar es mayor a la que hay, paso a la siguiente.
                    if (deny[k] > cantColumnas) continue;
                    // selecciono la celda para eliminar.
                    var td = fila.cells[deny[k] - 1 - eliminados];
                    // elimino
                    fila.removeChild(td);
                    eliminados++;
                }
            }
        }
    }

    switch (divCloneGrilla.getAttribute("name")){
        
        case "sqlTableDiv":
        EliminarColumnasEnTabla(0);
        break;
        
        case "sqlGridDiv":
        EliminarColumnasEnTabla(0);
        EliminarColumnasEnTabla(1);
        break;

        case "sqlFilteredGridDiv":
        EliminarColumnasEnTabla(0);
        EliminarColumnasEnTabla(1);
        break;
        
        default:
        return gridId;
    }
    
    CrearGrillaNueva(divCloneGrilla);
    return divCloneGrilla.id;
}

function QuitarCombosDeGrillaFiltrada(gridId) {
    var div = document.getElementById(gridId);
    
    if (div.getAttribute("name") === 'sqlFilteredGridDiv'){
        // Quito la fila donde estan los combos
        var divCloneGrilla = div.cloneNode(true);
        divCloneGrilla.id = gridId + '_filt';
        var tabla = divCloneGrilla.getElementsByTagName('table')[0];
        var tr1 = tabla.getElementsByTagName('tr')[1];
        if (!tr1) return gridId;
        tr1.parentNode.removeChild(tr1);
        CrearGrillaNueva(divCloneGrilla);
        return divCloneGrilla.id;
    } else {
        return gridId;
    }
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////// Funciones Auxiliares /////////////////////////////////////

function GetTooltip(td){
    var hijo = td.getElementsByTagName('label')[0] || td.getElementsByTagName('div')[0] || td.getElementsByTagName('IMG')[0];
    if (!hijo) return;
    td.innerHTML = hijo.title || hijo.innerText;
}
/*
function CambiarImagenATexto(td){
    var img = td.getElementsByTagName('IMG')[0];
    if (!img) return;
    td.innerHTML = img.title || img.getAttribute('class') || '' ;
}
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////       PLUGINS   //////////////////////////////////////////
/*
    En caso de integrar grillas con BuildAjax***, SetGridSelected() guardará en un input html escondido un valor,
    para que despues con la función GetOptsByGrid() obtener los opts de la grilla elegida segun un dataset.

    El dataset debe contener, por ejemplo:
    var dataOpts = 
    [
        {
            grid: 'GRILLA_01',
            deny: [1],
            edit: [[6,GetTooltip],[7,GetTooltip]],
            defecto: true // cuando entra por 1ra vez, cual es la grilla que exportara
        },
        {
            grid: 'GRILLA_02',
            deny: [1,7],
            edit: [[6,GetTooltip]]
        }
    ];
*/

function SetGridSelected(valor, idInput) {
    var store = document.getElementById(idInput);
    if (!store) {
        store = document.createElement('input');
        store.id = idInput;
        store.type = 'hidden';
        document.body.appendChild(store);
    }
    store.value = valor;
}

function GetOptsByGrid(idInput, dataOpts) {
    var opts;
    var store = document.getElementById(idInput) || 'defecto';
    for (var i = 0; i < dataOpts.length; i++) {
        if (store === 'defecto' && dataOpts[i].defecto) {
            opts = { deny: dataOpts[i].deny, edit: dataOpts[i].edit };
            break;
        } else {
            if (dataOpts[i].grid === store.value) {
                opts = { deny: dataOpts[i].deny, edit: dataOpts[i].edit };
                break;
            }
        }   
    }    
    return opts;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////