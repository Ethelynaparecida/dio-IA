# 🍃 Calculadora de Emissão de CO₂

Este projeto é uma aplicação web desenvolvida para calcular a emissão de dióxido de carbono (CO₂) gerada por diferentes meios de transporte com base na distância percorrida entre uma origem e um destino.

O objetivo é conscientizar sobre o impacto ambiental dos deslocamentos e demonstrar, de forma prática, como diferentes escolhas de transporte influenciam a emissão de gases do efeito estufa.

## Funcionalidades

* Cálculo de emissão de CO₂ para diferentes meios de transporte:

  * Bicicleta
  * Carro
  * Ônibus
  * Caminhão
* Preenchimento automático da distância para rotas cadastradas
* Inserção manual de distância quando a rota não estiver disponível
* Comparação das emissões entre todos os meios de transporte
* Estimativa de créditos de carbono necessários para compensação das emissões
* Interface simples e responsiva

## Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* GitHub Copilot

## Desenvolvimento com GitHub Copilot

Este projeto foi desenvolvido com o apoio do GitHub Copilot, utilizando recursos de Inteligência Artificial para auxiliar na geração de código, documentação, comentários e sugestões de implementação.

Durante o desenvolvimento, o Copilot foi utilizado como ferramenta de apoio para:

* Estruturar a arquitetura do projeto
* Criar funções e componentes JavaScript
* Gerar comentários e documentação do código
* Sugerir melhorias de legibilidade e organização
* Auxiliar na identificação e correção de problemas

Todas as sugestões foram analisadas, adaptadas e validadas durante o processo de desenvolvimento.

## Como Utilizar

1. Informe a cidade de origem.
2. Informe a cidade de destino.
3. Caso a rota esteja cadastrada, a distância será preenchida automaticamente.
4. Selecione o meio de transporte.
5. Clique em **Calcular Emissão**.
6. Consulte os resultados apresentados na tela.

## Estrutura do Projeto

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── calculator.js
│   ├── config.js
│   ├── routes-data.js
│   └── ui.js
└── README.md
```

## Melhorias Futuras

* Integração com APIs de mapas para cálculo automático de qualquer rota
* Ampliação da base de cidades e trajetos
* Inclusão de novos meios de transporte
* Exportação dos resultados em PDF
* Histórico de consultas realizadas

## Autor

Projeto desenvolvido como parte dos estudos de desenvolvimento web e utilização de Inteligência Artificial aplicada à programação com GitHub Copilot.
