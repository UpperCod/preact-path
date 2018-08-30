# Preact-path

Este es un pequeño grupo de componentes que facilitan la gestión de rutas en aplicaciones a base de **Preact**.

> Este componente crea un contexto que no depende de los eventos de ruta **popState** o **hashChange** , Si ud busca transmitir los cambios  de **Provider** a la ruta del navegador use la propiedad **History** para escuchar dichos cambios.

## Expresiones de ruta

**Preact-path** hace uso de la librería [**path-path**](https://github.com/uppercod/path-path), esta transforma las expreciones de ruta a una expresión regular, con ella es capaz de capturar los parámetros asociados a la ruta.

### Parámetro

Mediante la expresión `/:<name_param>`, ud puede capturar un parámetro de la ruta, este es estricto ante la existencia de dicho parámetro.

### Parámetro opcional

Mediante la expresión `/:<name_param>?`, ud puede capturar un parámetro de la ruta, este es opcional ante la existencia de dicho parámetro.

### Parámetro opcional e ilimitado

Mediante la expresión `/:<name_param>...`, ud puede capturar un parámetro de la ruta, este es opcional ante la existencia de dicho parámetro, también finaliza la expresión de ruta, ya que captura todo lo que lo acompañe

### Comodin **

mediante la expresión `/**`, ud da permiso a que cualquier parámetro de ruta entre siempre y cuando este exista.

## Componente Provider

Este permite crear un contexto éste será compartido por todos los componentes asociados a él.

```js
import {Provider } from "preact-path";
import App from "./app";

render(
   <Provider>
       <App/>
   </Provider>,
   document.querySelector("#app")
)
```

### Propiedades.

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| capture | Boolean | false | false | Permite capturar los eventos click |
| history | function | false | false | Permite acceder al objeto proveedor que controla el estado de la ruta |

## Componente Switch

Este permite definir que hijo asociado al componente será impreso ante el cambio de ruta.


```js
import {Provider,Switch } from "preact-path";

render(
   <Provider>
       <Switch>
           <h1 path="/">Route /</h1>  
           <h1 path="/:param">Route /:param</h1> 
           <h1 path="/fixed/:paramOptional?">Route /fixed/:paramOptional?</h1> 
           <h1 path="/fixed/fixed/:paramInfinite...">Route /fixed/fixed/:paramInfinite...</h1> 
           <h1 default>Route /:default...</h1> 
       </Switch>
   </Provider>,
   document.querySelector("#app")
)
```

### Propiedades

Las propiedades están asociadas no al componente `Switch` si no que as sus hijos

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | Permite definir si este hijo será impreso al realizar la comparación con la ruta actual |
| default | boolean | true | -- | Este debe ser asignado al último componente de la lista de hijos, permite impreso en el caso de que ningún otro lo haya sido |


## Componente Root

Este componente permite definir una alcance de ruta para el hijo.

```js
import {Provider,Switch,Root } from "preact-path";

render(
   <Provider>
       <Root path="/folder">
           <Switch>
               <h1 path="/">Route /folder</h1>  
               <h1 path="/:param">Route /folder/:param</h1> 
               <h1 path="/fixed/:paramOptional?">Route /folder/fixed/:paramOptional?</h1> 
               <h1 path="/fixed/fixed/:paramInfinite...">Route /folder/fixed/fixed/:paramInfinite...</h1>
               <h1 default>Route /folder/:default...</h1> 
           </Switch>
       </Root>   
   </Provider>,
   document.querySelector("#app")
)
```

> El componente `Root`, genera un contexto que hereda del padre la propiedad **path**.

### Propiedades

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | Permite definir si este hijo será impreso al realizar la comparación con la ruta actual |

## Componente Route

Este componente permite imprimir el hijo solo si la comparación coincide.

```js
import {Provider,Route } from "preact-path";

render(
   <Provider>
        <Route path="/:param">
           {(params,redirect)=><h1>Route</h1>}
        </Route> 
   </Provider>,
   document.querySelector("#app")
)
```

### Propiedades

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | Permite definir si este hijo será impreso al realizar la comparación con la ruta actual |



## Componente Subscriber

Este componente permite suscribirse a todos los cambios que despache el componente `Provider`.

```js
import {Provider,Subscriber } from "preact-path";

render(
   <Provider>
        <Subscriber path="/:param">
           {(path,redirect)=><h1>Route : {path}</h1>}
        </Subscriber> 
   </Provider>,
   document.querySelector("#app")
)
```

### Propiedades

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | Permite definir si este hijo será impreso al realizar la comparación con la ruta actual |

## Componente Match

Este componente es de carácter estático, sólo genera una comparación entre **match** y **path**

```js
import {Provider,Match } from "preact-path";

render(
   <Provider>
        <Match match="/:param" path="/mi-ruta">
           {(path,redirect)=><h1>Route : {path}</h1>}
        </Match> 
   </Provider>,
   document.querySelector("#app")
)
```

### Propiedades

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| match | string | true | -- | Es la expresión a comparar, de coincidir imprimirá el hijo asociado al componente |
| path | string | true | -- | Ruta a comparar |