const alunos = [];
const cursos = [];
const matriculas = [];
const notas = [];

// 1. Função de Cadastro de Aluno
function cadastrarAluno() {
  const idAluno = parseInt(document.getElementById('idAluno').value);
  const nomeAluno = document.getElementById('nomeAluno').value;

  alunos.push({ id: idAluno, nome: nomeAluno});

  imprimir(`Aluno id: ${idAluno} - nome: ${nomeAluno}`);
}

// 2. Função de Cadastro de Curso
function cadastrarCurso () {
  const idCurso = parseInt(document.getElementById('idCurso').value);
  const nomeCurso = document.getElementById('nomeCurso').value;

  cursos.push({ id: idCurso, nome: nomeCurso});

  imprimir(`Curso id: ${idCurso} - nome: ${nomeCurso}`);
} 

// 3. Função de Matrícula de Aluno em Curso
function matricularAluno () {
  const idAlunoMatricula = parseInt(document.getElementById('idAlunoMatricula').value);
  const idCursoMatricula = parseInt(document.getElementById('idCursoMatricula').value);

  matriculas.push({ idAluno: idAlunoMatricula, idCurso: idCursoMatricula});

  imprimir(`Aluno de id: ${idAlunoMatricula} cadastrado no curso de id ${idCursoMatricula}`);
}

// 4. Função de Lançamento de Nota
function lancarNota () {
  const idAlunoNota = parseInt(document.getElementById('idAlunoNota').value);
  const notaAluno = parseFloat(document.getElementById('notaAluno').value);

  notas.push({ idAluno: idAlunoNota, nota: notaAluno});

  imprimir(`Lançado nota ${notaAluno} para o aluno de id ${idAlunoNota}`);
}

// 5. Função de Cálculo da Média de Notas
function calcularMedia () {
  const idAlunoMedia = parseFloat(document.getElementById('idAlunoMedia').value);

  const notasAluno = notas.filter(nota => nota.idAluno === idAlunoMedia);

  const valoresNotas = notasAluno.map(n => n.nota);

  const somaNotas = valoresNotas.reduce((total, nota) => total + parseFloat(nota), 0);

  let media = somaNotas/notasAluno.length;

  imprimir(`A média total do aluno é: ${media.toFixed(2)} - ${somaNotas}`);
}

// 6. Função de Listagem de Aluno

// 7. Função de Listagem de Curso

// 8. Função de Geração de Relatório de Alunos com Médias Abaixo de um Valor

// 9. Função de Geração de Relatório de Alunos com Médias Acima de um Valor

// 10. Função de Geração de Relatório de Alunos Aprovados e Reprovados'

/* NOVAS FUNCIONALIDADES */

// 11. Recuperar Todos os Alunos

// 12. Recuperar Todas as Notas de um Aluno

// 13. Recuperar Todos os Cursos

// 14. Recuperar Todos os Alunos Matriculados em um Curso

function imprimir (mensagem) {
  document.getElementById('resultadoTexto').innerText = mensagem;
}