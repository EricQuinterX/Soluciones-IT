# Guia de Uso del ExportToExcel_Alternativo

## Resumen
Sirve para exportar contenido y manipular los datos de cada columna de una grilla de Engage. Tal material funciona para metadata de tipo **Tabla**, **Grilla** y **Grilla Filtrada**.

La función definida en el archivo llamado <b>ExportToExcel</b>
```javascript
function ExportToExcel(gridIndex, opts){
  /* Code */
}
```
## Parametros
### gridIndex 
Es el orden secuencial de la grilla a exportar *(como usa el ExportToExcel original)*.
```javascript
ExportToExcel(0);
ExportToExcel(1);
ExportToExcel(4);
```

### opts
Este parametro opcional es un objeto js que tiene 2 atributos:
```javascript
{ // Ejemplo
  deny: [1,3,9],
  edit: [[2, mostrarTitle], [5, estadoToString]]
}
```
#### deny
Es un array numérico que representa las columnas que no seran exportadas.
#### edit
Es otro array de arrays que edita/modifica el contenido de la celda en toda una o varias columnas específicas.
Dentro del array tiene que estar el número de la columna y el nombre de la funcion transformadora.
Las funciones deben tener un parametro de entrada porque siempre se la manda un valor dentro del código. No necesariamente deben devolver un resultado ya que es una operación mutable. Por ejemplo una definición valida puede ser:
```javascript
function CambiarTitleATexto(td){
    var hijo = td.getElementsByTagName('label')[0] || td.getElementsByTagName('div')[0];
    if (!hijo) return;
    td.innerHTML = hijo.title;
}
```
El parametro de entrada `td`, representa una celda de tabla. Este es el esqueleto que representa una tabla:
```html
<table>
  <thead>
    <tr>...</tr>
    ...
  </thead>
  <tbody>
    <tr>
      <td><div>45684</div></td>
      <td><label>Mesa</label></td>
      <td>Silla</td>
      ...
    </tr>
    ...
  </tbody>
</table>
```
Usted puede crear la funcion que quiera para alterar los datos de todas las celdas de una columna.

## Invocación y Uso
### Archivos
1. Copiar y pegar `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.

### Designer
1. Poner un elemento `Tabla` del Designer en la pantalla.
_(poner imagen)_
2. Agregar un elemento **Html** y escribir la referencia del archivo js de arriba.
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
3. Agregar otro elemento **Html** y dentro escribir algo asi para representar un icono o boton de descarga:
`<img style="cursor:pointer" src="./../fotos/***/xlsicon.gif" onclick="ExportToExcel(0)"/>`


Por ejemplo:

<img src="media/Grilla tipo tabla SP_01.png"/>
`<img style="cursor:pointer" src="./../fotos/Galicia_Seguros/xlsicon.gif" onclick="ExportToExcel(0)"/>`
1. Copiar y Pegar el archivo src/<b>ExportToExcel_Alternativo.js</b> en `./../Contenidos/`
2. Agregar en la pantalla 3 elementos HTML de Engage:
    1. `<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
    2. `<div id="grilla_filtrada" style="visibility:hidden"></div>`
    3. `<img src="./../Fotos/excel-icon.png" onclick="ExportToExcel(0, opts)">` *Luego se explicara las opciones que podrian ir en el segundo parametro*


El segundo parametro del ExportToExcel esta para filtrar las columnas y modificar los datos que estan dentro de una celda de una columna.
