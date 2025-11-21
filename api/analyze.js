// 这是一个运行在 Vercel 服务器上的代码，用户看不见
export default async function handler(req, res) {
  // 1. 从 Vercel 环境变量里获取 Key
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error: API Key missing" });
  }

  // 2. 准备请求 Google 的 URL (使用 1.5-flash 稳定版)
//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  try {
    // 3. 把前端传来的数据转发给 Google
    const googleResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // 把前端的图片和提示词传过去
    });

    const data = await googleResponse.json();

    // 4. 如果 Google 报错，也返回给前端
    if (!googleResponse.ok) {
      return res.status(googleResponse.status).json(data);
    }

    // 5. 把成功的结果返回给前端
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}