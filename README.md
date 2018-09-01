# Preact-path

This is a small (1.33 kB gzip) group of components that facilitate route management in applications based on **Preact**.

> This component creates a context that does not depend on the route events **popState** or **hashChange**, If you want to transmit the **Provider** changes to the browser path use the ** History ** property to hear those changes.

## Why react-path?

Unlike other routers, preact-path allows to componentize the route without knowing the general context, similar to how a relative directory operates, this is achieved through the `<Root/>` component, this allows defining a scope for the components that this contain ** Root ** can also inherit range from another **Root**.

``` js
<Provider capture={true}>
   <Root path="/folder-a">
       <div>
           <Root path="/folder-b">
               <a href="./1"> Open folder 1 </a>
               <a href="./2"> Open folder 2 </a>
               <a href="../c"> Open folder c </a>
           </Root>
           <Root path="/folder-c">
               <a href="./1"> Open folder 1 </a>
               <a href="./2"> Open folder 2 </a>
               <a href="../b"> Open folder b </a>
           </Root>
       </div>
   </Root>
</Provider>
```

> The previous example only shows how internal contexts are created to limit the scope of the links associated with the `Root` component.

## Route expressions

**Preact-path** makes use of the library [**path-path**](https://github.com/uppercod/path-path), this transforms the route expressions to a regular expression, with it is able to capture the parameters associated with the route.

### Parameter `/:param`

By means of the expression `/:<name_param>`, you can capture a parameter of the route, this is strict before the existence of this parameter.

### Optional parameter `/:param?`

By means of the expression `/:<name_param>?`, You can capture a parameter of the route, this is optional before the existence of this parameter.

### Optional and unlimited parameter `/:param...`

By means of the expression `/:<name_param>...`, you can capture a parameter of the route, this is optional before the existence of this parameter, it also ends the route expression, since it captures everything that goes with it.

### Comodin `/**`

by means of the expression `/**`, you give permission for any route parameter to enter whenever it exists.

## Component `<Provider/>`

This allows you to create a context that will be shared by all the components associated with it.

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

### Propiedades

| Property | Type | Required | Default | Description |
|:---------|:-----|:---------|:--------|:------------|
| capture | Boolean | false | -- | Allows you to capture the click events |
| history | function | false | -- | Allows access to the provider object that controls the status of the route |
| redirect | function | false | -- | It allows to capture the redirection and modify the redirections | 


## Component `<Switch/>`

This allows to define which child associated to the component will be printed before the change of route.


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

### Properties

Estas propiedades solo se definen a los niños del componente.

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | Permite definir si este hijo será impreso al realizar la comparación con la ruta actual |
| default | boolean | true | -- | Este debe ser asignado al último componente de la lista de hijos, permite impreso en el caso de que ningún otro lo haya sido |


## Component `<Root/>` 

This component allows defining a route scope for the child.

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

> The `Root` component generates a context that inherits the property **path** from the parent.

### Properties

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | It allows to define if this child will be printed when making the comparison with the current route |

## Componente `<Route/>`

This component allows you to print the child only if the comparison matches.

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

### Properties

|Propiedad|Tipo|Requerido|Default|Descripción|
|:--------|:---|:--------|:------|:----------|
| path | string | true | -- | It allows to define if this child will be printed when making the comparison with the current route |



## Component `<Subscriber/>` 

This component allows you to subscribe to all the changes that the `Provider` component sends.

```js
import {Provider,Subscriber } from "preact-path";

render(
   <Provider>
        <Subscriber>
           {(path,redirect)=><h1>Route : {path}</h1>}
        </Subscriber> 
   </Provider>,
   document.querySelector("#app")
)
```

## Component `<Match/>`

This component is of a static nature, it only generates a comparison between **match** and **path**

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