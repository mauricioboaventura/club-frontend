// ============================================================
// SITE DATA - Replace with CMS API calls when ready
// All content is centralized here for easy CMS migration.
// ============================================================

export const siteConfig = {
  name: "Monte Carlo Poker Club",
  phone: "+55 (11) 9 4121-3898",
  email: "contato@montecarloeventos.com",
  cnpj: "40.184.481/0001-57",
  instagram: "https://www.instagram.com/montecarlo.sp/",
  whatsapp: "https://wa.me/5511941213898",
  associateForm: "https://forms.office.com/r/zScWTERp2K",
};

export const discoverCategories = [
  { id: 1, label: "Shows", icon: "🎵", href: "/shows" },
  { id: 2, label: "Gastronomia", icon: "🍽️", href: "/gastronomia" },
  { id: 3, label: "Pacotes", icon: "📦", href: "/pacotes" },
  { id: 4, label: "Lounges", icon: "🛋️", href: "/lounges" },
];

export const experienceTabs = [
  { id: "home", label: "Home" },
  { id: "exclusive", label: "Exclusive" },
  { id: "poker", label: "Poker" },
  { id: "eventos", label: "Eventos" },
  { id: "rewards", label: "Rewards" },
];

export const experiences = [
  {
    id: 1,
    title: "Torneio em Destaque",
    description: "Main Event | R$ 50.000 GTD",
    image: "/images/torneio-destaque.jpg",
    link: "/poker?tab=torneios",
    tab: "home",
  },
  {
    id: 2,
    title: "Cash Game Premium",
    description: "Mesa VIP disponível",
    image: "/images/cash-game-premium.jpg",
    link: "/poker?tab=cashgame",
    tab: "home",
  },
  {
    id: 3,
    title: "Jazz Night Special",
    description: "Sexta-feira, 21h",
    image: "/images/jazz-night.jpg",
    link: "/eventos/jazz-night",
    tab: "home",
  },
];

export const pokerSections = [
  {
    id: 1,
    title: "Cash Games",
    description: "Mesas abertas diariamente, 24h",
    link: "/poker?tab=cashgame",
    linkLabel: "Ver mesas",
    image: "https://assets.rdc-dev.com.br/storage/v1/object/public/gallery-photos/imagens-botoes-site-Cashgame-WEB-.png",
  },
  {
    id: 2,
    title: "Torneios",
    description: "Os principais torneios do clube",
    link: "/poker?tab=torneios",
    linkLabel: "Ver agenda",
    image: "https://assets.rdc-dev.com.br/storage/v1/object/public/gallery-photos/imagens-botoes-site-torneios-WEB.png",
  },
];

export const restaurants = [
  {
    id: 1,
    name: "Restaurante Oriol",
    cuisine: "Culinária contemporânea com toques brasileiros",
    image: "/images/restaurante-oriol.jpg",
    isOpen: true,
    link: "/gastronomia/oriol",
  },
  {
    id: 2,
    name: "Experiência Gastronômica",
    cuisine: "Menu degustação exclusivo",
    image: "/images/experiencia-gastronomica.jpg",
    isOpen: false,
    link: "/gastronomia/550e8400-e29b-41d4-a716-446655440000",
  },
];

export const shows = [
  {
    id: 1,
    title: "Jazz Night",
    date: "Sexta, 14 de Fev - 21h",
    location: "Lounge Monte Carlo",
    image: "/images/jazz-night-show.jpg",
    link: "/eventos/jazz-night",
  },
  {
    id: 2,
    title: "DJ Session",
    date: "Sábado, 15 de Fev",
    location: "Área VIP",
    image: "/images/dj-session.jpg",
    link: "/eventos/dj-session",
  },
];

export const accordionItems = [
  {
    id: "sobre",
    title: "Sobre o Monte Carlo",
    links: [
      { label: "Nossa História", href: "/sobre#nossa-historia" },
      { label: "Localização", href: "/sobre#localizacao" },
      { label: "Estrutura", href: "/sobre#estrutura" },
      { label: "Fale Conosco", href: "/sobre#contato" },
    ],
  },
  {
    id: "poker",
    title: "Poker",
    links: [
      { label: "Cash Game", href: "/poker?tab=cashgame" },
      { label: "Torneios", href: "/poker?tab=torneios" },
      { label: "Calendário", href: "/poker" },
      { label: "Regras", href: "/REGULAMENTO-DE-TORNEIOS-MC-2026.pdf" },
    ],
  },
  {
    id: "atendimento",
    title: "Atendimento",
    links: [
      { label: "Fale Conosco", href: "/sobre#contato" },
      { label: "WhatsApp", href: "https://wa.me/5511941213898" },
      { label: "Reservas", href: "/sobre#contato" },
      // { label: "Dúvidas Frequentes", href: "/sobre#contato" },
    ],
  },
  {
    id: "institucional",
    title: "Institucional",
    links: [
      { label: "Jogo Responsável", href: "/jogo-responsavel" },
      { label: "Termos de Uso", href: "/institucional/termos" },
      { label: "Política de Privacidade", href: "/institucional/privacidade" },
      { label: "Cookies", href: "/institucional/cookies" },
    ],
  },
];
