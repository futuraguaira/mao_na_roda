# Esquema Firestore para Mão na Roda

Este arquivo reúne o modelo de dados recomendado para o projeto em formato prático para copiar e colar em um gerador, documentação ou ferramenta de modelagem.

## Visão geral

- Banco: Firestore
- Modelo: coleções + documentos
- Objetivo: armazenar usuários, prestadores, serviços, avaliações e contatos

---

## 1) Coleção: users

Documento principal por usuário autenticado.

```yaml
collection: users
id: auth.uid
fields:
  uid: string
  name: string
  email: string
  phone: string
  role: string # client | provider | both
  photoUrl: string|null
  createdAt: timestamp
  updatedAt: timestamp
```

Exemplo de documento:

```json
{
  "uid": "authUser123",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "+5511999999999",
  "role": "provider",
  "photoUrl": null,
  "createdAt": "2026-07-01T00:00:00.000Z",
  "updatedAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 2) Coleção: providers

Representa um prestador cadastrado no app.

```yaml
collection: providers
id: auto-generated
fields:
  ownerId: string
  name: string
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  state: string
  latitude: number|null
  longitude: number|null
  service: string
  services: array<string>
  radiusKm: number
  description: string
  rating: number
  reviewsCount: number
  available: boolean
  acceptedTerms: boolean
  consentDate: timestamp
  createdAt: timestamp
  updatedAt: timestamp
```

Exemplo de documento:

```json
{
  "ownerId": "authUser123",
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "+5511999999999",
  "whatsapp": "+5511999999999",
  "address": "Rua A, 123",
  "city": "São Paulo",
  "state": "SP",
  "latitude": -23.55052,
  "longitude": -46.633308,
  "service": "Diarista",
  "services": ["Diarista", "Limpeza"],
  "radiusKm": 10,
  "description": "Atendo com pontualidade e compromisso.",
  "rating": 4.8,
  "reviewsCount": 12,
  "available": true,
  "acceptedTerms": true,
  "consentDate": "2026-07-01T00:00:00.000Z",
  "createdAt": "2026-07-01T00:00:00.000Z",
  "updatedAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 3) Coleção: services

Catálogo de serviços disponíveis.

```yaml
collection: services
id: auto-generated
fields:
  name: string
  slug: string
  description: string|null
  active: boolean
  createdAt: timestamp
```

Exemplo:

```json
{
  "name": "Eletricista",
  "slug": "eletricista",
  "description": "Serviços elétricos residenciais e comerciais",
  "active": true,
  "createdAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 4) Coleção: reviews

Avaliações feitas após um atendimento.

```yaml
collection: reviews
id: auto-generated
fields:
  providerId: string
  authorId: string
  rating: number # 1-5
  comment: string
  createdAt: timestamp
```

Exemplo:

```json
{
  "providerId": "provider123",
  "authorId": "user456",
  "rating": 5,
  "comment": "Excelente atendimento!",
  "createdAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 5) Coleção: contacts

Registro de contatos iniciais entre cliente e prestador.

```yaml
collection: contacts
id: auto-generated
fields:
  providerId: string
  clientId: string
  message: string
  status: string # pending | answered | closed
  createdAt: timestamp
  updatedAt: timestamp
```

Exemplo:

```json
{
  "providerId": "provider123",
  "clientId": "user456",
  "message": "Gostaria de contratar seus serviços.",
  "status": "pending",
  "createdAt": "2026-07-01T00:00:00.000Z",
  "updatedAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 6) Coleção: availability

Disponibilidade do prestador por horário ou período.

```yaml
collection: availability
id: auto-generated
fields:
  providerId: string
  date: string # yyyy-mm-dd
  startTime: string # HH:mm
  endTime: string
  available: boolean
  createdAt: timestamp
```

Exemplo:

```json
{
  "providerId": "provider123",
  "date": "2026-07-05",
  "startTime": "09:00",
  "endTime": "17:00",
  "available": true,
  "createdAt": "2026-07-01T00:00:00.000Z"
}
```

---

## 7) Índices recomendados

```yaml
indexes:
  - collection: providers
    fields: ["service", "available", "createdAt"]
  - collection: providers
    fields: ["city", "available", "createdAt"]
  - collection: reviews
    fields: ["providerId", "createdAt"]
  - collection: contacts
    fields: ["providerId", "status", "createdAt"]
```

---

## 8) Regras de segurança sugeridas

```yaml
rules:
  users:
    read: request.auth != null
    write: request.auth != null && request.auth.uid == resource.id
  providers:
    read: true
    write: request.auth != null && request.auth.uid == request.resource.data.ownerId
  services:
    read: true
    write: false
  reviews:
    read: true
    write: request.auth != null
  contacts:
    read: request.auth != null && (request.auth.uid == resource.data.clientId || request.auth.uid == resource.data.providerId)
    write: request.auth != null
```

---

## 9) Resumo das relações

```text
users (1) -> providers (many)
providers (1) -> reviews (many)
users (1) -> contacts (many)
providers (1) -> availability (many)
```

---

## 10) Versão compacta para copiar e colar no gerador

```yaml
collections:
  users:
    id: auth.uid
    fields:
      uid: string
      name: string
      email: string
      phone: string
      role: string
      photoUrl: string|null
      createdAt: timestamp
      updatedAt: timestamp

  providers:
    id: auto-generated
    fields:
      ownerId: string
      name: string
      email: string
      phone: string
      whatsapp: string
      address: string
      city: string
      state: string
      latitude: number|null
      longitude: number|null
      service: string
      services: array<string>
      radiusKm: number
      description: string
      rating: number
      reviewsCount: number
      available: boolean
      acceptedTerms: boolean
      consentDate: timestamp
      createdAt: timestamp
      updatedAt: timestamp

  services:
    id: auto-generated
    fields:
      name: string
      slug: string
      description: string|null
      active: boolean
      createdAt: timestamp

  reviews:
    id: auto-generated
    fields:
      providerId: string
      authorId: string
      rating: number
      comment: string
      createdAt: timestamp

  contacts:
    id: auto-generated
    fields:
      providerId: string
      clientId: string
      message: string
      status: string
      createdAt: timestamp
      updatedAt: timestamp

  availability:
    id: auto-generated
    fields:
      providerId: string
      date: string
      startTime: string
      endTime: string
      available: boolean
      createdAt: timestamp
```
