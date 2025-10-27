export function guardarLocalStorage(llave , valor) {
    localStorage.setItem(llave , JSON.stringify(valor))
}

export function consultarLocalStorage(llave) {
    const valor = localStorage.getItem(llave);
    try {
        return JSON.parse(valor);
    } catch (e) {
        return valor;
    }
}

export function limpiarLocalStorage(llave) {
    localStorage.removeItem(llave)
}