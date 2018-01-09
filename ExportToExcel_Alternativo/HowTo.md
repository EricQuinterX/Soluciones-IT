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
{
  deny: [1,3,9],
  edit: [[2, mostrarTitle], [5, estadoToString]]
}
```
Donde <b>deny</b> es una lista de columnas que no seran exportadas y <b>edit</b> es otra lista que edita/modifica el contenido de la celda de una columna en otro.

Por ejemplo:

| Selec. | Codigo | Descripcion  | 
| ------------- |:-------------:| -----:|
| <img src="media/edit.png" height="30" width="30"/>| 1 | Reclamo   |
| <img src="media/edit.png" height="30" width="30"/>| 2 | Consulta  |
| <img src="media/edit.png" height="30" width="30"/>| 3 | Tramite   |

<b title="asdkasdhksajd">oooooooooooooo</b>


1. Copiar y Pegar el archivo src/<b>ExportToExcel_Alternativo.js</b> en `./../Contenidos/`
2. Agregar en la pantalla 3 elementos HTML de Engage:
    1. `<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
    2. `<div id="grilla_filtrada" style="visibility:hidden"></div>`
    3. `<img src="./../Fotos/excel-icon.png" onclick="ExportToExcel(0, opts)">` *Luego se explicara las opciones que podrian ir en el segundo parametro*


El segundo parametro del ExportToExcel esta para filtrar las columnas y modificar los datos que estan dentro de una celda de una columna.
