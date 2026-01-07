# 1. ¿Qué es el DOM?

El DOM (Document Object Model) es una representación estructurada del documento HTML que el navegador crea en memoria cuando carga una página.

No es HTML, ni JavaScript:

- HTML → es texto

- DOM → es un modelo de objetos que representa ese HTML

- avaScript → interactúa con el DOM

📌 El DOM permite:

- Leer contenido

- Modificar contenido

- Crear o eliminar elementos

- Responder a eventos del usuario

#### Ejemplo conceptual
HTML:
```html

<p id="mensaje">Hola</p>
```

#### DOM (simplificado):

```html
document
 └── html
     └── body
         └── p (id="mensaje", texto="Hola")
```

#### En JavaScript:
```js
document.getElementById("mensaje").textContent = "Hola mundo";
```
---

# 2. Árbol del DOM

El DOM se organiza como un árbol jerárquico de nodos.

## Tipos de nodos principales

1. **Document**
Nodo raíz (**document**)

2. **Element nodes**
Etiquetas HTML (**div**, **p**, **ul**…)

3. **Text nodes**
Texto dentro de etiquetas

4. Attribute nodes (conceptual)
Atributos (**class**, **id**, etc.)

### Ejemplo de árbol

HTML:
``` html
<div id="contenedor">
  <h1>Título</h1>
  <p>Texto</p>
</div>
```

Árbol DOM:
``` html
document
 └── html
     └── body
         └── div#contenedor
             ├── h1
             │   └── "Título"
             └── p
                 └── "Texto"
```

📌 **Todo es un nodo**, incluso los espacios y saltos de línea (text nodes).

---

## Relaciones en el árbol

Cada nodo puede tener:

- **parentNode**

- **childNodes**

- **firstChild**

- **lastChild**

- **nextSibling**

- **previousSibling**

Ejemplo:
```js
const div = document.getElementById("contenedor");
div.parentNode;     // body
div.children;       // h1, p
```

# 3. Manipulación del DOM

Manipular el DOM significa **leer, crear, modificar o eliminar nodos.**

### Selección de elementos
Métodos clásicos
```js
document.getElementById("id");
document.getElementsByClassName("clase");
document.getElementsByTagName("p");
```
Métodos modernos (recomendados)
```js
document.querySelector("div p");
document.querySelectorAll(".item");
```

📌 `querySelectorAll` devuelve una **NodeList**, no un array real.

### Modificar contenido
Texto
```js
element.textContent = "Nuevo texto";
element.innerText = "Texto visible";
```
HTML
```js
element.innerHTML = "<strong>Texto</strong>";
```

⚠️ **Riesgo de seguridad**: `innerHTML` puede provocar **XSS** si se usa con datos externos.

---

#### Modificar atributos y clases
```js
element.setAttribute("title", "tooltip");
element.getAttribute("title");
element.removeAttribute("title");
```

Clases:
```js
element.classList.add("activo");
element.classList.remove("activo");
element.classList.toggle("activo");
```

---

#### Crear y eliminar elementos
Crear
```js
const p = document.createElement("p");
p.textContent = "Nuevo párrafo";
document.body.appendChild(p);
```

Eliminar
```js
element.remove();
// o
parent.removeChild(element);
```

### Complejidad y rendimiento

- Manipular el DOM es **costoso**

- Cada cambio puede provocar:

    - Reflow (recalcular layout)

    - Repaint (redibujar)

📌 Buenas prácticas:

- Agrupar cambios

- Usar DocumentFragment

- Evitar manipulaciones repetidas en bucles

---

# 4. Eventos del DOM

Los eventos permiten que el DOM **reaccione a acciones del usuario.**

### Tipos comunes de eventos

- Mouse: `click`, `mouseover`

- Teclado: `keydown`, `keyup`

- Formulario: `submit`, `change`

- Documento: `DOMContentLoaded`

- Ventana: `resize`, `scroll`

#### Escuchar eventos
``` js
element.addEventListener("click", () => {
  console.log("Click");
});
```
📌 Ventajas sobre `onclick`:

- Permite múltiples listeners
- Mejor control
- Se puede eliminar


#### El objeto `event`
```js
element.addEventListener("click", (event) => {
  console.log(event.target);
});
```

Propiedades importantes:

- `event.target` → elemento que originó el evento
- `event.currentTarget` → elemento que escucha
- `event.preventDefault`() → Impide la acción predeterminada del navegador asociada a un evento
- `event.stopPropagation`() → detiene la propagación de un evento (como un clic) hacia los elementos padres en el árbol DOM, impidiendo que los manejadores de eventos de esos elementos superiores se activen

### Fases del evento

1. Capturing (captura)
2. Target
3. Bubbling (burbujeo)

```js
element.addEventListener("click", handler, true); // captura
```
📌 Por defecto se usa **bubbling**


### Delegación de eventos (técnica avanzada)
Se escucha el evento en un padre común.

```js
ul.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```
✔️ Más eficiente
✔️ Funciona con elementos dinámicos

---

# 5. Recorrido del DOM

El recorrido consiste en **navegar por el árbol del DOM.**

#### Navegación básica
- element.parentElement
- element.children
- element.firstElementChild
- element.lastElementChild
- element.nextElementSibling
- element.previousElementSibling

📌 `Element` evita nodos de texto (mejor práctica)

##### Ejemplo práctico
```js
const item = document.querySelector(".item");
item.parentElement.style.background = "red";
```

##### Recorrido dinámico (loops)
```js
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.classList.add("activo");
});
```

###### Recorrido profundo (recursivo)
```js
function recorrer(nodo) {
  console.log(nodo.nodeName);
  nodo.childNodes.forEach(recorrer);
}

recorrer(document.body);
```
📌 Útil para análisis, editores, parsers

---

# 6. Ejercicios

## NIVEL BÁSICO
✅ Ejercicio 1: Seleccionar y modificar texto
📄 HTML
```html
<p id="texto">Hola</p>
<button id="btn">Cambiar</button>
```
🎯 **Consigna**

Al hacer click en el botón, cambiar el texto del párrafo a **"Hola DOM".**

💡 Solución
```js
const boton = document.getElementById("btn");
const texto = document.getElementById("texto");

boton.addEventListener("click", () => {
  texto.textContent = "Hola DOM";
});
```
📌 Conceptos:

- `getElementById`
- `textContent`
- `addEventListener`

✅ Ejercicio 2: Cambiar estilos desde JS
📄 HTML
```html
<div id="caja">Caja</div>
```
🎯 Consigna
Cambiar el color de fondo al hacer click.

💡 Solución
```js
const caja = document.getElementById("caja");

caja.addEventListener("click", () => {
  caja.style.backgroundColor = "blue";
  caja.style.color = "white";
});
```

📌 Conceptos:

- `style`
- Eventos

---

## NIVEL INTERMEDIO

✅ Ejercicio 3: Agregar elementos dinámicamente
📄 HTML
```html
<input type="text" id="input">
<button id="agregar">Agregar</button>
<ul id="lista"></ul>
```
🎯 Consigna
Al hacer click, agregar el texto del input como un `<li>.`

💡 Solución
```js
const input = document.getElementById("input");
const boton = document.getElementById("agregar");
const lista = document.getElementById("lista");

boton.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = input.value;
  lista.appendChild(li);
  input.value = "";
});
```

📌 Conceptos:

- `createElement`
- `appendChild`
- Manipulación del DOM

✅ Ejercicio 4: Eliminar un elemento
📄 HTML
```html
<ul id="lista">
  <li>Uno</li>
  <li>Dos</li>
  <li>Tres</li>
</ul>
```
🎯 Consigna
Eliminar el segundo elemento de la lista.

💡 Solución
```js
const lista = document.getElementById("lista");
const segundo = lista.children[1];

segundo.remove();
```

📌 Conceptos:
- `children`
- `remove`

✅ Ejercicio 5: Delegación de eventos
📄 HTML
```html
<ul id="menu">
  <li>Inicio</li>
  <li>Servicios</li>
  <li>Contacto</li>
</ul>
```
🎯 Consigna
Mostrar por consola el texto del `<li>` clickeado.

💡 Solución
```js
const menu = document.getElementById("menu");

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```

📌 Conceptos:

- Event bubbling
- `event.target`
- Delegación

---

## NIVEL AVANZADO
✅ Ejercicio 6: Toggle de clases
📄 HTML
```html
<button id="modo">Modo oscuro</button>
```
🎯 Consigna
Activar/desactivar una clase `dark` en el `body`.

💡 Solución
```js
const boton = document.getElementById("modo");

boton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
```

📌 Conceptos:
- `classList.toggle`
- Buenas prácticas (CSS separado)

✅ Ejercicio 7: Contador con eventos
📄 HTML
```html
<button id="menos">-</button>
<span id="contador">0</span>
<button id="mas">+</button>
```
🎯 Consigna
Incrementar y decrementar el valor.

💡 Solución
```js
let valor = 0;

const contador = document.getElementById("contador");
const mas = document.getElementById("mas");
const menos = document.getElementById("menos");

mas.addEventListener("click", () => {
  valor++;
  contador.textContent = valor;
});

menos.addEventListener("click", () => {
  valor--;
  contador.textContent = valor;
});
```

📌 Conceptos:
- Estado
- Sincronización DOM ↔ JS

✅ Ejercicio 8: Recorrido del DOM
📄 HTML
```html
<div id="contenedor">
  <p>Uno</p>
  <p>Dos</p>
  <p>Tres</p>
</div>
```
🎯 Consigna

Cambiar el color de todos los `<p>.`

💡 Solución
```js
const contenedor = document.getElementById("contenedor");

Array.from(contenedor.children).forEach(p => {
  p.style.color = "red";
});
```

📌 Conceptos:
- `children`
- Recorrido
- Conversión a array

---

## DESAFÍOS (estilo entrevista)
🧠 Ejercicio 9: Eliminar con click (delegación)

🎯 Al hacer click en un `<li>,` eliminarlo.
```js
lista.addEventListener("click", e => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});
```
🧠 Ejercicio 10: DOMContentLoaded

🎯 Ejecutar código solo cuando el DOM esté listo.
```js
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado");
});
```
