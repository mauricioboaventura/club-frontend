# Monte Carlo Poker Club — Next.js

Recriação fiel do site [montecarloclube.com](https://montecarloclube.com) em **Next.js 14 (App Router)** com **Tailwind CSS**, pronto para integração com CMS.

## Instalação

```bash
npm install
npm run dev
```

Acesse em [http://localhost:3000](http://localhost:3000)

## Estrutura

```
monte-carlo/
├── app/
│   ├── globals.css        # Estilos globais + tema dark/gold
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página inicial (monta todos os componentes)
├── components/
│   ├── Header.tsx         # Navbar + menu mobile
│   ├── HeroCarousel.tsx   # Hero com cartas e carrossel
│   ├── DiscoverSection.tsx # Seção "Descubra" com ícones
│   ├── ExperiencesSection.tsx # Tabs + cards horizontais
│   ├── PokerSection.tsx   # Cash Games + Torneios
│   ├── GastronomySection.tsx  # Cards de restaurantes
│   ├── ShowsSection.tsx   # Cards de shows/eventos
│   ├── CtaSections.tsx    # Rewards, Signup, App Download
│   ├── AccordionSection.tsx # Seções accordion do footer
│   └── Footer.tsx         # Rodapé com socials
├── lib/
│   └── data.ts            # ⭐ TODOS os dados do site centralizados
└── public/
    └── images/            # Adicione as imagens originais aqui
```

## Integração com CMS

Todo o conteúdo está centralizado em `lib/data.ts`:

- `discoverCategories` — Categorias "Descubra"
- `experienceTabs` + `experiences` — Tabs e cards de experiências
- `pokerSections` — Seção Poker
- `restaurants` — Seção Gastronomia
- `shows` — Shows & Eventos
- `accordionItems` — Accordion do footer
- `siteConfig` — Dados gerais (telefone, email, CNPJ)

Para migrar para um CMS (Strapi, Sanity, Contentful):

1. Crie os content types correspondentes no CMS
2. Substitua as importações de `lib/data.ts` por `fetch` para a API do CMS
3. Use Server Components do Next.js para buscar os dados

## Seções do Site

| Seção | Componente | Descrição |
|-------|-----------|-----------|
| Header | `Header.tsx` | Logo + search + hamburger |
| Hero | `HeroCarousel.tsx` | Cartas + texto + CTA + dots |
| Descubra | `DiscoverSection.tsx` | Shows, Gastronomia, Pacotes, Lounges |
| Experiências | `ExperiencesSection.tsx` | Tabs (Home, Exclusive...) + cards |
| Poker | `PokerSection.tsx` | Cash Games + Torneios |
| Gastronomia | `GastronomySection.tsx` | Restaurantes com reserva |
| Shows | `ShowsSection.tsx` | Eventos com data/local |
| Rewards | `CtaSections.tsx` | Monte Carlo Rewards |
| Cadastro | `CtaSections.tsx` | Entre ou cadastre-se |
| Accordion | `AccordionSection.tsx` | Sobre, Poker, Atendimento, Institucional |
| App | `CtaSections.tsx` | Download App Store / Google Play |
| Footer | `Footer.tsx` | Links, socials, copyright |

## Paleta

| Cor | Hex | Uso |
|-----|-----|-----|
| Background | `#121212` | Fundo principal |
| Card | `#1e1e1e` | Superfícies de cards |
| Gold | `#c4a265` | Cor destaque |
| Red | `#8b1a1a` | Tab ativa |
| Green | `#2d8a4e` | Badge "Aberto hoje" |
| Text Primary | `#f0ece4` | Texto principal |
| Text Secondary | `#9e9a92` | Texto secundário |
