export type Provider = {
  id: number;
  name: string;
  services: string[];
  radius: string;
  rating: string;
  availability: string;
  whatsapp: string;
  bio: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  addressComplement: string;
  experience: string;
};

export const providers: Provider[] = [
  {
    id: 1,
    name: "Ana Souza",
    services: ["Limpeza residencial", "Organização", "Mudança leve"],
    radius: "5",
    rating: "4,8",
    availability: "Seg a sex, 08h-18h",
    whatsapp: "5511999999999",
    bio: "Limpeza residencial e organização com atendimento acolhedor e pontual.",
    street: "Rua Augusta",
    streetNumber: "450",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01305-000",
    addressComplement: "Apto 12",
    experience: "8 anos de experiência em residências e pequenos escritórios.",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    services: ["Instalações elétricas", "Reparos elétricos", "Quadros elétricos"],
    radius: "10",
    rating: "4,9",
    availability: "Seg a sáb, 08h-20h",
    whatsapp: "5511888888888",
    bio: "Instalações e manutenção elétrica rápida e segura para imóveis residenciais.",
    street: "Avenida Brigadeiro Faria Lima",
    streetNumber: "1800",
    neighborhood: "Vila Olímpia",
    city: "São Paulo",
    state: "SP",
    zipCode: "01451-001",
    addressComplement: "",
    experience: "12 anos em instalações, reparos e manutenção preventiva.",
  },
  {
    id: 3,
    name: "Beatriz Lima",
    services: ["Reformas pequenas", "Pintura", "Reparos de parede"],
    radius: "8",
    rating: "4,7",
    availability: "Seg a sex, 09h-17h",
    whatsapp: "5511777777777",
    bio: "Pequenas reformas, acabamentos e reparos com acabamento cuidadoso.",
    street: "Rua Gaivota",
    streetNumber: "320",
    neighborhood: "Moema",
    city: "São Paulo",
    state: "SP",
    zipCode: "04522-010",
    addressComplement: "Casa 2",
    experience: "10 anos em reformas residenciais e manutenção.",
  },
];

export const services = ["Todos"];
