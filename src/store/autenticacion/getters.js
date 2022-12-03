export function getIp (state) {
    return state.ip;
}
export function getLogeado (state) {
    return state.logeado;
}
export function getUsuarioLogeado (state) {
    return state.usuarioLogeado;
}
export function getToken (state) {
    return state.token;
}
export function getRegisterActive (state) {
    return state.registerActive;
}

//FORMULARIO INICIO DE SESION
export function getUsuario (state) {
    return state.usuario;
}
export function getContrasenia (state) {
    return state.contrasenia;
}
//FORMULARIO REGISTRO
export function getNombreReg (state) {
    return state.nombreReg;
}
export function getApellidoReg (state) {
    return state.apellidoReg;
}
export function getUserReg (state) {
    return state.userReg;
}
export function getPasswordReg (state) {
    return state.passwordReg;
}
export function getConfirmReg (state) {
    return state.confirmReg;
}
export function getCiReg (state) {
    return state.ciReg;
}
export function getCelularReg (state) {
    return state.celularReg;
}
export function getTipo_UsuarioReg (state) {
    return state.tipo_usuario;
}
//Datos de la tabla Cameponatos
export function getRows (state) {
    return state.rows;
}
export function getSeleccionado (state) {
    return state.seleccionado;
}
//Datos de la tabla Equipos
export function getIdCampGest (state) {
    return state.idCampGest;
}
export function getRowsE (state) {
    return state.rowsE;
}
export function getSeleccionadoE (state) {
    return state.seleccionadoE;
}