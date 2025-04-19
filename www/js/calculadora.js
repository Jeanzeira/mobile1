let display = document.getElementById("display");
let operacaoAtual = "";
let valorAnterior = "";

function adicionar(valor) {
  display.value += valor;
}

function limpar() {
  display.value = "";
}

function operacao(op) {
  operacaoAtual = op;
  valorAnterior = display.value;
  display.value = "";
}

function calcular() {
  let resultado;
  let valorAtual = display.value;
  
  switch (operacaoAtual) {
    case '+':
      resultado = parseFloat(valorAnterior) + parseFloat(valorAtual);
      break;
    case '-':
      resultado = parseFloat(valorAnterior) - parseFloat(valorAtual);
      break;
    case '*':
      resultado = parseFloat(valorAnterior) * parseFloat(valorAtual);
      break;
    case '/':
      resultado = parseFloat(valorAnterior) / parseFloat(valorAtual);
      break;
    default:
      resultado = valorAtual;
  }

  display.value = resultado;
}
