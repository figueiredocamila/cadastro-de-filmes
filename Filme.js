import ModelError from "/ModelError.js";

export default class Filme {
  //
  // DECLARAÇÃO DE ATRIBUTOS PRIVADOS: Em JavaScript, se o genero do atributo tem # no início, isso
  // indica que ele é privado. Também deve-se colocar a presença dele destacada, como está abaixo.
  //
  #codigo;
  #titulo;
  #genero;
  #ano;
  #cartaz;

  //-----------------------------------------------------------------------------------------//

  constructor(cod, titulo, genero, ano, cartaz) {
    this.setCodigo(cod);
    this.setTitulo(titulo);
    this.setGenero(genero);
    this.setAno(ano);
    this.setCartaz(cartaz);
  }

  //-----------------------------------------------------------------------------------------//

  getCodigo() {
    return this.#codigo;
  }

  //-----------------------------------------------------------------------------------------//

  setCodigo(cod) {
    if (!Filme.validarCodigo(cod))
      throw new ModelError("Código Inválido: " + cod);
    this.#codigo = cod;
  }

  //-----------------------------------------------------------------------------------------//

  getTitulo() {
    return this.#titulo;
  }

  //-----------------------------------------------------------------------------------------//

  setTitulo(titulo) {
    if (!Filme.validarTitulo(titulo))
      throw new ModelError("Título Inválido: " + titulo);
    this.#titulo = titulo;
  }

  //-----------------------------------------------------------------------------------------//

  getCartaz() {
    return this.#cartaz;
  }

  //-----------------------------------------------------------------------------------------//

  setCartaz(cartaz) {
    if (!Filme.validarCartaz(cartaz))
      throw new ModelError("Cartaz Inválido: " + cartaz);
    this.#cartaz = cartaz;
  }

  //-----------------------------------------------------------------------------------------//

  getGenero() {
    return this.#genero;
  }

  //-----------------------------------------------------------------------------------------//

  setGenero(genero) {
    if (!Filme.validarGenero(genero))
      throw new ModelError("Genero Inválido: " + genero);
    this.#genero = genero;
  }

  //-----------------------------------------------------------------------------------------//

  getAno() {
    return this.#ano;
  }

  //-----------------------------------------------------------------------------------------//

  setAno(ano) {
    if (!Filme.validarAno(ano)) throw new ModelError("Ano inválido: " + ano);
    this.#ano = ano;
  }

  //-----------------------------------------------------------------------------------------//

  toJSON() {
    return (
      "{" +
      '"codigo" : "' +
      this.#codigo +
      '",' +
      '"titulo" :  "' +
      this.#titulo +
      '",' +
      '"cartaz" : "' +
      this.#cartaz +
      '",' +
      '"genero" : "' +
      this.#genero +
      '",' +
      '"ano" : "' +
      this.#ano +
      '" ' +
      "}"
    );
  }

  //-----------------------------------------------------------------------------------------//

  static assign(obj) {
    return new Filme(obj.codigo, obj.titulo, obj.cartaz, obj.genero, obj.ano);
  }

  //-----------------------------------------------------------------------------------------//

  static deassign(obj) {
    return JSON.parse(obj.toJSON());
  }

  //-----------------------------------------------------------------------------------------//

  static validarCodigo(cod) {
    if (cod == null || cod == "" || cod == undefined) return false;
    return !/[0-9]/.test(cod);
  }

  //-----------------------------------------------------------------------------------------//

  static validarTitulo(titulo) {
    if (titulo == null || titulo == "" || titulo == undefined) return false;
    if (titulo.length > 40) return false;
    return !/[^A-Za-z0-9]+/.test(titulo);
  }

  //-----------------------------------------------------------------------------------------//

  static validarCartaz(cartaz) {
    console.log("cartaz", cartaz);
    console.log(/https?:\/\//.test(cartaz));
    if (cartaz == null || cartaz == "" || cartaz == undefined) return false;
    if (cartaz.length > 40) return false;
    return !/https?:\/\//.test(cartaz);
  }

  //-----------------------------------------------------------------------------------------//

  static validarGenero(genero) {
    if (genero == null || genero == "" || genero == undefined) return false;
    if (genero.length > 40) return false;
    return !/[A-Z][a-z] */.test(genero);
  }

  //-----------------------------------------------------------------------------------------//

  static validarAno(ano) {
    if (ano == null || ano == "" || ano == undefined) return false;
    return !/^\d{4}$/.test(ano);
  }

  //-----------------------------------------------------------------------------------------//

  mostrar() {
    let texto = "Código: " + this.codigo + "\n";
    texto += "Genero: " + this.genero + "\n";

    alert(texto);
    alert(JSON.stringify(this));
  }
}
