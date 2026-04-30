export const ANGOLA_CITIES = ['Luanda', 'Benguela', 'Lubango', 'Huambo', 'Cabinda', 'Namibe']

export const LUANDA_NEIGHBORHOODS = [
  'Ilha de Luanda',
  'Miramar',
  'Talatona',
  'Alvalade',
  'Maianga',
  'Benfica',
  'Sambizanga',
  'Viana',
  'Kilamba',
  'Luanda Sul'
]

export const PROPERTIES = [
  {
    id: 1,
    title: 'Apartamento T3 com vista mar',
    description: 'Apartamento moderno com acabamentos premium, varanda ampla e acesso rapido ao centro.',
    price: 182000000,
    priceUnit: 'total',
    type: 'apartamento',
    listingType: 'venda',
    location: 'Ilha de Luanda, Luanda',
    neighborhood: 'Ilha de Luanda',
    city: 'Luanda',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    verified: true,
    publishedAt: '2026-04-14',
    badges: ['Venda', 'Destaque'],
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80']
  },
  {
    id: 2,
    title: 'Moradia T4 em Talatona',
    description: 'Moradia familiar em condominio tranquilo com jardim, garagem e seguranca 24h.',
    price: 350000000,
    priceUnit: 'total',
    type: 'casa',
    listingType: 'venda',
    location: 'Talatona, Luanda',
    neighborhood: 'Talatona',
    city: 'Luanda',
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    verified: true,
    publishedAt: '2026-04-10',
    badges: ['Venda', 'Novo'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80']
  },
  {
    id: 3,
    title: 'Apartamento T2 mobilado',
    description: 'Apartamento pronto a habitar, perto de servicos, escolas e vias principais.',
    price: 1250000,
    priceUnit: 'mes',
    type: 'apartamento',
    listingType: 'arrendar',
    location: 'Miramar, Luanda',
    neighborhood: 'Miramar',
    city: 'Luanda',
    bedrooms: 2,
    bathrooms: 2,
    area: 96,
    verified: true,
    publishedAt: '2026-04-18',
    badges: ['Arrendar'],
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80']
  },
  {
    id: 4,
    title: 'Escritorio central equipado',
    description: 'Espaco comercial versatil com recepcao, salas privadas e estacionamento.',
    price: 2250000,
    priceUnit: 'mes',
    type: 'comercial',
    listingType: 'arrendar',
    location: 'Maianga, Luanda',
    neighborhood: 'Maianga',
    city: 'Luanda',
    bedrooms: 0,
    bathrooms: 2,
    area: 180,
    verified: false,
    publishedAt: '2026-04-07',
    badges: ['Arrendar', 'Comercial'],
    images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80']
  },
  {
    id: 5,
    title: 'Terreno urbano 20x30',
    description: 'Terreno plano com acesso facil, excelente para construcao residencial.',
    price: 48000000,
    priceUnit: 'total',
    type: 'terreno',
    listingType: 'venda',
    location: 'Benfica, Luanda',
    neighborhood: 'Benfica',
    city: 'Luanda',
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    verified: true,
    publishedAt: '2026-03-29',
    badges: ['Venda', 'Terreno'],
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80']
  },
  {
    id: 6,
    title: 'Apartamento T3 no Kilamba',
    description: 'Apartamento luminoso em predio organizado, ideal para familia.',
    price: 78000000,
    priceUnit: 'total',
    type: 'apartamento',
    listingType: 'venda',
    location: 'Kilamba, Luanda',
    neighborhood: 'Kilamba',
    city: 'Luanda',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    verified: false,
    publishedAt: '2026-04-01',
    badges: ['Venda'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80']
  },
  {
    id: 7,
    title: 'Loja comercial em Alvalade',
    description: 'Loja com montra ampla numa zona de grande movimento.',
    price: 950000,
    priceUnit: 'mes',
    type: 'comercial',
    listingType: 'arrendar',
    location: 'Alvalade, Luanda',
    neighborhood: 'Alvalade',
    city: 'Luanda',
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    verified: true,
    publishedAt: '2026-04-20',
    badges: ['Arrendar', 'Comercial'],
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80']
  },
  {
    id: 8,
    title: 'Villa com piscina em Luanda Sul',
    description: 'Villa exclusiva com piscina, jardim e zona gourmet.',
    price: 520000000,
    priceUnit: 'total',
    type: 'villa',
    listingType: 'venda',
    location: 'Luanda Sul, Luanda',
    neighborhood: 'Luanda Sul',
    city: 'Luanda',
    bedrooms: 5,
    bathrooms: 5,
    area: 460,
    verified: true,
    publishedAt: '2026-04-22',
    badges: ['Venda', 'Destaque'],
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80']
  }
]

export const Property = PROPERTIES

export const formatPrice = (price, priceUnit = 'total') => {
  const value = new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    maximumFractionDigits: 0
  }).format(price)

  return priceUnit === 'mes' ? `${value}/mes` : value
}

export const CONVERSATIONS = [
  {
    id: 'c1',
    propertyId: '1',
    propertyTitle: PROPERTIES[0].title,
    propertyImage: PROPERTIES[0].images[0],
    contactName: 'Ana Domingos',
    contactAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    lastMessage: 'Podemos marcar uma visita para sexta?',
    lastMessageTime: '10:30',
    unread: 2,
    messages: [
      { id: 'm1', senderName: 'Ana Domingos', content: 'O imovel ainda esta disponivel?', timestamp: '10:12', isOwn: false },
      { id: 'm2', senderName: 'Eu', content: 'Sim, esta disponivel para visita esta semana.', timestamp: '10:18', isOwn: true },
      { id: 'm3', senderName: 'Ana Domingos', content: 'Podemos marcar uma visita para sexta?', timestamp: '10:30', isOwn: false }
    ]
  },
  {
    id: 'c2',
    propertyId: '3',
    propertyTitle: PROPERTIES[2].title,
    propertyImage: PROPERTIES[2].images[0],
    contactName: 'Carlos Mendes',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    lastMessage: 'Obrigado, envio os documentos hoje.',
    lastMessageTime: 'Ontem',
    unread: 0,
    messages: [
      { id: 'm4', senderName: 'Carlos Mendes', content: 'Gostei do apartamento. Aceita contrato anual?', timestamp: 'Ontem', isOwn: false },
      { id: 'm5', senderName: 'Eu', content: 'Sim, contrato anual e caução de dois meses.', timestamp: 'Ontem', isOwn: true }
    ]
  }
]

export const VISITS = [
  {
    id: 'v1',
    propertyTitle: PROPERTIES[0].title,
    propertyImage: PROPERTIES[0].images[0],
    propertyLocation: PROPERTIES[0].location,
    contactName: 'Ana Domingos',
    date: '2026-05-02',
    time: '11:00',
    status: 'pendente'
  },
  {
    id: 'v2',
    propertyTitle: PROPERTIES[2].title,
    propertyImage: PROPERTIES[2].images[0],
    propertyLocation: PROPERTIES[2].location,
    contactName: 'Carlos Mendes',
    date: '2026-05-04',
    time: '15:30',
    status: 'confirmada'
  }
]

export const STATS = {
  totalProperties: PROPERTIES.length,
  activeLeases: PROPERTIES.filter((p) => p.listingType === 'arrendar').length,
  pendingMaintenance: 2
}

export const NOTIFICATIONS = [
  { id: 1, text: 'Nova proposta recebida', time: '5 min atras' },
  { id: 2, text: 'Visita agendada', time: '2 horas atras' }
]
