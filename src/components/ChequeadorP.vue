<template>
  <div ID class="hello">
    <div class="container">
      <h4 class="display-6">CONEXION POS CHECKER</h4>
      <button
        class="btn btn-dark"
        style="background-color: #82230c"
        v-on:click="reloadPage"
      >
        Iniciar Consulta
      </button>
      <br />
      <form v-on:submit.prevent="buscarPrecios">
        <input
          class="form-control form-control-lg text-white"
          type="text-1"
          id="codBarras"
          aria-label=".form-control-lg example"
          style="background-color: #82230c"
          autofocus
          v-model="buscarProducto.barcode"
        />
        <br />
      </form>
      <div class="card">
        <div class="card-body">
          <h3
            class="display-3"
            v-for="item in this.productosPrecios"
            :key="item.barcode"
          >
            <small>{{ item.descripcion }}</small>
            <br />

            <small>
            
            $  {{
                new Intl.NumberFormat("de-DE").format(priceWithIco=item.precioventa + item.valorico)
              }}</small
            ><br />
            <small>{{ item.barcode }}</small>
            <br />
            <small>{{ item.codigo }}</small>
            <br />
          </h3>

          <h4 class="display-6" v-if="this.totalPrecios">
            <small>
              Valor Total: ${{
                new Intl.NumberFormat("de-DE").format(this.totalPrecios)
              }}
            </small>
          </h4>
          <h4 class="display-6" v-if="this.cantItems">
            <small>Cantidad de Productos: {{ this.cantItems }}</small>
            <small> </small>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ChequeadorP",
  props: {
    msg: String,
  },
  data() {
    return {
      buscarProducto: new Object(),
      productosPrecios: [],
      totalPrecios: null,
      cantItems: 0,
      buscaItem: false,
      priceWithIco:0
    };
  },
  methods: {
    buscarPrecios() {
      let data = {
        barcode: this.buscarProducto.barcode,
      };

      axios
        .post(this.$conexion + "/api/get-products-barcode", data)
        .then((response) => {
          if (response.data.length == 0) {
            this.AlertaArronea6();
            this.buscarProducto.barcode = "";
          }
          this.productosPrecios = response.data;
          for (let index = 0; index < this.productosPrecios.length; index++) {
            this.totalPrecios += this.productosPrecios[index].precioventa+this.productosPrecios[index].valorico;
            this.cantItems++;
          }

          this.buscarProducto.barcode = "";
          setInterval(() => {
            this.reloadPage();
          }, 20000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reloadPage() {
      location.reload();
    },
    AlertaArronea6() {
      this.$swal(
        "Atencion!",
        "No se encontraron productos con el codigo de barras: " +
          this.buscarProducto.barcode,

        "warning"
      );
    },
  },
};
</script>
<style>
input[type="text-1"] {
  width: 90%;
  padding: 10px 10px;
  margin: 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 40px;
  box-sizing: border-box;
  font-size: 30px;
  color: #82230c;
}
.card-body {
  color: #82230c;
}
.display-6 {
  color: #82230c;
}

#Registro-de-Usuarios {
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: url("../assets/Fondo.png") no-repeat center top;
  background-size: cover;
  font-family: sans-serif;
  height: 100vh;
}
</style>

