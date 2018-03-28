# Guia de Uso del ExportToExcel_Alternativo

La funcion definida en el archivo llamada <b>ExportToExcel</b>
```javascript
function ExportToExcel(gridIndex, opts){
  /* Code */
}
```
### Parametros
#### gridIndex 
Es el orden secuencial de la grilla a exportar *(como usa el ExportToExcel original)*.
```javascript
ExportToExcel(0);
ExportToExcel(1);
ExportToExcel(4);
```

#### opts
Este parametro opcional es un objeto js que tiene 2 atributos:
```javascript
{ // Ejemplo
  deny: [1,3,9],
  edit: [[2, mostrarTitle], [5, estadoToString]]
}
```
Donde <b>deny</b> es una lista de columnas que no seran exportadas y <b>edit</b> es otra lista que edita/modifica el contenido de la celda de una columna en otro.

Por ejemplo:

| Selec. | Codigo | Descripcion | Vigencia | Usuario | Fecha Creacion | Motivo | Eliminar |  
| ------ |:------:| -----------:| --------:| -------:| --------------:| ------:|---------:|
| <img src="media/edit.png" height="20" width="20"/>| 1 | Reclamo | <img class="activo" src="media/active.png" height="15" width="15" />  | peitong | 20-11-2017  | <b title="En caso de robo u otro acto delictuoso, que pueda ser motivo de reclamación al amparo de esta póliza, el Asegurado dará aviso">En caso de robo u otro ...</b> | <img src="media/cancelar.png" height="20" width="20"/> |
| <img src="media/edit.png" height="20" width="20"/>| 2 | Consulta | <img class="inactivo" src="media/inactive.png" height="15" width="15" />  | slyd    | 05-06-2015  | <b title="La consulta de los precios con un lector de mano o un escáner horizontal se realiza automáticamente cotejando los archivos de las unidades, impidiendo así cualquier tipo de error">La consulta de los preci...</b> |  <img src="media/cancelar.png" height="20" width="20"/>  |
| <img src="media/edit.png" height="20" width="20"/>| 3 | Tramite | <img class="activo" src="media/active.png" height="15" width="15" />   | prondinelli | 29-11-2016 | <b title="Paso que, junto con otros, debe realizarse de forma sucesiva para solucionar un asunto que requiere un proceso.">Paso que, junto con ...</b> | <img src="media/cancelar.png" height="20" width="20"/> |

<b title="asdkasdhksajd">oooooooooooooo</b>


1. Copiar y Pegar el archivo src/<b>ExportToExcel_Alternativo.js</b> en `./../Contenidos/`
2. Agregar en la pantalla 3 elementos HTML de Engage:
    1. `<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
    2. `<div id="grilla_filtrada" style="visibility:hidden"></div>`
    3. `<img src="./../Fotos/excel-icon.png" onclick="ExportToExcel(0, opts)">` *Luego se explicara las opciones que podrian ir en el segundo parametro*


El segundo parametro del ExportToExcel esta para filtrar las columnas y modificar los datos que estan dentro de una celda de una columna.
