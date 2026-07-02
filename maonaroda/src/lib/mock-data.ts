export type Provider = {
  id: number;
  name: string;
  service: string;
  distance: string;
  rating: string;
  availability: string;
  whatsapp: string;
  bio: string;
  location: string;
  experience: string;
  services: string[];
};

export const providers: Provider[] = [
  {
    id: 1,
    name: "Ana Souza",
    service: "Diarista",
    distance: "1,2 km",
    rating: "4,8",
    availability: "Hoje, 15:00",
    whatsapp: "5511999999999",
    bio: "Limpeza residencial e organização com atendimento acolhedor e pontual.",
    location: "Centro, São Paulo",
    experience: "8 anos de experiência em residências e pequenos escritórios.",
    services: ["Limpeza residencial", "Organização", "Mudança leve"],
  },
  {
    id: 2,
    name: "Carlos Mendes",
    service: "Eletricista",
    distance: "3,4 km",
    rating: "4,9",
    availability: "Hoje, 18:30",
    whatsapp: "5511888888888",
    bio: "Instalações e manutenção elétrica rápida e segura para imóveis residenciais.",
    location: "Vila Olímpia, São Paulo",
    experience: "12 anos em instalações, reparos e manutenção preventiva.",
    services: ["Instalações", "Reparos elétricos", "Quadros elétricos"],
  },
  {
    id: 3,
    name: "Beatriz Lima",
    service: "Pedreiro",
    distance: "5,1 km",
    rating: "4,7",
    availability: "Amanhã, 09:00",
    whatsapp: "5511777777777",
    bio: "Pequenas reformas, acabamentos e reparos com acabamento cuidadoso.",
    location: "Moema, São Paulo",
    experience: "10 anos em reformas residenciais e manutenção.",
    services: ["Reformas pequenas", "Pintura", "Reparos de parede"],
  },
];

export const services = ["Todos", "Diarista", "Eletricista", "Pedreiro"];
