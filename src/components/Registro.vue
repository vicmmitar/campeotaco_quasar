<template>
  <q-card class="my-card">
    <q-card-section>
      <h2 class="q-mt-xs">Registro</h2>
      <q-form @submit="doRegister" class="q-gutter-md">
        <q-input
          v-model="nombreReg"
          type="text"
          label="Nombre"
          required
          dense
        ></q-input>
        <q-input
          id="apellidoRegInput"
          v-model="apellidoReg"
          type="text"
          label="Apellido"
          required
          dense
        ></q-input>
        <q-input
          id="usuarioRegInput"
          v-model="userReg"
          type="text"
          label="Usuario"
          required
          dense
        ></q-input>
        <q-input
          id="passRegInput"
          v-model="passwordReg"
          type="password"
          label="Password"
          hint="Contraseña de seguridad"
          required
          dense
        ></q-input>
        <q-input
          id="confRegInput"
          v-model="confirmReg"
          type="password"
          placeholder="Confirm password"
          hint="Repita su contraseña de seguridad"
          required
          dense
        ></q-input>

        <q-input
          id="dniRegInput"
          v-model="ciReg"
          type="text"
          label="CI"
          hint="Cedula de identidad"
          dense
          mask="########"
        ></q-input>

        <q-input
          type="tel"
          v-model="celularReg"
          label="Celular"
          hint="Número de celular"
          dense
          mask="###-##-###"
        ></q-input>
        <q-btn type="submit" label="Registrar" color="secondary" />
        <p>
          ¿Ya tiene una cuenta?
          <q-btn
            flat
            label="Iniciar sesion aquí"
            no-caps
            @click="registerActive = !registerActive"
            color="primary"
            padding="xs"
          />
        </p>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import md5 from "js-md5"
export default {
  name: 'ComponenteRegistro',
  setup() {
    return {};
  },
  computed: {
    registerActive: {
      get() {
        return this.$store.getters["autenticacion/getRegisterActive"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setRegisterActive", valor);
      }
    },

    nombreReg: {
      get() {
        return this.$store.getters["autenticacion/getNombreReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setNombreReg", valor);
      }
    },
    apellidoReg: {
      get() {
        return this.$store.getters["autenticacion/getApellidoReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setApellidoReg", valor);
      }
    },
    userReg: {
      get() {
        return this.$store.getters["autenticacion/getUserReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setUserReg", valor);
      }
    },
    passwordReg: {
      get() {
        return this.$store.getters["autenticacion/getPasswordReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setPasswordReg", valor);
      }
    },
    confirmReg: {
      get() {
        return this.$store.getters["autenticacion/getConfirmReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setConfirmReg", valor);
      }
    },
    ciReg: {
      get() {
        return this.$store.getters["autenticacion/getCiReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setCiReg", valor);
      }
    },
    celularReg: {
      get() {
        return this.$store.getters["autenticacion/getCelularReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setCelularReg", valor);
      }
    },
    tipo_usuario: {
      get() {
        return this.$store.getters["autenticacion/getTipo_UsuarioReg"];
      },
      set(valor){
        return this.$store.dispatch("autenticacion/setTipo_UsuarioReg", valor);
      }
    },
  },
  methods: {
    async doRegister(){
      this.tipo_usuario = 'AC';
      this.passwordReg = md5(this.passwordReg);
      this.confirmReg = md5(this.confirmReg);
      await this.$store.dispatch("autenticacion/register");
    }
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
