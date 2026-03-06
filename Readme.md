# Calarke Energia — Calculadora de Economia Solar

**Plataforma web para simulação de economia com energia solar fotovoltaica, com calculadora interativa por estado, páginas institucionais completas e sistema de captação de leads.**

---

## Sobre Calarke

O **Calarke Energia** é uma aplicação frontend desenvolvida em React que permite ao usuário simular, em tempo real, quanto economizaria ao migrar para energia solar com base no consumo mensal (kWh) e no estado onde reside.

O projeto resolve três problemas centrais de empresas do setor de energia:

1. **Baixa conversão no topo do funil** — a calculadora gera engajamento imediato ao mostrar o impacto financeiro concreto ainda na primeira visita
2. **Custo de qualificação de leads** — o formulário de contato coleta dados técnicos (consumo, estado, tipo de serviço) antes do primeiro contato humano
3. **Falta de presença digital institucional** — páginas de Serviços, Sobre, FAQ, Suporte e Carreira constroem autoridade e credibilidade da marca

---

## Stack e Tecnologias

- **React**
- **React Router DOM**
- **Tailwind CSS**
- **Lucide React**
- **Vite**
- **Vitest**
- **Apollo Client**
- **Docker**
- **Docker Compose**
- **Prettier**
- **ESLint**

## Padrão de Arquitetura — Atomic Design

O projeto segue rigorosamente o **Atomic Design** de Brad Frost, que organiza componentes em níveis crescentes de complexidade:

```
Atoms -> Molecules -> Organisms -> Pages
```

### Atoms

Componentes de UI puros, sem lógica de negócio, sem dependências de outros componentes do projeto. Recebem apenas props e disparam callbacks. Exemplos: `NumberInput`, `SelectInput`, `SubmitButton`.

### Molecules

Combinam 2 ou mais atoms para formar uma unidade funcional com responsabilidade clara. Podem ter estado local simples. Exemplos: `InputConsumo` (Label + NumberInput), `SeletorEstado` (Label + SelectInput), `BotoesCalculoEnergia` (SubmitButton + ResetButton).

### Organisms

Seções completas e autossuficientes da interface, com lógica de negócio própria (useState, handlers, cálculos). São independentes de contexto de página. Exemplos: `Header`, `Footer`, `FormularioCalculo`.

### Pages

Compõem organisms e moléculas para formar telas completas. Geralmente contêm apenas layout e dados específicos da rota, delegando lógica para os organismos filhos.

---

## **Rotas da Aplicação**

- **/** ou **/home** — `HomePage`
  Calculadora de economia solar

- **/contato** — `ContatoPage`
  Formulário de solicitação de proposta

- **/servicos** — `ServicosPage`
  Catálogo de serviços com FAQ

- **/sobre** — `SobrePage`
  Página institucional e história da empresa

- **/faq** — `FAQPage`
  Perguntas frequentes com busca e filtros

- **/suporte** — `SuportePage`
  Central de suporte e abertura de chamados

- **/carreira** — `CarreiraPage`
  Vagas abertas e cultura organizacional

- **/demo** — `DemoPage`
  Demonstração interativa com simulador ao vivo

---

## Como Rodar o Projeto

### Com Docker (recomendado)

```bash
# Sobe o container em modo desenvolvimento com hot reload
docker-compose up

# Acesse em: http://localhost:5176
```

### Sem Docker

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

### Scripts disponíveis

```bash
npm run dev            # Inicia o servidor Vite na porta 5176
npm run build          # Gera o build de produção em /dist
npm run lint           # Verifica erros com ESLint
npm run format         # Formata o código com Prettier
npm run format:check   # Verifica formatação sem alterar arquivos
npm run test           # Roda os testes com Vitest
npm run test:ui        # Abre a interface visual do Vitest
npm run test:coverage  # Gera relatório de cobertura de testes
```

---

## Lógica de Cálculo de Economia

```js
// Custo mensal atual na distribuidora
const custoAtual = consumoKwh * tarifaEstado;

// Economia estimada com energia solar (mínimo 15%)
const economiaMensal = custoAtual * 0.15;

// Custo após instalação solar
const custoComSolar = custoAtual - economiaMensal;

// Projeção anual
const economiaAnual = economiaMensal * 12;
```

## Dados de Configuração

### Tarifas por Estado

### Tarifa de Energia por Estado

**São Paulo (SP)**
R$ 0,656 por kWh

**Rio de Janeiro (RJ)**
R$ 0,789 por kWh

**Minas Gerais (MG)**
R$ 0,612 por kWh

**Espírito Santo (ES)**
R$ 0,701 por kWh

**Paraná (PR)**
R$ 0,598 por kWh

## Autor

**Everton Eduardo**
Projeto desenvolvido como aplicação frontend para simulação de economia com energia solar — versão `1.0.0`.
