export function alertaRedireccion(mensaje, icono, ruta) {
    let timerInterval;
    Swal.fire({
        title: mensaje,
        html: "Seras redirecionado en <b></b> segundos.",
        timer: 3000,
        timerProgressBar: true,
        icon: icono,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
            window.location.href = ruta
        }
    })
}

export function alertaGeneral(titulo, mensaje , icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonColor: '#FFD600'
    });
}