# Tabla de métodos HTTP en `json-server`

| Método  | Ruta                         | Descripción                                     |
|---------|------------------------------|-------------------------------------------------|
| GET     | `/usuarios`                  | Obtener todos los usuarios                      | 
| GET     | `/usuarios/1`                | Obtener un usuario por ID                       | 
| POST    | `/usuarios`                  | Crear un nuevo usuario                          | 
| PUT     | `/usuarios/1`                | Reemplazar un usuario completamente             | 
| PATCH   | `/usuarios/1`                | Actualizar parcialmente un usuario              | 
| DELETE  | `/usuarios/1`                | Eliminar un usuario                             | 

# Filtros y Parámetros de Consulta en `json-server`

Puedes usar **query parameters** para filtrar resultados, ordenar, buscar, limitar y paginar. Se agregan al final de la URL con `?` o `&`.

---

## Tabla de filtros disponibles

| Parámetro       | Descripción                                             | Ejemplo de uso                                          |
|------------------|---------------------------------------------------------|----------------------------------------------------------|
| `?campo=valor`   | Filtra resultados exactos por un campo                  | `/usuarios?nombre=Ana`                                  |
| `?q=texto`       | Búsqueda global (en todos los campos)                   | `/usuarios?q=luis`                                      |
| `_sort=campo`    | Ordena por un campo                                     | `/productos?_sort=precio`                               |
| `_order=asc`     | Orden ascendente (por defecto)                          | `/productos?_sort=precio&_order=asc`                    |
| `_order=desc`    | Orden descendente                                       | `/productos?_sort=precio&_order=desc`                   |
| `_limit=numero`  | Limita la cantidad de resultados                        | `/usuarios?_limit=3`                                    |
| `_page=número`   | Devuelve una página específica (requiere `_limit`)      | `/usuarios?_page=2&_limit=5`                            |
| `campo_like`     | Filtra por coincidencia parcial                         | `/usuarios?nombre_like=Lu`                              |
| `campo_ne`       | Filtra excluyendo ese valor (`ne` = not equal)          | `/usuarios?nombre_ne=Ana`                               |
| `campo_gte`      | Mayor o igual que (`gte` = greater than or equal)       | `/productos?precio_gte=50`                              |
| `campo_lte`      | Menor o igual que (`lte` = less than or equal)          | `/productos?precio_lte=100`                             |
| `campo_gt`       | Mayor que                                                | `/productos?precio_gt=50`                               |
| `campo_lt`       | Menor que                                                | `/productos?precio_lt=100`                              |

---

## Ejemplos combinados

```md
GET /productos?_sort=precio&_order=desc&_limit=5

GET /usuarios?_page=2&_limit=10&q=gmail

GET /productos?precio_gte=30&precio_lte=100&_sort=precio&_order=asc
