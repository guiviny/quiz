// Variáveis para controlar o estado do quiz
let questaoAtual = 0; // Índice da pergunta atual
let perguntasCorretas = 0; // Contador de respostas corretas
let alternativaMarcada = ''; // Alternativa marcada pelo usuário
let codQuestionImg = 0; // Variável para atualizar a imagem da questão

// Inicia o quiz mostrando a primeira pergunta
mostrarPergunta();

function mostrarPergunta() {
    // Verifica se há perguntas restantes
    if (questions[questaoAtual]) {
        let q = questions[questaoAtual];

        // Mostra a área da pergunta e oculta a área de pontuação
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.scoreArea').style.display = 'none';

        // Atualiza a barra de progresso na parte superior da tela
        let pct = Math.floor((questaoAtual / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        let imagens = '';
        let alternatives = ''
        // Gera as opções de imagem para a pergunta atual
        for (let i in q.options) {
            imagens += `<div class="divIMG${i}"> <p clas="alternativa${i}">${questions[questaoAtual].options[i]}</p> <img src="img/java${parseInt(i)}q${codQuestionImg}.png" class="alternative" data-op="${parseInt(i) + 1}" alt=""></div>`;
            
        }
        
        // Incrementa o código da imagem para as próximas questões
        codQuestionImg++;
        
        // Insere as imagens na área de alternativas
        document.querySelector('.imgAlternatives').innerHTML = imagens;
        document.querySelector('.options').innerHTML = alternatives;
        // Adiciona eventos de clique em cada alternativa
        document.querySelectorAll('.imgAlternatives .alternative').forEach(option => {
            option.addEventListener('click', optionClickEvent);
        });
    } else {
        // Se não houver mais perguntas, finaliza o quiz
        finalizarQuiz();
    }
}

function optionClickEvent(evento) {
    // Obtém a opção clicada
    let opcaoClick = parseInt(evento.target.getAttribute('data-op'));
    
    // Verifica se a resposta está correta
    if (questions[questaoAtual].answer === opcaoClick) {
        perguntasCorretas++; // Incrementa o contador de respostas corretas
    }

    // Avança para a próxima pergunta
    questaoAtual++;
    mostrarPergunta(); // Exibe a próxima pergunta
}

function finalizarQuiz() {
    // Calcula a pontuação final
    let pontos = Math.floor((perguntasCorretas / questions.length) * 100);
    document.querySelector('.scorePct').innerHTML = `Você acertou ${pontos}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${perguntasCorretas}.`;

    // Define a mensagem e cor da pontuação com base no desempenho
    if (pontos < 30) {
        document.querySelector('.scoreText1').innerHTML = `Tá ruim!`;
        document.querySelector('.scorePct').style.color = `red`;
        //alterar logo de acordo com a quantidade de pontos
        //document.querySelector('.prizeImage').src = 'img/java1q1.jpg'; fazer isso para as seguntes verificaçõe de if

    } else if (pontos >= 30 && pontos < 70) {
        document.querySelector('.scoreText1').innerHTML = `Tá bom!`;
        document.querySelector('.scorePct').style.color = `yellow`;
    } else {
        document.querySelector('.scoreText1').innerHTML = `Parabéns!`;
        document.querySelector('.scorePct').style.color = `#0d630d`;
    }

    // Oculta a área de perguntas e mostra a área de pontuação
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.progress--bar').style.width = '100%';

    // Reinicia o quiz ao clicar no botão
    document.querySelector('button').addEventListener('click', () => {
        questaoAtual = 0; // Reseta a pergunta atual
        perguntasCorretas = 0; // Reseta o contador de respostas corretas
        codQuestionImg = 0; // Reseta o código da imagem
        mostrarPergunta(); // Mostra a primeira pergunta novamente
    });
}
