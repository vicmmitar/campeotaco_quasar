export default function () {
  return {
    ip: 'http://localhost:8000/api/',
    logeado: false,
    token: null,
    usuarioLogeado: null,
    registerActive: false,
    //FORMULARIO INICIO DE SESION
    usuario: null,
    contrasenia: null,
    //FORMULARIO REGISTRO
    nombreReg: "",
    apellidoReg: "",
    userReg: "",
    passwordReg: "",
    confirmReg: "",
    ciReg: "",
    celularReg: "",
    tipo_usuario: "",
    //tabla campeonatos
    rows: [],
    seleccionado: [],
    //tabla equipos
    idCampGest: "",
    rowsE: [],
    seleccionadoE: [],
    //tablaFixture
    list: [],
  }
}