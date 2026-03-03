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

export const heroSlides = [
  {
    id: 1,
    title: "Ganhe com o que\nvocê ama",
    subtitle:
      "Obtenha as melhores taxas, desbloqueie benefícios exclusivos e ganhe pontos resgatáveis",
    cta: "Reserve Mesa",
    ctaLink: "#",
    bgGradient:
      "linear-gradient(170deg, #2a1510 0%, #1a1210 30%, #181412 60%, #121212 100%)",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Poker em\nGrande Estilo",
    subtitle:
      "24 horas por dia, 7 dias por semana. Dealers treinados e ambiente sofisticado.",
    cta: "Reserve Mesa",
    ctaLink: "#",
    bgGradient:
      "linear-gradient(170deg, #15101a 0%, #0d1520 30%, #1a1510 60%, #121212 100%)",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Alta Gastronomia\n& Entretenimento",
    subtitle:
      "Sabores de diversas partes do mundo em um ambiente único e sofisticado.",
    cta: "Reserve Mesa",
    ctaLink: "#",
    bgGradient:
      "linear-gradient(170deg, #1a1015 0%, #150d10 30%, #10150d 60%, #121212 100%)",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  },
];

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
    link: "/torneios/main-event",
    tab: "home",
  },
  {
    id: 2,
    title: "Cash Game Premium",
    description: "Mesa VIP disponível",
    image: "/images/cash-game-premium.jpg",
    link: "/poker/cash-game",
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
    link: "/poker/cash-games",
    linkLabel: "Ver mesas →",
  },
  {
    id: 2,
    title: "Torneios",
    description: "Os principais torneios do clube",
    link: "/poker/torneios",
    linkLabel: "Ver agenda →",
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
    link: "/gastronomia/degustacao",
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
      { label: "Nossa História", href: "/sobre/historia" },
      { label: "Localização", href: "/sobre/localizacao" },
      { label: "Estrutura", href: "/sobre/estrutura" },
      { label: "Trabalhe Conosco", href: "/sobre/trabalhe-conosco" },
    ],
  },
  {
    id: "poker",
    title: "Poker",
    links: [
      { label: "Cash Game", href: "/poker/cash-game" },
      { label: "Torneios", href: "/poker/torneios" },
      { label: "Calendário", href: "/poker/calendario" },
      { label: "Regras", href: "/poker/regras" },
    ],
  },
  {
    id: "atendimento",
    title: "Atendimento",
    links: [
      { label: "Fale Conosco", href: "/atendimento/fale-conosco" },
      { label: "WhatsApp", href: "https://wa.me/5511941213898" },
      { label: "Reservas", href: "/atendimento/reservas" },
      { label: "Dúvidas Frequentes", href: "/atendimento/faq" },
    ],
  },
  {
    id: "institucional",
    title: "Institucional",
    links: [
      { label: "Jogo Responsável", href: "/institucional/jogo-responsavel" },
      { label: "Termos de Uso", href: "/institucional/termos" },
      { label: "Política de Privacidade", href: "/institucional/privacidade" },
      { label: "Cookies", href: "/institucional/cookies" },
    ],
  },
];
