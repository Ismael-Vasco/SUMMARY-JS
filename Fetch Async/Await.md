
# Fetch Async/Await


 GET 
```javascript
async function index() {
  try {
    const res = await fetch('');
    const data = await res.json();
    console.log('GET:', data);
  } catch (error) {
    console.error('Error en GET:', error);
  }
}
```

---

POST

```javascript
async function store() {
  try {
    const res = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Nuevo item',
        price: 100
      })
    });
    const data = await res.json();
  } catch (error) {
    console.error('Error en POST:', error);
  }
}
```

---

PUT

```javascript
async function update() {
  try {
    const res = await fetch('', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Item actualizado',
        price: 150
      })
    });

    const data = await res.json();
  } catch (error) {
    console.error('Error en PUT:', error);
  }
}
```

---
DELETE
```javascript
async function deleteData() {
  try {
    const res = await fetch('', {
      method: 'DELETE'
    });

    if (res.ok) {
      console.log('DELETE: Recurso eliminado');
    } else {
      console.error('DELETE falló');
    }
  } catch (error) {
    console.error('Error en DELETE:', error);
  }
}
```
