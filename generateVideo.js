export default async function handler(req, res) {
  const { story, audioUrl, duration, size } = req.body;

  // هنا ستستخدم أي خدمة AI Video
  // حاليا سنعيد رابط فيديو تجريبي
  const videoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  res.status(200).json({ url: videoUrl });
}
