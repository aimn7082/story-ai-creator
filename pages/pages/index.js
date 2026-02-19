import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [story, setStory] = useState("");
  const [duration, setDuration] = useState("5");
  const [size, setSize] = useState("1920x1080");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const generateVideo = async () => {
    setLoading(true);
    try {
      // 1️⃣ تحويل النص لصوت
      const audioRes = await axios.post("/api/generateAudio", { story });
      const audioUrl = audioRes.data.url;

      // 2️⃣ إنشاء الفيديو من الصوت والقصة
      const videoRes = await axios.post("/api/generateVideo", {
        story,
        audioUrl,
        duration,
        size
      });

      setVideoUrl(videoRes.data.url);
      alert("تم إنشاء الفيديو بنجاح 🎬");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إنشاء الفيديو");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "white", padding: "40px" }}>
      <h1>Story AI Creator - صانع الفيديو</h1>
      <textarea
        placeholder="اكتب قصتك هنا..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "20px", padding: "15px" }}
      />
      <br /><br />
      <select value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="5">5 دقائق</option>
        <option value="10">10 دقائق</option>
        <option value="30">30 دقيقة</option>
        <option value="60">60 دقيقة</option>
      </select>
      <br /><br />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="1920x1080">يوتيوب 16:9</option>
        <option value="1080x1920">ريلز 9:16</option>
        <option value="1080x1080">مربع</option>
      </select>
      <br /><br />
      <button onClick={generateVideo} style={{ padding: "15px 30px", background: "#0ea5e9", color: "white", border: "none", cursor: "pointer" }}>
        {loading ? "جاري الإنتاج..." : "إنشاء الفيديو"}
      </button>
      <br /><br />
      {videoUrl && (
        <div>
          <h3>رابط الفيديو:</h3>
          <a href={videoUrl} target="_blank" rel="noreferrer">{videoUrl}</a>
        </div>
      )}
    </div>
  );
}
