import QRCode from 'qrcode';

const generateQRCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const url = `${process.env.FRONTEND_URL}/menu/${userId}`;

    const qrCodeData = await QRCode.toDataURL(url);

    return res.status(200).json({ qrCodeData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  generateQRCode
};
