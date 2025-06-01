# 💬 Chatty

Uma aplicação moderna de chat em tempo real com interface elegante e comunicação instantânea! 🚀

---

## 📋 Sobre o Projeto

O **Chatty** é uma aplicação de chat em tempo real que permite que usuários se comuniquem instantaneamente através de uma interface moderna e intuitiva. Desenvolvida com tecnologias modernas, a plataforma oferece uma experiência completa:

- **Comunicação em Tempo Real**: Utiliza **Socket.IO** para mensagens instantâneas
- **Interface Moderna**: UI elegante construída com **React** e **TailwindCSS** + **DaisyUI**
- **Autenticação Segura**: Sistema completo com **JWT** e **bcrypt** para proteção de dados
- **Armazenamento em Nuvem**: Upload de imagens com **Cloudinary**
- **Gerenciamento de Estado**: Utiliza **Zustand** para um gerenciamento de estado eficiente
- **Notificações**: Sistema de notificações toast com **React Hot Toast**

## ✨ Funcionalidades

Aqui estão as principais funcionalidades da aplicação:

- **👤 Gerenciamento de Usuários**

  - Cadastro com nome, email e senha
  - Login seguro
  - Atualização de perfil
  - Upload de foto de perfil

- **💬 Chat em Tempo Real**

  - Mensagens instantâneas
  - Indicador de digitação
  - Status online/offline
  - Histórico de conversas

- **🎨 Interface Moderna**
  - Design responsivo
  - Tema dark/light
  - Animações suaves
  - Componentes interativos

## 🖥️ Tecnologias Utilizadas

### Backend

- **Node.js** com **Express**
- **MongoDB** com **Mongoose**
- **Socket.IO** para comunicação em tempo real
- **JWT** para autenticação
- **bcrypt** para criptografia
- **Cloudinary** para upload de imagens
- **Cors** para segurança
- **dotenv** para variáveis de ambiente

### Frontend

- **React** com **Vite**
- **TailwindCSS** + **DaisyUI** para estilização
- **Socket.IO Client** para comunicação em tempo real
- **Zustand** para gerenciamento de estado
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **React Hot Toast** para notificações
- **Lucide React** para ícones

## 📦 Pré-requisitos

Para rodar este projeto, você precisa ter instalado:

- Node.js 18 ou superior
- MongoDB
- Conta no Cloudinary (para upload de imagens)

## 🌐 Teste online

[Chatty](https://chatty-xn1p.onrender.com/) <- Acesse este link para testar o projeto online!

## 🚀 Configuração do Ambiente

1. Clone o repositório
2. Configure o backend:

```bash
cd backend
npm install
```

3. Configure o arquivo `.env` do backend:

```env
MONGODB_URI=sua_uri_mongodb
JWT_SECRET=seu_jwt_secret
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

4. Configure o frontend:

```bash
cd frontend
npm install
```

5. Configure o arquivo `.env` do frontend:

```env
VITE_API_URL=http://localhost:3000
```

6. Inicie o backend:

```bash
cd backend
npm run dev
```

7. Inicie o frontend:

```bash
cd frontend
npm run dev
```

## 📝 Documentação

A documentação das rotas da API está disponível através do Postman ou Insomnia. Importe a coleção disponível em `/docs/api-collection.json`.

## 🔒 Recursos Futuros

- Grupos de chat
- Chamadas de vídeo
- Compartilhamento de arquivos
- Mensagens temporárias
- Temas personalizados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
