import Status from "/Status.js";
import Filme from "/Filme.js";
import ViewerError from "/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerFilme {
  #ctrl;

  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar = this.obterElemento("divNavegar");
    this.divComandos = this.obterElemento("divComandos");
    this.divAviso = this.obterElemento("divAviso");
    this.divDialogo = this.obterElemento("divDialogo");

    this.btPrimeiro = this.obterElemento("btPrimeiro");
    this.btAnterior = this.obterElemento("btAnterior");
    this.btProximo = this.obterElemento("btProximo");
    this.btUltimo = this.obterElemento("btUltimo");

    this.btIncluir = this.obterElemento("btIncluir");
    this.btExcluir = this.obterElemento("btExcluir");
    this.btAlterar = this.obterElemento("btAlterar");
    this.btSair = this.obterElemento("btSair");

    this.btOk = this.obterElemento("btOk");
    this.btCancelar = this.obterElemento("btCancelar");

    this.tfCodigo = this.obterElemento("tfCodigo");
    this.tfTitulo = this.obterElemento("tfTitulo");
    this.tfGenero = this.obterElemento("tfGenero");
    this.tfAno = this.obterElemento("tfAno");
    this.divCartaz = this.obterElemento("divCartaz");
    this.imgCartaz = this.obterElemento("imgCartaz");
    this.tfCartaz = this.obterElemento("tfCartaz");
    
    this.txtOperacao = this.obterElemento("txtOperacao");

    this.btPrimeiro.onclick = fnBtPrimeiro;
    this.btProximo.onclick = fnBtProximo;
    this.btAnterior.onclick = fnBtAnterior;
    this.btUltimo.onclick = fnBtUltimo;

    this.btIncluir.onclick = fnBtIncluir;
    this.btAlterar.onclick = fnBtAlterar;
    this.btExcluir.onclick = fnBtExcluir;

    this.btOk.onclick = fnBtOk;
    this.btCancelar.onclick = fnBtCancelar;
  }

  //------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if (elemento == null)
      throw new ViewerError(
        "Não encontrei um elemento com id '" + idElemento + "'"
      );
    // Adicionando o atributo 'viewer' no elemento do Viewer. Isso permitirá
    // que o elemento guarde a referência para o objeto Viewer que o contém.
    elemento.viewer = this;
    return elemento;
  }

  //------------------------------------------------------------------------//

  getCtrl() {
    return this.#ctrl;
  }

  //------------------------------------------------------------------------//

  apresentar(pos, qtde, filme) {
    this.configurarNavegacao(pos <= 1, pos == qtde);

    if (filme == null) {
      this.tfCodigo.value = "";
      this.tfTitulo.value = "";
      this.tfGenero.value = "";
      this.tfAno.value = "";
      this.divCartaz.hidden = true;
      this.imgCartaz.src =
        "https://cdn.glitch.global/93964efc-b12c-4cad-bbfd-38320806ea71/sem-video.png?v=1651344969502";
      this.divAviso.innerHTML = " Número de Filmes: 0";
    } else {
      this.tfCodigo.value = filme.getCodigo();
      this.tfTitulo.value = filme.getTitulo();
      this.tfGenero.value = filme.getGenero();
      this.tfAno.value = filme.getAno();
      this.imgCartaz.src = filme.getCartaz();
      this.tfCartaz.value = filme.getCartaz();
      this.divCartaz.hidden = true;
      this.divAviso.innerHTML =
        "Posição: " + pos + " | Número de Filmes: " + qtde;
    }
  }

  //------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled = flagFim;
    this.btProximo.disabled = flagFim;
    this.btAnterior.disabled = flagInicio;
  }

  //------------------------------------------------------------------------//

  statusEdicao(operacao) {
    this.txtOperacao.innerHTML = operacao;
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false;

    if (operacao != Status.EXCLUINDO) {
      this.tfTitulo.disabled = false;
      this.tfGenero.disabled = false;
      this.tfAno.disabled = false;
      this.divCartaz.hidden = false;
      this.tfCartaz.disabled = false;
      this.divAviso.innerHTML = "";
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";
    }
    if (operacao == Status.INCLUINDO) {
      this.tfCodigo.disabled = false;
      this.imgCartaz.hidden = true;
      this.divCartaz.hidden = false;
      this.tfCodigo.value = "";
      this.tfTitulo.value = "";
      this.tfCartaz.value = "";
      this.tfGenero.value = "";
      this.tfAno.value = "";
      
    }
  }

  //------------------------------------------------------------------------//

  statusApresentacao() {
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true;
    this.imgCartaz.hidden = false;
    this.tfCodigo.disabled = true;
    this.tfTitulo.disabled = true;
    this.divCartaz.hidden = true;
    this.tfGenero.disabled = true;
    this.tfAno.disabled = true;
    
  }
}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarPrimeiro();
}

//------------------------------------------------------------------------//

function fnBtProximo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarProximo();
}

//------------------------------------------------------------------------//

function fnBtAnterior() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarAnterior();
}

//------------------------------------------------------------------------//

function fnBtUltimo() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().apresentarUltimo();
}
//------------------------------------------------------------------------//

function fnBtIncluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarIncluir();
}

//------------------------------------------------------------------------//

function fnBtAlterar() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarAlterar();
}

//------------------------------------------------------------------------//

function fnBtExcluir() {
  // Aqui, o 'this' é o objeto Button. Eu adicionei o atributo 'viewer'
  // no botão para poder executar a instrução abaixo.
  this.viewer.getCtrl().iniciarExcluir();
}

//------------------------------------------------------------------------//

function fnBtOk() {
  const codigo = this.viewer.tfCodigo.value;
  const titulo = this.viewer.tfTitulo.value;
  const genero = this.viewer.tfGenero.value;
  const ano = this.viewer.tfAno.value;
  const cartaz = this.viewer.tfCartaz.value;

  this.viewer.getCtrl().efetivar(codigo, titulo, genero, ano, cartaz);

}

//------------------------------------------------------------------------//

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar();
}

//------------------------------------------------------------------------//
