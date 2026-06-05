# 🎰 Rifa do Canto 2026

## Como subir o site (pelo celular)

### Passo 1 — Subir no GitHub

1. Acesse github.com e entre na sua conta
2. Clique no "+" no canto superior direito → "New repository"
3. Nome: `rifa-canto`
4. Deixe como **Public**
5. Clique em **Create repository**
6. Na próxima tela clique em **uploading an existing file**
7. Arraste TODOS os arquivos desta pasta para lá
8. Clique em **Commit changes**

### Passo 2 — Conectar no Vercel

1. Acesse vercel.com e entre com GitHub
2. Clique em **Add New → Project**
3. Escolha o repositório `rifa-canto`
4. Clique em **Deploy**

### Passo 3 — Configurar o Token do Mercado Pago

1. No Vercel, vá em **Settings → Environment Variables**
2. Adicione:
   - Nome: `MP_ACCESS_TOKEN`
   - Valor: (seu Access Token de produção do MP)
3. Adicione também:
   - Nome: `APP_URL`  
   - Valor: `https://rifa-canto.vercel.app`
4. Clique em **Save**
5. Vá em **Deployments** e clique em **Redeploy**

### Passo 4 — Configurar Webhook no Mercado Pago

1. Acesse mercadopago.com.br/developers
2. Vá em **Suas integrações → Webhooks**
3. Clique em **Adicionar**
4. URL: `https://rifa-canto.vercel.app/api/webhook`
5. Eventos: marque **Pagamentos**
6. Salve

## Pronto! 🎉

Seu site estará em: **https://rifa-canto.vercel.app**

Quando alguém pagar o PIX, o site verifica automaticamente
e só confirma os números se o pagamento for real.
