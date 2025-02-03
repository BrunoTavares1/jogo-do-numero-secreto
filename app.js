let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
   let campo = document.querySelector(tag);
   campo.innerHTML = texto;
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
   exibirTextoNaTela('h1', 'Jogo do número secreto');
   exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
   let chute = document.querySelector('input').value;

   if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
      responsiveVoice.speak(mensagemTentativas, 'Brazilian Portuguese Female', {rate:1.2});
      exibirTextoNaTela('p', mensagemTentativas);
      document.getElementById('reiniciar').removeAttribute('disabled');
   } else if (chute > numeroSecreto) {
      exibirTextoNaTela('p', `O número secreto é menor. O último número que você chutou foi ${chute}.`);
   } else {
      exibirTextoNaTela('p', `O número secreto é maior. O último número que você chutou foi ${chute}.`);
   }
   tentativas++;
   limparCampo();
}


function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
   let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

   if (quantidadeDeElementosDaLista == numeroLimite) {
      listaDeNumerosSorteados = [];
   }

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Método .includes é usado para verificar se um determinado valor existe dentro de uma lista
      return gerarNumeroAleatorio();
   } else {
      listaDeNumerosSorteados.push(numeroEscolhido); // Método .push é usado para adicionar um novo item ao final de uma lista
      console.log(listaDeNumerosSorteados);
      return numeroEscolhido;
   }
}

function limparCampo() {
   chute = document.querySelector('input');
   chute.value = '';
   chute.focus(); // Coloca o cursor de volta no input
}

function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   exibirMensagemInicial()
   limparCampo();
   tentativas = 1;
   document.getElementById('reiniciar').setAttribute('disabled', true);
}