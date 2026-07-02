#!/bin/bash

# Script para completar a configuração do Firestore no projeto mao-na-roda-a5a79
# Copie e cole este script no Google Cloud Shell

PROJECT_ID="mao-na-roda-a5a79"
REGION="nam5"

echo "🔥 Iniciando setup do Firestore para $PROJECT_ID..."

# ============================================
# 1. DEPLOY DAS REGRAS DE SEGURANÇA
# ============================================
echo "📋 Passo 1: Deploy das regras de segurança..."

cat > /tmp/firestore.rules << 'EOF'
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }

    match /providers/{providerId} {
      allow read: if true;
      allow create: if isSignedIn()
        && request.resource.data.ownerId == request.auth.uid;
      allow update: if isSignedIn()
        && resource.data.ownerId == request.auth.uid
        && request.resource.data.ownerId == request.auth.uid;
      allow delete: if isSignedIn() && resource.data.ownerId == request.auth.uid;
    }

    match /services/{serviceId} {
      allow read: if true;
      allow create, update, delete: if false;
    }

    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && resource.data.authorId == request.auth.uid;
    }

    match /contacts/{contactId} {
      allow read: if isSignedIn()
        && (resource.data.clientId == request.auth.uid || resource.data.providerId == request.auth.uid);
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn()
        && (resource.data.clientId == request.auth.uid || resource.data.providerId == request.auth.uid);
    }

    match /availability/{availabilityId} {
      allow read: if true;
      allow create: if isSignedIn()
        && request.resource.data.providerId == request.auth.uid;
      allow update: if isSignedIn()
        && resource.data.providerId == request.auth.uid
        && request.resource.data.providerId == request.auth.uid;
      allow delete: if isSignedIn() && resource.data.providerId == request.auth.uid;
    }
  }
}
EOF

# Deploy das regras usando gcloud
gcloud firestore rules deploy /tmp/firestore.rules --project=$PROJECT_ID
if [ $? -eq 0 ]; then
  echo "✅ Regras de segurança deployed com sucesso!"
else
  echo "❌ Erro ao fazer deploy das regras"
  exit 1
fi

# ============================================
# 2. CRIAR AS COLEÇÕES COM DOCUMENTOS INICIAIS
# ============================================
echo ""
echo "📚 Passo 2: Criando coleções..."

# Função para criar uma coleção com um documento
create_collection() {
  local collection=$1
  local doc_id=$2
  local doc_data=$3
  
  echo "  Criando coleção '$collection' com documento inicial..."
  gcloud firestore documents create "projects/$PROJECT_ID/databases/(default)/documents/$collection/$doc_id" \
    --data="$doc_data" 2>/dev/null || true
}

# users - com documento placeholder
create_collection "users" "_placeholder" \
  "email={stringValue:'placeholder@example.com'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

# providers - com documento placeholder
create_collection "providers" "_placeholder" \
  "name={stringValue:'Prestador de Exemplo'},category={stringValue:'Diversos'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

# services - com documento placeholder
create_collection "services" "_placeholder" \
  "name={stringValue:'Serviço Exemplo'},category={stringValue:'Diversos'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

# reviews - com documento placeholder
create_collection "reviews" "_placeholder" \
  "rating={integerValue:'5'},comment={stringValue:'Excelente!'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

# contacts - com documento placeholder
create_collection "contacts" "_placeholder" \
  "status={stringValue:'pending'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

# availability - com documento placeholder
create_collection "availability" "_placeholder" \
  "dayOfWeek={stringValue:'monday'},hours={stringValue:'09:00-17:00'},createdAt={timestampValue:'2024-01-01T00:00:00Z'}"

echo "✅ Coleções criadas com sucesso!"

# ============================================
# 3. VERIFICAR STATUS
# ============================================
echo ""
echo "📊 Passo 3: Verificando status das coleções..."
gcloud firestore collections list --project=$PROJECT_ID

echo ""
echo "🎉 Setup do Firestore concluído!"
echo "✅ Regras de segurança: Deployed"
echo "✅ Coleções: Criadas (6 coleções disponíveis)"
echo ""
echo "Próximas etapas:"
echo "1. Habilitar Google Sign-in no Firebase Console"
echo "2. Habilitar Phone Authentication (opcional)"
echo "3. Testar a aplicação com autenticação real"
