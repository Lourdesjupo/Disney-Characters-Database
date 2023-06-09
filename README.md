# Adalab Ejercicio de evaluación final Módulo 2 

El ejercicio consiste en desarrollar una **aplicación web con todos los personajes disney de la historia**, que nos permite marcar y desmarcar los personajes como favoritos y guardarlos en localStorage.

## La estructura de la página

1. En primer lugar hay que realizar una estructura básica del HTML sobre este modelo. No hay que preocuparse
por las medidas, colores ni tipografía hasta un hito posterior
1. La aplicación de búsqueda de personajes constará de dos partes
   - Un listado de resultados de búsqueda donde aparece la imagen del personaje de Disney y el nombre.
   - Un campo de texto y un botón para buscar un personajes de Disney por su título.

### Mostrar listado

1. Mostraremos una lista de tarjetas con los resultados de los personajes de Disney que obtendremos del **API de la página de disneyapi**

2. En el caso de que alguno de los personajes de Disney que devuelve el API no tenga imagen, hay que
mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de
placeholder.com

3. Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML o
manipulando de forma avanzada el DOM

### Favoritos

Una vez aparecen los resultados, la usuaria puede indicar cuáles son sus personajes de Disney favoritos. 
Para ello, al hacer clic sobre la tarjeta de un personaje animado debe pasar lo siguiente:
1. El color de fondo y el del texto se intercambian, indicando que es un personaje favorito.
2. Hay que mostrar otro listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda,
con los personajes favoritos

### Almacenamiento local
Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de
favoritos debe mostrarse.


### Bonus

#### Búsqueda

1. Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse a Disney API
2. Por cada personaje de Disney contenido en el resultado de la búsqueda hay que pintar una tarjeta
donde mostramos una imagen del personaje y el nombre (igual que en el listado inicial)
3. Los personajes favoritos deben seguir apareciendo a la izquierda aunque la usuaria realice otra
búsqueda. Es decir, el listado de favoritos se debe mantener entre búsquedas

#### Borrar favoritos

1. Al hacer clic sobre el icono de una 'x' al lado de
cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.
2. Para terminar de rematar nuestra app de personajes de Disney, nos gustaría poder añadir/quitar como
favorito al hacer clic sobre un personaje del lado de la derecha. Y que, si realizamos una nueva búsqueda y
sale un personaje que ya es favorito, aparezca ya resaltado en los resultados de búsqueda (con colores de
fondo y texto intercambiados).
3. Sería fantástico si al final de la lista de favoritos hay un botón para borrar todos los favoritos a la vez.

#### Afinar la maquetación

Afinar la maquetación con libertad absoluta para decidir los estilos.

### Entrega

El límite de entrega es el **martes 13 de junio a las 14:00.**
Debe estár publicada en **GitHub Pages** y a partir de la fecha no se podrá hacer más commits o merge hasta que los profesores lo indiquen.
El enlace debe estar en la parte superior al lado de la descripción.
