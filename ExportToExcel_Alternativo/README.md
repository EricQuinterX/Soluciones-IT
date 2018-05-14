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
  edit: [[2, GetTooltip], [5, GetTooltip]]
}
```
#### deny
Es un array numérico que representa las columnas que no seran exportadas.
#### edit
Es un array de arrays que edita/modifica el contenido de la celda en toda una o varias columnas específicas.
Dentro del sub-array tiene que estar el número de la columna y el nombre de la función transformadora.  
Las funciones deben tener un parametro de entrada que sera el elemento `<td>...</td>`. No necesariamente deben devolver un resultado ya que es una operación mutable. Por ejemplo las funciones debe ser de este estilo:  
```javascript 
function NombreFuncion(td){
    // code...
}
```
#### Funciones predefinidas para edit _(se agregaran mas a futuro si son necesarios)_
- **GetTooltip**: reemplazara el innerHTML por el atributo **title** (si existe) del elemento hijo del `<td>` (celda).
- **RemoveImage**: quitará las imagenes que esten dentro del `<td>` (celda) si existen.  
<br/>
<br/>


## Uso típico
Usualmente se quiere mostrar **X grillas separadas** en pantalla y ofrecer la posibilidad de exportar los datos. Cada uno tendra su boton o icono para exportarlo. Las grillas pueden ser de tipo Tabla, Grilla y Grilla Filtrada. Pero muchas veces las grillas traen imagenes, iconos, radio-buttons, checkbox o textos acotados con tooltip incorporados.
Si exportamos de la forma tradicional, apareceran imagenes rotas, por ejemplo:  
<img src="media/export_horrible.png">

### Pasos
1. Copiar y pegar el archivo `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.
2. Poner un elemento **Tabla del Designer** en la pantalla. Setearle la ejecución de un Stored Procedure.  
3. Agregar un elemento **Html** y escribir la referencia del archivo js de arriba.  
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
4. Agregar otro elemento **Html** y dentro escribir alguna etiqueta con la **invocación de la función**.
5. Validar el trámite y limpiar la cache del navegador.

### Invocación de la función
Por ejemplo, queremos exportar esta grilla de tipo Tabla.  
<img src="media/grilla_01_tabla.png">  
Esta grilla tiene las columnas 1 y 7 con imagenes, y las columnas 6 y 7 con <b title="Los tooltips son utiles para no mostrar todo el texto en la pantalla">tooltips</b>. Lo que vamos hacer es quitar la columna 1 _(ojo! no se modifica ningun dato de la grilla engage, sino que la nueva grilla no tendrá esa columna)_ y mostrar el atributo title (si existe) de la columna 6 y 7. Para eso en el 2do parametro de la función pasaremos:
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
Cuando un grupo de grillas se cargan por medio de Ajax, las **opts** de cada una pueden variar.  
Por ejemplo, vamos a integrar 3 grillas de tipo grilla filtrada con el BuildAjaxFilteredGrid:
<img src="media/buildajaxgridfiltered.png"><br/>
Cada grilla muestra estos datos:  
<img src="media/grilla_01_tabla.png"><img src="media/grilla_02_tabla.png"><img src="media/grilla_03_tabla.png"><br/>
> Se muestra del tipo Tabla para ver todas sus columnas.

### Pasos
1. Copiar y pegar el archivo `/src/ExportToExcel_Alternativo.js` en la carpeta `Contenidos`.
2. Poner un elemento **Tabla del Designer** en la pantalla. Setearle la ejecucion de un Stored Procedure por default.  
3. Agregar un elemento html y escribir la referencia del archivo js de arriba.  
`<script src="./../Contenidos/ExportToExcel_Alternativo.js"></script>`
4. Agregar etiquetas html que representen las pestañas para cambiar de grilla.
5. Agregar 1 etiqueta html que tendrá las opts de distintas grillas dentro del BuildAjax, llamado **dataOpts**.
6. Agregar otro elemento html que sera el icono para la **Invocación del ExportToExcel**.
7. Validar el trámite y limpiar la cache del navegador.


#### Detalle del paso 4
Ya que cada pestaña tendrá su codigo js para mostrar su grilla, usaremos 2 funciones utiles que estan dentro del `ExportToExcel_Alternativo.js` para guardar el id de la grilla seleccionada en una variable y recuperar las opts de la variable (id):  
```javascript
// valor: es el nombre o id de la grilla.
// idStore: es el id de un elemento input[text] donde se guardará y recuperará la grilla seleccionada, si no existe se creará solo.
SaveGridId(valor, idStore);

// dataOpts: es la fuente de conocimiento, donde estan guardados todas las restricciones de las grillas.
GetOptsFromData(idStore, dataOpts);
```
Uno de los codigos posibles de las pestañas de arriba son:
```html
<img src="./grilla1.png" onclick="BuildAjaxFilteredGrid('PA_GRILLA_01',1245,null,false,0,0,false);SaveGridId('GRILLA_01','store-grillas')"/>
<img src="./grilla2.png" onclick="BuildAjaxFilteredGrid('PA_GRILLA_01',1245,'PA_GRILLA_02',false,0,0,false);SaveGridId('GRILLA_02','store-grillas')"/>
<img src="./grilla3.png" onclick="BuildAjaxFilteredGrid('PA_GRILLA_01',1245,'PA_GRILLA_03',false,0,0,false);SaveGridId('GRILLA_03','store-grillas')"/>
```

> **store-grillas**: será el id del elemento input text donde guardará el valor 'GRILLA_01', 'GRILLA_02' o 'GRILLA_03' por ejemplo. Al principio cuando cargue la pantalla, el elemento no tendrá valor, entonces:  
Qué grilla exportará si antes de seleccionar una pestaña le doy click al icono de exportar :anger:  
En los proximos pasos esta la solución :sparkles:

  
#### Detalle del paso 5
Es la variable donde estarán todas las restriciones (opts) de cada grilla. Por ejemplo las 3 grillas de arriba:
```javascript
var dataOpts = [
    {
        grid: 'GRILLA_01',
        opts: {
            deny: [1],
            edit: [[6,GetTooltip],[7,GetTooltip]]
        },
        defecto: 1 // cuando entra por 1ra vez, cual es la grilla que exportara
    },
    {
        grid: 'GRILLA_02',
        opts: {
            deny: [1,7],
            edit: [[6,GetTooltip]]    
        }  
    },
    {
        grid: 'GRILLA_03'
    }
];
// GRILLA_03 exportará todas las columnas.
```
Se tiene que insertar en la etiqueta html del Designer de forma minificada para ocupar menos espacio (borrando espacios, comentarios).
<br/>

#### Detalle del paso 6
Seria armar el html para dibujar el boton donde se disparará la funcion de ExportToExcel:
```html
<img src="./foto/xls-icon.png" onclick="ExportToExcel(0, GetOptsFromData('store-grillas', dataOpts))"/>
```
> La unica diferencia con el **Uso Típico**, es que las restricciones (opts) salen de la ejecucion de la funcion **GetOptsFromData('store-grillas', dataOpts)** porque las grillas pueden tener diferentes opts, y salen de la variable del paso anterior.
<br/>
<br/>
<br/>

### Pruebas del ExportToExcel con BuildAjax
<img src="media/filtro_grilla_01.png"><img src="media/excel_filtro_grilla_01.png">
<br/>
<img src="media/filtro_grilla_02.png"><img src="media/excel_filtro_grilla_02.png">
<br/>
<img src="media/filtro_grilla_03.png"><img src="media/excel_filtro_grilla_03.png">
<br/>


