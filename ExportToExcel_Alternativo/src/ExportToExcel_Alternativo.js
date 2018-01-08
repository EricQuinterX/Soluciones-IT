function ExportToExcel(gridIndex, opts){
    var allGridsIds = null;
    var gridsCount = 0;
    if (!allGridsIds) {
        allGridsIds = [];
        var allDivTags = document.getElementsByTagName("DIV");
        if (allDivTags) {
            for (var i = 0; i < allDivTags.length; i++) {
                if (allDivTags[i].getAttribute("name") == 'sqlTableDiv' || allDivTags[i].getAttribute("name") == 'sqlGridDiv') {
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

function EditarCeldas(gridId, edit){
    var divGrilla = document.getElementById(gridId);
    var divCloneGrilla = divGrilla.cloneNode(true); // clono la original grilla para no alterar sus datos
    divCloneGrilla.id = divCloneGrilla.id + '_edit';    // le asigno un nuevo id al clon
    var divName = divCloneGrilla.getAttribute("name");
    var index;

    if (divName === 'sqlTableDiv' || divName === 'sqlGridDiv'){
        index = (divName === 'sqlTableDiv') ? 0 : 1;
    } else { return gridId; } // De lo contrario, sale de la funcion con el id original de la grilla.

    // Selecciono la tabla correspondiente.
    // Si index es 0 => tipo tabla; si es 0 => tipo grilla
    var tabla = divCloneGrilla.getElementsByTagName('table')[index];
    
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

        var divGrillaFiltrada = document.getElementById('grilla_filtrada');
        divGrillaFiltrada.innerHTML = '';
    
        // Inserto la nueva grilla en un DIV html en la pantalla de Engage
        divGrillaFiltrada.appendChild(divCloneGrilla);
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

        default:
        return gridId;
    }
    
    var divGrillaFiltrada = document.getElementById('grilla_filtrada');
    divGrillaFiltrada.innerHTML = '';

    var tipo = divGrilla.getAttribute("name");
    
    if (tipo === 'sqlTableDiv' || tipo === 'sqlGridDiv'){
        var index = (tipo === 'sqlTableDiv') ? 0 : 1;
        var tabla = divCloneGrilla.getElementsByTagName('table')[index];
        if (tabla.tHead || tabla.tBodies[0]){
            divGrillaFiltrada.appendChild(divCloneGrilla);
            return divCloneGrilla.id;    
        }
    }
    // Por las dudas, si no entro al IF anterior, retorna el id original de la grilla.
    return gridId;
}
