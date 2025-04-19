document.addEventListener('deviceready', onDeviceReady, false);

const API_URL = 'http://localhost:3000/api/tarefas'; // Substitua pelo seu endpoint

function onDeviceReady() {
  console.log('Dispositivo pronto');
  carregarTarefas();
}

function erroAPI(err) {
  console.error("Erro na API: ", err);
  alert("Ocorreu um erro. Por favor, tente novamente.");
}

async function adicionarTarefa() {
  const texto = document.getElementById("novaTarefa").value.trim();

  if (texto === "") return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto })
    });

    if (!response.ok) throw new Error('Falha ao adicionar tarefa');

    document.getElementById("novaTarefa").value = "";
    await carregarTarefas();
  } catch (err) {
    erroAPI(err);
  }
}

async function carregarTarefas() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao carregar tarefas');
    
    const tarefas = await response.json();

    tarefas.forEach(tarefa => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${tarefa.texto}</span>
        <button onclick="editarTarefa(${tarefa.id}, '${tarefa.texto.replace(/'/g, "\\'")}')">Editar</button>
        <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
      `;
      lista.appendChild(li);
    });
  } catch (err) {
    erroAPI(err);
  }
}

async function editarTarefa(id, textoAtual) {
  const novoTexto = prompt("Editar tarefa:", textoAtual);

  if (novoTexto && novoTexto.trim() !== "") {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: novoTexto })
      });

      if (!response.ok) throw new Error('Falha ao editar tarefa');
      
      await carregarTarefas();
    } catch (err) {
      erroAPI(err);
    }
  }
}

async function excluirTarefa(id) {
  if (!confirm("Tem certeza que deseja excluir esta tarefa?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Falha ao excluir tarefa');
    
    await carregarTarefas();
  } catch (err) {
    erroAPI(err);
  }
}