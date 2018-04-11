# ExportToExcel_Alternativo

## Resumen
Sirve para manipular y exportar el contenido de los datos de cada columna de grillas de Engage. Tal función sirve para grillas de tipo **Tabla**, **Grilla** y **Grilla Filtrada**, ademas se puede usar junto con los **BuildAjax...**

Invocación de la función:
```javascript
ExportToExcel(gridIndex, opts);
```
### gridIndex 
Es el orden secuencial de la grilla a exportar _(como usa el ExportToExcel original)_.
```javascript
ExportToExcel(0);
ExportToExcel(1);
ExportToExcel(2);
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
Es un array de arrays que edita/modifica el contenido de la celda en toda una o varias columnas específicas y/o quitar columnas.
Dentro del sub-array tiene que estar el número de la columna y el nombre de la funcion transformadora.  
Las funciones deben tener un parametro de entrada porque siempre se le manda un valor dentro del código. No necesariamente deben devolver un resultado ya que es una operación mutable. Por ejemplo una definición valida para una función puede ser:
```javascript 
// Si la celda tiene un elemento label o div va a mostrar en el excel la descripcion del title si es que tiene.
function GetTooltip(td){
    var hijo = td.getElementsByTagName('label')[0] || td.getElementsByTagName('div')[0] || td.getElementsByTagName('IMG')[0];
    if (!hijo) return;
    td.innerHTML = hijo.title || hijo.innerText;
}
```
> Usted puede crear la funcion que quiera para alterar los datos de todas las celdas de una columna.

## Uso típico
Usualmente se quiere mostrar **X grillas separadas** en pantalla y brindar la posibilidad de exportar los datos. Cada uno tendra su boton o icono para exportarlo. Las grillas pueden ser de tipo Tabla, Grilla y Grilla Filtrada. Pero muchas veces las grillas traen imagenes, iconos, radio-buttons, checkbox o textos acotados con tooltip incorporados.
Si exportamos de la forma tradicional, apareceran imagenes rotas en el excel, ej:  
<img src="media/export_horrible.png">

### Pasos
1. Copiar y pegar el archivo `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.
2. Poner un elemento **Tabla del Designer** en la pantalla. Setearle la ejecucion de un Stored Procedure.  
3. Agregar un elemento **Html** y escribir la referencia del archivo js de arriba.  
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
4. Agregar otro elemento **Html** y dentro escribir alguna etiqueta con la **invocación de la función**.
5. Validar el trámite y limpiar la cache del navegador.

### Invocación de la función
Por ejemplo, queremos exportar esta grilla de tipo Tabla.  
<img src="media/grilla_01_tabla.png">  
Esta grilla tiene la columna 1 y 7 con imagenes, y la columna 6 y 7 con <b title="Los tooltips son utiles para no mostrar todo el texto en la pantalla">tooltips</b>. Lo que vamos hacer es remover la columna 1 y mostrar el atributo title (si existe) de la columna 6 y 7. Para eso en el 2do parametro de la función pasaremos:
```javascript
{
  deny: [1],
  edit: [[6,GetTooltip],[7,GetTooltip]]
}
```
La etiqueta con la invocación quedaria de esta forma:

```html
<img src="./icon-excel.png" onclick="ExportToExcel(0,{deny:[1],edit:[[6,GetTooltip],[7,GetTooltip]]})"/>
```
Finalmente, la grilla exportada quedaria así:
<img src="media/export_tabla_ok.png">  
Los links se muestran completos, la 1ra columna se omitió y la imagen de vigencia se mapeo a texto. :+1:
<br/>
<br/>



## Uso Avanzado (BuildAjaxTable, BuildAjaxGrid, BuildAjaxFilteredGrid)
Cuando un grupo de grillas se cargan por medio de Ajax, las **opts** de cada uno pueden variar.  
Por ejemplo, vamos a integrar 3 grillas de tipo grilla filtrada con el BuildAjaxFilteredGrid:
<img src="media/buildajaxgridfiltered.png"><br/>
Cada grilla muestra estos datos:  
<img src="media/grilla_01_tabla.png"><img src="media/grilla_02_tabla.png"><img src="media/grilla_03_tabla.png"><br/>

### Pasos
1. Copiar y pegar el archivo `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.
2. Poner un elemento **Tabla del Designer** en la pantalla. Setearle la ejecucion de un Stored Procedure por default.  
3. Agregar un elemento html y escribir la referencia del archivo js de arriba.  
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
4. Agregar luego del BuildAjaxdentro escribir alguna etiqueta con la Invocación del BuildAjax más el .
5. Agregar otro elemento html que tendrá las opts de distintas grillas dentro del BuildAjax, llamado **dataOpts**.
6. Agregar otro elemento html que sera la **Invocación del ExportToExcel**
7. Validar el trámite y limpiar la cache del navegador.


### Invocación del ExportToExcel y dataOpts (Paso 4 y 5)


BuildAjaxFilteredGrid


<img src="media/filtro_grilla_01.png"><img src="media/excel_filtro_grilla_01.png">
<br/>
<img src="media/filtro_grilla_02.png"><img src="media/excel_filtro_grilla_02.png">
<br/>
<img src="media/filtro_grilla_03.png"><img src="media/excel_filtro_grilla_03.png">
<br/>


