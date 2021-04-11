const app = document.querySelector('#app');
axios.get('http://localhost:8000/api/products/all/').then((resp) => {
    app.innerHTML = JSON.stringify(resp.data);
});