/*****************************DOC**************************************
 * Objetivo: Criar uma API para manipulação de estados e cidades
 * Data: 10/03/2023
 * Autor: Vinicius Nunes
 * Versão: 1.0
 * *******************************************************************/
/*****************************INFOS************************************
 * Express: Uma dependência do Node, que permite a
 * integração entre o protocolo http com o código
 *
 * código do express (CMD): npm install express --save
 *
 * cors: Gerenciador de permissões do protocolo HTTP
 * código cors: npm install cors --save
 *
 * body-parser: É uma dependência que permite manipular dados enviados pelo body da requisição
 * código body-parser: npm install body-parser --save
 *
 * *******************************************************************/
/**
 * Express: responsável pela requisição
 * Cors: responsável pelas permissões das requisições
 * body-parser: responsável pela manipulação do body da requisição
 *
 * *****************************************************************/

//Imports das dependencias para criar a API
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const { response } = require('express')
const port = process.env.PORT || 8080

//impor to arquivo de funções
const estadosCidades = require('./modulo/estados_cidades.js')


//Cria um objeto com as informações da classe express
const app = express();

app.use((request, response, next) => {
  /*Permite gerenciar a origem das requisições da API,
   * o (*) significa que será pública
   * caso não for, deve ser escrito o IP
   */
  response.header("Access-Control-Allow-Origin", "*");

  /*Permite gerenciar quais métodos tem liberação para a requisição*/
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  /*Ativa no cors das requisições as permissões estabelecidas*/
  app.use(cors());

  next();
});

/*endPoints */

//criar a string abaixo com (/) e sem espaços, minusculo e sem caractere especial
//endPoint para listar os Estados
app.get("/v1/senai/estados", cors(), async function (request, response, next) {

  let listaDeEstados = estadosCidades.getListaDeEstados()

  if (listaDeEstados) {
    response.json(listaDeEstados);
    response.status(200);
  } else {
    response.status(500)
  }
});

//endPoint para listar as caracteristicas do estado pela sigla informada

app.get("/v1/senai/estado/sigla/:uf", cors(), async function (request, response, next) {
  // '/:uf' é uma variavel utilizada para passagem de valor

  // siglaEstado recebe o conteudo da variavel :uf
  let siglaEstado = request.params.uf
  let statusCode
  let dadosEstado = {}

  if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
    statusCode = 400
    dadosEstado.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
  } else {
    let estado = estadosCidades.getDadosEstado(siglaEstado)
    if (estado) {
      statusCode = 200
      dadosEstado = estado
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosEstado)
})

app.get("/v1/senai/dados-estado/sigla-estado/:uf", cors(), async function (request, response, next) {
  // '/:uf' é uma variavel utilizada para passagem de valor

  // siglaEstado recebe o conteudo da variavel :uf
  let siglaEstado = request.params.uf
  let statusCode
  let dadosEstado = {}

  if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
    statusCode = 400
    dadosEstado.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
  } else {
    let estado = estadosCidades.getDadosEstado(siglaEstado)
    if (estado) {
      statusCode = 200
      dadosEstado = estado
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosEstado)
})

app.get("/v1/senai/capital/sigla-do-estado/:uf", cors(), async function (request, response, next) {
  // '/:uf' é uma variavel utilizada para passagem de valor

  // siglaEstado recebe o conteudo da variavel :uf
  let siglaEstado = request.params.uf
  let statusCode
  let dadosEstado = {}

  if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
    statusCode = 400
    dadosEstado.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
  } else {
    let estado = estadosCidades.getCapitalEstado(siglaEstado)
    if (estado) {
      statusCode = 200
      dadosEstado = estado
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosEstado)
})


app.get("/v1/senai/regioes/:regiao", cors(), async function (request, response, next) {
  // '/:uf' é uma variavel utilizada para passagem de valor

  // siglaEstado recebe o conteudo da variavel :uf
  let nomeRegiao = request.params.regiao
  let statusCode
  let dadosEstado = {}

  if (nomeRegiao == '' || nomeRegiao == undefined || !isNaN(nomeRegiao)) {
    statusCode = 400
    dadosEstado.message = "Não é possível processar a requisição, pois a região não foi informada ou não atende."
  } else {
    let estado = estadosCidades.getEstadosRegiao(nomeRegiao)
    if (estado) {
      statusCode = 200
      dadosEstado = estado
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosEstado)
})


app.get("/v1/senai/capitais", cors(), async function (request, response, next) {

  let listaDeCapitais = estadosCidades.getCapitalPais()

  if (listaDeCapitais) {
    response.json(listaDeCapitais);
    response.status(200);
  } else {
    response.status(500)
  }
})


app.get("/v1/senai/cidades/:uf", cors(), async function (request, response, next) {
  // '/:uf' é uma variavel utilizada para passagem de valor

  // siglaEstado recebe o conteudo da variavel :uf
  let siglaEstado = request.params.uf
  let statusCode
  let dadosEstado = {}

  if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
    statusCode = 400
    dadosEstado.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
  } else {
    let estado = estadosCidades.getCidades(siglaEstado)
    if (estado) {
      statusCode = 200
      dadosEstado = estado
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosEstado)
})

//endpoint lista de cidades filtrada pela sigla dos estados

app.get('/v1/senai/cidades', cors(), async function (request, response, next) {

  /**
   *  Usei a query para receber diversas variaveis para realizar filtros,
   * também usei o paramas para receber o ID (PK), 
   * 
   * 
   */
  // Recebe o valor da váriavel que é enviada por QueryString
  let siglaEstado = request.query.uf

  let statusCode
  let dadosCidade = {}

  if (siglaEstado == '' || siglaEstado == undefined || siglaEstado.length != 2 || !isNaN(siglaEstado)) {
    statusCode = 400
    dadosCidade.message = "Não é possível processar a requisição, pois a sigla do estado não foi informada ou não atende a quantidade de caracteres (2)."
  } else {
    let cidade = estadosCidades.getCidades(siglaEstado)
    if (cidade) {
      statusCode = 200
      dadosCidade = cidade
    } else {
      statusCode = 404
    }
  }
  response.status(statusCode)
  response.json(dadosCidade)
})

//Permite carregar os endpoints criados e aguardar as requisições pelo protocolo HTTP na porta 8080
app.listen(port, function () {
  console.log("Servidor aguardando requisições");
});

//acessando: http://localhost:8080/estados