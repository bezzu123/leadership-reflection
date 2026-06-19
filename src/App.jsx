import { useState } from "react";

const SCENARIOS = [
  {
    q: "ทีมพลาด Deadline สำคัญ คุณเลือกทำอะไรก่อน?",
    answers: [
      { text: "คุยกับทีมว่าเกิดอะไรขึ้น ก่อนตัดสินใจอะไร", style: "listener" },
      { text: "วางแผนกู้สถานการณ์ทันที แล้วค่อยคุยทีหลัง", style: "decisive" },
      { text: "เช็คว่าใครรับผิดชอบส่วนไหน เพื่อแก้ที่ต้นเหตุ", style: "systemizer" },
      { text: "ให้กำลังใจทีมก่อน เพราะทุกคนคงเครียดอยู่แล้ว", style: "supporter" },
    ],
  },
  {
    q: "สมาชิกในทีมสองคนมีความเห็นไม่ตรงกันเรื่องวิธีทำงาน คุณทำอย่างไร?",
    answers: [
      { text: "ให้ทั้งคู่พูดให้ฟังก่อน แล้วช่วยหาจุดร่วม", style: "listener" },
      { text: "ตัดสินใจให้เลยว่าจะไปทางไหน เพื่อไม่ให้งานสะดุด", style: "decisive" },
      { text: "ดูว่า Process ตรงไหนที่ทำให้เกิดความสับสน", style: "systemizer" },
      { text: "คุยกับแต่ละคนแยกกันก่อน เพื่อให้รู้สึกว่าถูกรับฟัง", style: "supporter" },
    ],
  },
  {
    q: "งานเร่งด่วนเข้ามา แต่ทีมกำลังทำงานอื่นอยู่เต็มมือ คุณทำอย่างไร?",
    answers: [
      { text: "ถามทีมว่าใครพอมีกำลังรับเพิ่มได้บ้าง", style: "listener" },
      { text: "จัดลำดับความสำคัญใหม่ทันทีด้วยตัวเอง", style: "decisive" },
      { text: "ดูภาพรวม Workload ทั้งหมดก่อนตัดสินใจ", style: "systemizer" },
      { text: "รับมาทำเองส่วนหนึ่ง เพื่อไม่ให้ทีมหนักเกินไป", style: "supporter" },
    ],
  },
  {
    q: "ส่งงานให้ฝ่ายอื่นไปแล้ว 3 วัน ยังไม่มีการตอบกลับ คุณทำอย่างไร?",
    answers: [
      { text: "Follow-up ตรง ๆ แล้วถามว่าติดอะไรอยู่หรือเปล่า", style: "decisive" },
      { text: "ลองทักไปคุยแบบเป็นกันเอง ไม่กดดัน", style: "listener" },
      { text: "เช็คว่า Message ที่ส่งไปชัดเจนพอหรือยัง", style: "systemizer" },
      { text: "รอดูอีกนิด เผื่อเขากำลังยุ่งอยู่", style: "supporter" },
    ],
  },
  {
    q: "ลูกทีมคนหนึ่งทำผิดพลาดในงานที่ค่อนข้างสำคัญ คุณจะ...",
    answers: [
      { text: "คุยกับเขาตรง ๆ ว่าเกิดอะไรขึ้น และจะป้องกันยังไงครั้งหน้า", style: "decisive" },
      { text: "ถามความรู้สึกเขาก่อน แล้วค่อยคุยเรื่องงาน", style: "supporter" },
      { text: "ชวนคุยเปิดใจว่าเขามองสถานการณ์นี้ยังไง", style: "listener" },
      { text: "ดูว่า Process ตรงไหนที่ทำให้พลาดได้ง่าย", style: "systemizer" },
    ],
  },
  {
    q: "ทีมเริ่มรู้สึกหมดไฟกับโปรเจกต์ที่ยืดเยื้อ คุณจะ...",
    answers: [
      { text: "เปิดวงคุยถามตรง ๆ ว่าทุกคนรู้สึกยังไง", style: "listener" },
      { text: "ปรับ Scope หรือ Timeline ใหม่ให้กระชับขึ้น", style: "decisive" },
      { text: "หาวิธีให้ทุกคนเห็นความคืบหน้าชัดเจนขึ้น", style: "systemizer" },
      { text: "ใช้เวลาให้กำลังใจและขอบคุณความพยายามของทีม", style: "supporter" },
    ],
  },
];

const STYLES = {
  listener: {
    emoji: "👂",
    title: "ผู้นำที่รับฟัง",
    subtitle: "The Listening Leader",
    color: "#0891B2",
    bg: "#ECFEFF",
    desc: "คุณนำด้วยการฟังก่อนตัดสินใจ ทำให้ทีมรู้สึกว่าเสียงของตัวเองมีความหมาย",
    strength: "ทีมรู้สึกปลอดภัยที่จะพูดความจริง",
    watchFor: "บางครั้งการฟังมากไปอาจทำให้การตัดสินใจช้าลง",
  },
  decisive: {
    emoji: "⚡",
    title: "ผู้นำที่เด็ดขาด",
    subtitle: "The Decisive Leader",
    color: "#DC2626",
    bg: "#FEF2F2",
    desc: "คุณนำด้วยความชัดเจนและการตัดสินใจที่รวดเร็ว ทำให้งานเดินหน้าต่อได้เสมอ",
    strength: "ทีมไม่ต้องรอความชัดเจนนาน งานไม่สะดุด",
    watchFor: "บางครั้งความเร็วอาจมาก่อนความเห็นของทีม ลองเช็คดูว่าทุกคน Align ด้วยหรือเปล่า",
  },
  systemizer: {
    emoji: "🧩",
    title: "ผู้นำที่มองภาพระบบ",
    subtitle: "The Systems Leader",
    color: "#7C3AED",
    bg: "#F5F3FF",
    desc: "คุณนำด้วยการมองหาต้นเหตุและออกแบบ Process ที่ป้องกันปัญหาซ้ำ",
    strength: "ทีมมีโครงสร้างชัดเจน ปัญหาเดิมไม่เกิดซ้ำ",
    watchFor: "บางครั้งระบบที่ดีต้องมาพร้อมความเข้าใจคน ไม่ใช่แค่ Process",
  },
  supporter: {
    emoji: "💛",
    title: "ผู้นำที่ดูแลทีม",
    subtitle: "The Supportive Leader",
    color: "#D97706",
    bg: "#FFFBEB",
    desc: "คุณนำด้วยความใส่ใจในความรู้สึกของทีม ทำให้ทุกคนรู้สึกมีคุณค่า",
    strength: "ทีมรู้สึกผูกพันและไว้ใจคุณในฐานะคนคนหนึ่ง ไม่ใช่แค่หัวหน้า",
    watchFor: "การดูแลใจทีมสำคัญ แต่บางครั้งงานก็ต้องการความชัดเจนควบคู่ไปด้วย",
  },
};

export default function LeadershipReflection() {
  const [screen, setScreen] = useState("home");
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (style) => {
    const newScores = { ...scores, [style]: (scores[style] || 0) + 1 };
    setScores(newScores);
    if (qIndex + 1 < SCENARIOS.length) {
      setQIndex(qIndex + 1);
    } else {
      const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
      const top = sorted[0][0];
      const second = sorted[1] ? sorted[1][0] : null;
      setResult({ primary: STYLES[top], secondary: second ? STYLES[second] : null });
      setScreen("result");
    }
  };

  const reset = () => {
    setScreen("home");
    setQIndex(0);
    setScores({});
    setResult(null);
  };

  return (
    <div style={{ fontFamily: "'Sarabun', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#F8F7FF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        button { cursor: pointer; transition: all 0.15s ease; }
        button:hover { transform: translateY(-2px); }
        button:active { transform: translateY(0); }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .pop-in { animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes popIn { from { opacity:0; transform:scale(0.7); } to { opacity:1; transform:scale(1); } }
      `}</style>

      {/* HOME */}
      {screen === "home" && (
        <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 8 }}>🧭</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1E1B4B", margin: "0 0 8px" }}>
            แบบสำรวจสไตล์การนำทีม
          </h1>
          <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>
            เครื่องมือสะท้อนสไตล์การตัดสินใจของคุณในฐานะผู้นำทีม
          </p>
          <p style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}>
            ตอบตามสถานการณ์จริงที่คุณมักจะทำ ไม่มีคำตอบถูกหรือผิด —
            ผลลัพธ์มีไว้ให้คุณใช้สะท้อนและพูดคุยกับทีมต่อได้
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {Object.values(STYLES).map((s) => (
              <div key={s.title} style={{ background: s.bg, borderRadius: 16, padding: "16px 10px", border: `2px solid ${s.color}22` }}>
                <div style={{ fontSize: 26 }}>{s.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.color, marginTop: 6 }}>{s.title}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setScreen("quiz")}
            style={{
              width: "100%", padding: "16px", borderRadius: 14, border: "none",
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              color: "white", fontSize: 17, fontWeight: 700,
            }}
          >
            เริ่มทำแบบสำรวจ →
          </button>
          <p style={{ color: "#C4B5FD", fontSize: 12, marginTop: 14 }}>ใช้เวลาประมาณ 3 นาที · 6 สถานการณ์</p>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>
              สถานการณ์ {qIndex + 1} / {SCENARIOS.length}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {SCENARIOS.map((_, i) => (
                <div key={i} style={{ width: 24, height: 5, borderRadius: 3, background: i <= qIndex ? "#4F46E5" : "#E0E7FF" }} />
              ))}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px #4F46E511", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8, fontWeight: 600 }}>🎬 สถานการณ์</div>
            <h2 style={{ fontSize: 19, fontWeight: 700, color: "#1E1B4B", margin: 0, lineHeight: 1.6 }}>
              {SCENARIOS[qIndex].q}
            </h2>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {SCENARIOS[qIndex].answers.map((a, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(a.style)}
                style={{
                  padding: "18px 20px", borderRadius: 14, border: "2px solid #E0E7FF",
                  background: "white", textAlign: "left", fontSize: 15, fontWeight: 600, color: "#374151",
                  boxShadow: "0 2px 8px #00000008",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#4F46E5"; e.currentTarget.style.background = "#F5F3FF"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E0E7FF"; e.currentTarget.style.background = "white"; }}
              >
                {["A", "B", "C", "D"][i]}. {a.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && result && (
        <div className="fade-in" style={{ maxWidth: 480, margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
          <div className="pop-in">
            <div style={{ fontSize: 15, color: "#6B7280", marginBottom: 8, fontWeight: 600 }}>
              ✨ สไตล์การนำทีมหลักของคุณคือ
            </div>
            <div style={{ background: result.primary.bg, border: `3px solid ${result.primary.color}`, borderRadius: 24, padding: "32px 24px", marginBottom: 16 }}>
              <div style={{ fontSize: 64, marginBottom: 8 }}>{result.primary.emoji}</div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: result.primary.color, margin: "0 0 4px" }}>
                {result.primary.title}
              </h1>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>{result.primary.subtitle}</div>
              <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.7, marginBottom: 18 }}>{result.primary.desc}</p>

              <div style={{ background: "white", borderRadius: 12, padding: "14px", marginBottom: 10, textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>💪 จุดแข็ง</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{result.primary.strength}</div>
              </div>
              <div style={{ background: "white", borderRadius: 12, padding: "14px", textAlign: "left" }}>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>🌱 ลองสังเกตดู</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{result.primary.watchFor}</div>
              </div>
            </div>

            {result.secondary && (
              <div style={{ background: "white", borderRadius: 16, padding: "16px 18px", marginBottom: 20, textAlign: "left", boxShadow: "0 2px 12px #00000008" }}>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>
                  🪞 สไตล์รองของคุณ
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{result.secondary.emoji}</span>
                  <span style={{ fontWeight: 700, color: result.secondary.color, fontSize: 14 }}>{result.secondary.title}</span>
                </div>
              </div>
            )}

            <div style={{ background: "#1E1B4B", borderRadius: 16, padding: "18px 20px", marginBottom: 20, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "#A5B4FC", fontWeight: 700, marginBottom: 6 }}>
                💬 ชวนคิดต่อ
              </div>
              <p style={{ color: "white", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                ไม่มีสไตล์ไหนดีที่สุด — ผู้นำที่ดีมักรู้ว่าเมื่อไหร่ควรฟัง เมื่อไหร่ควรตัดสินใจ
                เมื่อไหร่ควรดูระบบ และเมื่อไหร่ควรดูแลใจคน ลองคุยกับทีมว่าผลลัพธ์นี้ตรงกับที่พวกเขาเห็นคุณไหม
              </p>
            </div>

            <button
              onClick={reset}
              style={{ width: "100%", padding: "15px", borderRadius: 14, border: "2px solid #E5E7EB", background: "white", color: "#6B7280", fontSize: 14, fontWeight: 600 }}
            >
              ลองทำอีกครั้ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
