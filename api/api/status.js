const { MercadoPagoConfig, Payment } = require("mercadopago")

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  const { id } = req.query
  if (!id) return res.status(400).json({ erro: "ID obrigatório" })
  try {
    const payment = new Payment(client)
    const result = await payment.get({ id: Number(id) })
    return res.status(200).json({
      id: result.id,
      status: result.status,
      pago_em: result.date_approved
    })
  } catch (err) {
    return res.status(500).json({ erro: err.message })
  }
}
