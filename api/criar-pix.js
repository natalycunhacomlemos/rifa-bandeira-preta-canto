const { MercadoPagoConfig, Payment } = require("mercadopago")

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).end()

  try {
    const { valor, nome, email, telefone, numeros } = req.body

    const payment = new Payment(client)
    const result = await payment.create({
      body: {
        transaction_amount: Number(valor),
        description: `Rifa do Canto - Números: ${numeros.join(", ")}`,
        payment_method_id: "pix",
        date_of_expiration: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        external_reference: `rifa-${Date.now()}`,
        payer: {
          email: email || "comprador@rifa.com",
          first_name: nome.split(" ")[0],
          last_name: nome.split(" ").slice(1).join(" ") || "Comprador"
        },
        notification_url: `${process.env.APP_URL}/api/webhook`
      }
    })

    const pix = result.point_of_interaction?.transaction_data
    return res.status(200).json({
      id: result.id,
      status: result.status,
      pix_code: pix?.qr_code,
      qr_base64: pix?.qr_code_base64
    })

  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}
