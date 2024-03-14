console.log("desde scripo");

//colpoca fecha acorde a si es o no es 

document.getElementById("urgencia").addEventListener("change", function () {
    var urgencia = this.value;
    var fechaGroup = document.getElementById("fecha-group");

    if (urgencia === "Urgente e Importante" || urgencia === "Urgente pero no Importante") {
        fechaGroup.style.display = "block";
    } else {
        fechaGroup.style.display = "none";
    }
});


//envia al backen por fetch

const form = document.getElementById('crearTarea') //1
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/producto', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/producto')
        }
        else if (result.status === 404) {
            alert("correo invalido, resivar credenciales!")
        }
        else if (result.status === 401) {
            alert("Login invalido, resivar credenciales!")
        }
        else if (result.status === 500) {
            alert("revisa datos incorrectos")
        }
    }).catch(function (error) {
        alert("resivar")
    })
})

