const alunos = [];
const cursos = [];
const matriculas = [];
const notas = [];

// 1. Função de Cadastro de Aluno
function cadastrarAluno() {
  const idAluno = parseInt(document.getElementById('idAluno').value);
  const nomeAluno = document.getElementById('nomeAluno').value;

  const aluno = alunos.find(aluno => aluno.id == idAluno);

  if (aluno){
    imprimir(`O aluno ${idAluno} já existe!`);
    return;
  }

  alunos.push({ id: idAluno, nome: nomeAluno});

  imprimir(`Aluno id: ${idAluno} - nome: ${nomeAluno}`);
}

// 2. Função de Cadastro de Curso
function cadastrarCurso () {
  const idCurso = parseInt(document.getElementById('idCurso').value);
  const nomeCurso = document.getElementById('nomeCurso').value;

  const curso = cursos.find(curso => curso.id == idCurso);

  if(curso){
    imprimir(`O curso ${idCurso} já existe!`)
    return;
  }

  cursos.push({ id: idCurso, nome: nomeCurso});

  imprimir(`Curso id: ${idCurso} - nome: ${nomeCurso}`);
} 

// 3. Função de Matrícula de Aluno em Curso
function matricularAluno () {
  const idAlunoMatricula = parseInt(document.getElementById('idAlunoMatricula').value);
  const idCursoMatricula = parseInt(document.getElementById('idCursoMatricula').value);

  const curso = cursos.find (curso => curso.id == idCursoMatricula);

  if (!curso) {
    imprimir (`O curso ${idCursoMatricula} não existe!`)
    return;
  }

  const aluno = alunos.find (aluno => aluno.id == idAlunoMatricula);

  if (!aluno) {
    imprimir (`O aluno ${idAlunoMatricula} não existe!`)
    return;
  }

  const matricula = matriculas.find(matricula => (matricula.idAluno == idAlunoMatricula) && (matricula.idCurso == idCursoMatricula));

  if (matricula) {
    imprimir (`O aluno ${aluno.nome} já está matriculado no curso ${cursos.nome}!`);
    return;
  }

  matriculas.push({ idAluno: idAlunoMatricula, idCurso: idCursoMatricula});

  imprimir(`Aluno de id: ${idAlunoMatricula} cadastrado no curso de id ${idCursoMatricula}`);
}

// 4. Função de Lançamento de Nota
function lancarNota () {
  const idAlunoNota = parseInt(document.getElementById('idAlunoNota').value);
  const notaAluno = parseFloat(document.getElementById('notaAluno').value);

  if (notaAluno < 0 || notaAluno > 10) {
    imprimir(`Erro! Valor de nota inválido! Insira um valor entre 0 a 10.`);
    return;
  }

  const aluno = alunos.find( aluno => aluno.id == idAlunoNota);

  if(!aluno) {
    imprimir (`O aluno ${idAlunoMatricula} não existe!`)
    return;
  }

  const matricula = matriculas.find(matricula => (matricula.idAluno == idAlunoNota));

  if (!matricula) {
    imprimir (`O aluno ${aluno.nome} não está matriculado no curso ${cursos.nome}!`);
    return;
  }

  notas.push({ idAluno: idAlunoNota, nota: notaAluno});

  imprimir(`Lançado nota ${notaAluno} para o aluno de id ${idAlunoNota}`);
}

// 5. Função de Cálculo da Média de Notas
function calcularMediaAluno (idAluno) {
  const notasAluno = notas.filter(nota => nota.idAluno === idAluno);
  const valoresNotas = notasAluno.map(n=> n.nota);
  const somaNotas = valoresNotas.reduce((total,nota) => total + Number(nota),0);

  return somaNotas / notasAluno.length;
}

function calcularMedia () {
  const idAlunoMedia = parseFloat(document.getElementById('idAlunoMedia').value);

  const notasAluno = notas.filter(nota => nota.idAluno === idAlunoMedia);

  const valoresNotas = notasAluno.map(n => n.nota);

  const somaNotas = valoresNotas.reduce((total, nota) => total + parseFloat(nota), 0);

  let media = somaNotas/notasAluno.length;

  imprimir(`A média total do aluno é: ${media.toFixed(2)} - ${somaNotas}`);
}

// 6. Função de Listagem de Aluno
function listarAluno () {
  const idAlunoListar = parseInt(document.getElementById('idAlunoListar').value);

  const aluno = alunos.find(aluno => aluno.id == idAlunoListar);

  if (!aluno) {
    imprimir(`O aluno ${idAlunoListar} não está cadastrado.`);
    return;
  }

  imprimir (`O nome do aluno é ${aluno.nome}`)
}

// 7. Função de Listagem de Curso
function listarCurso () {
  const idCursoListar = parseInt(document.getElementById('idCursoListar').value);

  const curso = cursos.find(curso => curso.id == idCursoListar);

  if (!curso) {
    imprimir(`O curso com ID ${idCursoListar} não está cadastrado.`);
    return;
  }

  imprimir (`O nome do curso é ${curso.nome}`)
}

// 8. Função de Geração de Relatório de Alunos com Médias Abaixo de um Valor
function relatorioMediaBaixa () {
  const valorMediaBaixa = Number(document.getElementById('valorMediaBaixa').value);

  let alunoMediaBaixa = alunos.filter( aluno => {
    const media = calcularMediaAluno(aluno.id);

    return media < parseFloat(valorMediaBaixa);
  });

  imprimir (`Alunos com média baixa (${valorMediaBaixa}): ${JSON.stringify(alunoMediaBaixa, null, 2)}`);
}

// 9. Função de Geração de Relatório de Alunos com Médias Acima de um Valor
function relatorioMediaAlta (){
  const valorMediaAlta = Number(document.getElementById('valorMediaAlta').value);

  const alunosMediaAlta = alunos.filter(aluno => calcularMediaAluno(aluno.id) >= valorMediaAlta);

  imprimir (`Alunos com média alta (${valorMediaAlta}): ${JSON,stringify(alunosMediaAlta, null, 2)}`);
}

// 10. Função de Geração de Relatório de Alunos Aprovados e Reprovados'
function relatorioAprovacao() {
  const limiteAprovacao = Number(document.getElementById('limiteAprovacao').value);

  const situacaoAlunos = alunos.map (aluno => {
    const media = calcularMediaAluno(aluno.id);

    const status = media >= limiteAprovacao ? 'Aprovado' : 'Reprovado';

    return {
      ...aluno,
      media: media.toFixed(2),
      status
    };
  });

  imprimir(`Situação dos alunos. Valor limite da nota (${limiteAprovacao}): ${JSON.stringify(situacaoAlunos, null, 2)}`);
}

/* NOVAS FUNCIONALIDADES */

// 11. Recuperar Todos os Alunos

// 12. Recuperar Todas as Notas de um Aluno

// 13. Recuperar Todos os Cursos

// 14. Recuperar Todos os Alunos Matriculados em um Curso

function imprimir (mensagem) {
  let resultado =  document.getElementById('resultadoTexto').innerText;

  document.getElementById('resultadoTexto').innerText = `${mensagem}\n${resultado}`;
}