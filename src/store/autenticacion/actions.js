export function setIp({ commit }, valor) {
  commit("SET_IP", valor);
}
export function setLogeado({ commit }, valor) {
  commit("SET_LOGEADO", valor);
}
export function setUsuarioLogeado({ commit }, valor) {
  commit("SET_USUARIOLOGEADO", valor);
}
export function setToken({ commit }, valor) {
  commit("SET_TOKEN", valor);
}
export function setRegisterActive({ commit }, valor) {
  commit("SET_REGISTERACTIVE", valor);
}

//FORMULARIO INICIO DE SESION
export function setUsuario({ commit }, valor) {
  commit("SET_USUARIO", valor);
}
export function setContrasenia({ commit }, valor) {
  commit("SET_CONTRASENIA", valor);
}

//FORMULARIO REGISTRO
export function setNombreReg({ commit }, valor) {
  commit("SET_NOMBREREG", valor);
}
export function setApellidoReg({ commit }, valor) {
  commit("SET_APELLIDOREG", valor);
}
export function setUserReg({ commit }, valor) {
  commit("SET_USERREG", valor);
}
export function setPasswordReg({ commit }, valor) {
  commit("SET_PASSWORDREG", valor);
}
export function setConfirmReg({ commit }, valor) {
  commit("SET_CONFIRMREG", valor);
}
export function setCiReg({ commit }, valor) {
  commit("SET_CIREG", valor);
}
export function setCelularReg({ commit }, valor) {
  commit("SET_CELULARREG", valor);
}
export function setTipo_UsuarioReg({ commit }, valor) {
  commit("SET_TIPOUSUARIO", valor);
}
//Datos Tabla
export function setRows({ commit }, valor) {
  commit("SET_ROWS", valor);
}
export function setSeleccionado({ commit }, valor) {
  commit("SET_SELECCIONADO", valor);
}
//Datos Tabla
export function setIdCampGest({ commit }, valor) {
  commit("SET_IDCAMPGEST", valor);
}
export function setRowsE({ commit }, valor) {
  commit("SET_ROWSE", valor);
}
export function setSeleccionadoE({ commit }, valor) {
  commit("SET_SELECCIONADOE", valor);
}

import axios from "axios";
import { Notify } from "quasar";

export async function login({ commit }) {
  let url = (await this.getters["autenticacion/getIp"]) + "auth/login";
  let data = {
    user: this.getters["autenticacion/getUsuario"],
    password: this.getters["autenticacion/getContrasenia"],
  };
  await axios
    .post(url, data)
    .then(async function (response) {
      const tok = await response.data;
      console.log(tok);
      commit("SET_TOKEN", tok);
      commit("SET_LOGEADO", true);
    })
    .catch(function (error) {
      console.log(error);
      Notify.create("Combinacion de datos incorrecta");
      commit("SET_CONTRASENIA", "");
    });
  if (this.getters["autenticacion/getLogeado"]) {
    url = (await this.getters["autenticacion/getIp"]) + "auth/me";
    await axios({
      method: "post",
      url: url,
      headers: {
        Authorization:
          this.getters["autenticacion/getToken"].token_type +
          this.getters["autenticacion/getToken"].access_token,
      },
    })
      .then(async function (response) {
        commit("SET_USUARIOLOGEADO", response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export async function logout({ commit }) {
  let url = (await this.getters["autenticacion/getIp"]) + "auth/logout";
  await axios({
    method: "post",
    url: url,
    headers: {
      Authorization:
        "Bearer " + this.getters["autenticacion/getToken"].access_token,
    },
  })
    .then(async function (response) {
      Notify.create(response.data.message);
      commit("SET_LOGEADO", false);
      commit("SET_USUARIOLOGEADO", null);
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.status);
      if (error.response.status == 401) {
        commit("SET_LOGEADO", false);
        commit("SET_USUARIOLOGEADO", null);
      }
    });
}

export async function register({ commit }) {
  //await commit("SET_TIPOUSUARIO", 'AC');
  let url = (await this.getters["autenticacion/getIp"]) + "auth/register";
  let data = {
    user: this.getters["autenticacion/getUserReg"],
    password: this.getters["autenticacion/getPasswordReg"],
    nombre: this.getters["autenticacion/getNombreReg"],
    apellido: this.getters["autenticacion/getApellidoReg"],
    ci: this.getters["autenticacion/getCiReg"],
    celular: this.getters["autenticacion/getCelularReg"],
    tipo_usuario: this.getters["autenticacion/getTipo_UsuarioReg"],
  };
  console.log(data);
  await axios
    .post(url, data)
    .then(async function (response) {
      Notify.create(response.data.mensaje);
      //Notify.create(response.data.user);

      //commit("SET_TOKEN", tok);
      //commit("SET_LOGEADO", true);
    })
    .catch(function (error) {
      console.log(error);
      Notify.create(
        "Hemos tenido problemas al crear su usuario contactese con el administrador"
      );
    });
  this.dispatch("autenticacion/limpiar");
}

export function limpiar({ commit }) {
  commit("SET_NOMBREREG", "");
  commit("SET_APELLIDOREG", "");
  commit("SET_USERREG", "");
  commit("SET_PASSWORDREG", "");
  commit("SET_CONFIRMREG", "");
  commit("SET_CIREG", "");
  commit("SET_CELULARREG", "");
  commit("SET_TIPOUSUARIO", "");
}

export async function obtenerDatosUsuario() {
  let url = (await this.getters["autenticacion/getIp"]) + "auth/me";
  await axios({
    method: "post",
    url: url,
    headers: {
      Authorization:
        "Bearer " + this.getters["autenticacion/getToken"].access_token,
    },
  })
    .then(async function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function actualizarTabla({ commit }) {
  console.log("actions actualizar");
  let url = this.getters["autenticacion/getIp"] + "campeonato";
  let usuario = this.getters["autenticacion/getUsuarioLogeado"];
  await axios({
    method: "post",
    url: url,
    data: {
      user: usuario.user,
    },
    headers: {
      Authorization:
        "Bearer " + this.getters["autenticacion/getToken"].access_token,
    },
  })
    .then(function (response) {
      console.log(response.data);
      commit("SET_ROWS", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function eliminarFila({ commit }) {
  let fila = JSON.parse(JSON.stringify(this.getters["autenticacion/getSeleccionado"]));
  console.log(fila.pop().idcampeonato);
  let id = await fila.pop().idcampeonato;
  console.log(id);
  let url = this.getters["autenticacion/getIp"] + "campeonato/destroy/" + id;
  await axios({
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer " + this.getters["autenticacion/getToken"].access_token,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function actualizarTablaEquipos({ commit }) {
  console.log(this.getters["autenticacion/getIdCampGest"]);
}