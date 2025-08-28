module.exports = {
  name: "Brat",
  desc: "Brat text generator",
  category: "Imagecreator",
  path: "/imagecreator/brat?apikey=&text=",
  async run(req, res) {
    const { apikey, text } = req.query;
    if (!global.apikey.includes(apikey)) 
      return res.json({ status: false, error: 'Apikey invalid' });
    if (!text) 
      return res.json({ status: false, error: 'Missing text' });

    const encodedText = encodeURIComponent(text);
    const buffer = await getBuffer(
      `https://brat.siputzx.my.id/image?text=${encodedText}&background=%23ffffff&color=%23000000&emojiStyle=apple`
    );

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });
    res.end(buffer);
  }
}