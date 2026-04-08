# dio-IA

# Miniguia de Estudos: Engenharia de Prompt e Eficiência de Tokens

Este repositório foi desenvolvido como parte de um desafio prático na **DIO (Digital Innovation One)**. O projeto foca na utilização do **NotebookLM** como ferramenta de aprendizagem ativa para explorar as melhores práticas de Engenharia de Prompt, com foco especial em precisão e economia de tokens.

---

## Contexto e Objetivos

Com a ascensão das Large Language Models (LLMs), a habilidade de se comunicar de forma eficiente com a IA tornou-se crucial. Este caderno temático visa transformar a "conversa" com a IA em uma ferramenta técnica otimizada.

**Objetivos de Estudo:**
* Compreender a estrutura de um prompt de alta performance.
* Aprender técnicas para reduzir o consumo de tokens (economia de custos e latência).
* Utilizar o NotebookLM para sintetizar conhecimentos de múltiplas fontes técnicas.
* Criar um repositório de prompts reutilizáveis para o dia a dia do desenvolvedor.

---

## Curadoria de Fontes

Para alimentar o NotebookLM, selecionei as seguintes fontes de referência (disponíveis no repositório ou via link):

1.  **OpenAI Prompt Engineering Guide** - [Link](https://platform.openai.com/docs/guides/prompt-engineering).
2.  **Prompt Engineering Guide (DAIR-AI)** - [Link](https://www.promptingguide.ai/pt).
3.  **Video: "How I cut token costs by 90%: AI cost optimization guide"** - [Link](https://www.youtube.com/watch?v=4x4nM0uPmg0).
4.  **AI Tokens: The Secret to AI Pricing, Speed, and Cost Optimization"** - [Link](https://www.youtube.com/watch?v=49ouVgCxQos).

---

## Engenharia de Prompts e "Cicatrizes"

Nesta seção, documento os testes realizados durante a curadoria no NotebookLM.

###  Testes Realizados

#### 1. Resumos Técnicos 
* ** Prompt Ineficiente:** "Pode fazer um resumo desse texto para mim? Quero entender os pontos principais de forma detalhada."
* ** Prompt Engenheirado:** `Resuma o texto abaixo em 5 bullet points técnicos. Foco em arquitetura e performance. Não inclua introduções educadas. Texto: [TEXTO QUE QUER O RESUMO]`
* **Insight:** A remoção da polidez e a definição de um limite de tópicos reduziu a saída em cerca de 50 tokens sem perder informação vital.

#### 2. Geração de Código Python
* ** Prompt Ineficiente:** "Escreva um código em Python que leia um CSV e mostre um gráfico. Explique como o código funciona passo a passo."
* ** Prompt Engenheirado:** `Atue como Dev Senior Python. Escreva um script para ler 'dados.csv' e plotar histograma (Matplotlib). Saída: Apenas código, sem explicações textuais, use comentários inline curtos.`
* **Insight:** Pedir "Apenas código" evita que a IA gaste tokens explicando o que o código já deixa óbvio para um desenvolvedor.

#### 3. Extração de Dados
* ** Prompt Ineficiente:** "Quais são as tecnologias citadas nesse texto? Faça uma lista para mim."
* ** Prompt Engenheirado:** `Liste as tecnologias do texto. Formato: JSON [item1, item2]. Se não houver, retorne [].`
* **Insight:** Formatar a saída como JSON elimina palavras de transição e facilita a integração com outros scripts.

---

## Miniguia de Estudo 

### 1. Resumos Estruturados
A Engenharia de Prompt não é sobre "falar" com a máquina, mas sobre **programar em linguagem natural**. A eficiência de tokens é alcançada através de:
* **Contexto Delimitado:** Uso de `###` ou `"""` para separar instruções de dados.
* **Saída Estruturada:** Solicitar respostas em `JSON` ou `Markdown` para evitar textos explicativos desnecessários.
* **Instruções Negativas:** Dizer explicitamente "Não inclua preâmbulos ou explicações" para economizar tokens de saída.

### 2. Glossário de Conceitos-Chave
* **Token:** A unidade básica de processamento (aprox. 4 caracteres em inglês).
* **Temperature:** Parâmetro que define a aleatoriedade (0 para técnico, 1 para criativo).
* **System Prompt:** Instrução de "personalidade" que define o comportamento base da IA.
* **Context Window:** O limite máximo de tokens que a IA consegue "lembrar" em uma sessão.

### 3. Prompts Reutilizáveis
* **Refatoração Eficiente:** `Refatore o código abaixo para [Linguagem]. Saída: apenas o código dentro de um bloco de código.`
* **Extração de Dados:** `Extraia os nomes e cargos do texto abaixo. Formato: CSV. Texto: [Insira aqui]`
* **Explicação Técnica:** `Explique [Conceito] para um desenvolvedor Senior. Seja sucinto e use analogias de hardware.`

---

## Ferramentas Utilizadas
* [NotebookLM](https://notebooklm.google.com/)
* [ChatGPT/Gemini](https://gemini.google.com/) (Para validação de prompts)
* [GitHub](https://github.com/) (Para versionamento e portfólio)

