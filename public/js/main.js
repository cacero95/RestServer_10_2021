//const URL = "http://localhost:8000/";
const URL = "https://architecturerestserver.herokuapp.com/";
const app = document.querySelector('#app');
axios.get(`${ URL }api/products/all/`).then((resp) => {
    app.innerHTML = JSON.stringify(resp.data);
});