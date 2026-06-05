const { MercadoPagoConfig, Payment } = require("mercadopago")

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

module.exports = async (req, res) => {
  res.status(200).json({ recebido: true })

  try {
    const { data, type } = req.body
    if (type !== "payment" || !data?.id) return

    const payment = new Payment(client)
    const result = await payment.get({ id: Number(data.id) })

    console.log(`Pagamento ${result.id}: ${result.status}`)

  } catch (err) {
    console.error("Webhook erro:", err.message)
  }
}
