const createPayment = (req, res) => {
    const { id } = req.params;
  
    res.json({
      message: "Payment token created",
      redirect_url: "https://app.sandbox.midtrans.com/snap/v2/vtweb/mock-payment-url",
      token: "mock-token-12345",
      orderId: id
    });
  };
  
  module.exports = { createPayment };
  