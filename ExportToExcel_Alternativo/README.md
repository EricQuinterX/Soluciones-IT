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
> Usted puede crear la funcion que quiera para alterar los datos de todas las celdas de una columna.

## Invocación y Uso

### Uso típico
Usualmente se quiere mostrar **X grillas separadas** en pantalla y brindar la posibilidad de exportar los datos. Cada uno tendra su boton o icono para exportarlo. Las grillas pueden ser de tipo Tabla, Grilla y Grilla Filtrada. Pero muchas veces las grillas traen imagenes, iconos, radio-buttons, checkbox o textos acotados con tooltip incorporados.
_imagen ejemplos de lo anterior_
Si exportamos de la forma tradicional, apareceran imagenes rotas en el excel, ej:  
_imagen del excel roto_

#### Pasos
1. Copiar y pegar `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.
2. Poner un elemento **Tabla del Designer** en la pantalla. Setearle la ejecucion de un Stored Procedure.  
_(poner imagen)_
3. Agregar un elemento **Html** y escribir la referencia del archivo js de arriba.  
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
4. Agregar otro elemento **Html** y dentro escribir algo asi para representar un icono o boton de descarga:  
`<img style="cursor:pointer" src="./../fotos/***/xlsicon.gif" onclick="ExportToExcel(0)"/>`  
Como segundo parametro de entrada del **ExportToExcel** vamos a ingresar los **opts**, pero debemos ver primero la grilla resultante en pantalla del explorador:  
_imagen de la grilla ejemplo_
Como se ve, hay algunas columnas que tienen imagenes y tooltips, la **opts** podria ser:
`opts = { deny: [1,7], edit: [[6,mostrarTooltip]] }`
Lo que dice las opts es: _Se va a mostrar el tooltip completo de la columna 6 y se quitara la columna 1 y 7_
Entonces el contenido del **html** del Designer quedaria:  
`<img style="cursor:pointer" src="./../fotos/***/xlsicon.gif" onclick="ExportToExcel(0,{deny:[1,7],edit:[[6,mostrarTooltip]]})"/>`
> Tratar de meter lo mas compacto posible ya que tiene un limite de 255 carateres el elemento **html** de Engage. 
5. Validar el tramite y limpiar la cache del navegador.

### Uso Avanzado _(BuildAjaxTable, BuildAjaxGrid, BuildAjaxGridFiltered)_
Repetir los primeros 3 pasos del uso tipico.  
* Crear un elemento **html Designer** que representa el icono para exportar.
* Crear otro **html Designer** 
