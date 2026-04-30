export const STATS = {
  totalProperties: 12,
  activeLeases: 5,
  pendingMaintenance: 2
};

// Adicione isso ao final do seu src/lib/mockData.js



// Caso o erro pule para 'NOTIFICATIONS', já deixe pronto:
export const NOTIFICATIONS = [
  { id: 1, text: "Nova proposta recebida", time: "5 min atrás" },
  { id: 2, text: "Manutenção agendada para a Frota A", time: "2 horas atrás" },
];

// 1. PRIMEIRO: Defina o array principal com todos os dados
export const PROPERTIES = [
  { id: 1, title: "Apartamento de Luxo", price: 150000, location: "Luanda", beds: 3, baths: 2, sqft: 150, images: ["https://picsum.photos/800/600?random=1"] },
  { id: 2, title: "Vivenda T4", price: 300000, location: "Talatona", beds: 4, baths: 3, sqft: 250, images: ["https://picsum.photos/800/600?random=2"] },
  { id: 3, title: "Casa de Praia", price: 200000, location: "Mussulo", beds: 2, baths: 1, sqft: 100, images: ["https://picsum.photos/800/600?random=3"] },
  { id: 4, title: "Escritório Central", price: 85000, location: "Kilamba", beds: 0, baths: 1, sqft: 60, images: ["https://picsum.photos/800/600?random=4"] },
  { id: 5, title: "Terreno 20x30", price: 45000, location: "Benfica", beds: 0, baths: 0, sqft: 600, images: ["https://picsum.photos/800/600?random=5"] },
  { id: 6, title: "Apartamento T2", price: 90000, location: "Viana", beds: 2, baths: 1, sqft: 85, images: ["https://picsum.photos/800/600?random=6"] },
  { id: 7, title: "Loja Comercial", price: 120000, location: "Maianga", beds: 0, baths: 1, sqft: 110, images: ["https://picsum.photos/800/600?random=7"] },
  { id: 8, title: "Vivenda com Piscina", price: 500000, location: "Camama", beds: 5, baths: 4, sqft: 400, images: ["https://picsum.photos/800/600?random=8"] },
];

// 2. SEGUNDO: Crie os apelidos (aliases) para outros componentes
export const Property = PROPERTIES; 

// 3. TERCEIRO: Outras exportações de apoio
export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(price);
};

export const CONVERSATIONS = [
  {
    id: 1,
    user: "Graciano Neto",
    lastMessage: "Olá! Gostaria de saber mais sobre o imóvel.",
    time: "10:30",
    unread: true,
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 2,
    user: "Carlos Oliveira",
    lastMessage: "O sistema de gestão de frotas já está pronto?",
    time: "Ontem",
    unread: false,
    avatar: ""
  }
];

export const VISITS = [
  { day: "Seg", count: 45 },
  { day: "Ter", count: 52 },
  { day: "Qua", count: 38 },
  { day: "Qui", count: 65 },
  { day: "Sex", count: 48 },
  { day: "Sáb", count: 70 },
  { day: "Dom", count: 15 },
];