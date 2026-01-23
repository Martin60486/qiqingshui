// Supabase Initialization
// NOTE: This is a public "anon" key. Keep RLS enabled in Supabase and allow only the operations you intend.
const SUPABASE_URL = "https://fsejygujfoxbioyxwnex.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZWp5Z3VqZm94YmlveXh3bmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzIwMjcsImV4cCI6MjA0ODIwODAyN30.l14Ik580RCfmeW37Q6RjrNsjp-mFC91xIE0yg2JC7HI";

const mySupabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function setSubmitStatus(html, type = "info") {
  const el = document.getElementById("submit-status");
  if (!el) return;

  const colors = {
    info: "#333",
    ok: "#0a7a2f",
    warn: "#8a5a00",
    err: "#b00020",
  };

  el.style.color = colors[type] || colors.info;
  el.innerHTML = html;
}

// (Optional / currently unused) Load Categories
async function loadCategories() {
  try {
    const { data: categories, error } = await mySupabase
      .from("categories")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    const categorySelect = document.getElementById("category");
    if (!categorySelect) return;

    categorySelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a category";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    categorySelect.appendChild(defaultOption);

    categories.forEach((category) => {
      const option = document.createElement("option");
      // TODO: restore real values when you use categories in the form
      option.value = 7; // category.id;
      option.textContent = "Others"; // category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Submit Comment / Question (write to Supabase; will appear after manual publish)
async function submitQuestion(event) {
  event.preventDefault();

  setSubmitStatus("Submitting… / 正在提交…", "info");

  const name = (document.getElementById("name")?.value || "").trim() || "访客";
  const question = (document.getElementById("question")?.value || "").trim();

  if (!question) {
    setSubmitStatus(
      "⚠️ 请输入评论或提问 / Please enter a comment or question.",
      "warn"
    );
    return;
  }

  try {
    const { error } = await mySupabase.from("blogqqs").insert([{ name, question }]);
    if (error) throw error;

    setSubmitStatus(
      "✅ 感谢！我们已收到您的留言，目前处于审核中。审核通过后会显示在网站上。<br>✅ Thank you! Your submission is pending review and will appear after approval.",
      "ok"
    );

    // Clear only the question to encourage more submissions (optional)
    const qEl = document.getElementById("question");
    if (qEl) qEl.value = "";
  } catch (error) {
    console.error("Error submitting question:", error);
    setSubmitStatus(
      "❌ 提交失败（网络可能较慢）。请稍后重试。<br>❌ Submission failed (network may be slow). Please try again later.",
      "err"
    );
  }
}

// Load Questions (read from local static JSON — fast in China)
async function loadQuestions() {
  const container = document.getElementById("questions-container-blog");
  if (container) container.innerHTML = "<p>Loading…</p>";

  try {
    const res = await fetch("./assets/data/blog.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load blog.json");

    const blogqqs = await res.json();

    if (!container) return;
    container.innerHTML = "";

    blogqqs.forEach((q) => {
      const questionCard = document.createElement("details");
      questionCard.innerHTML = `
        <summary class="summary-question">${q.name || ""}：${q.question || ""}</summary>
        <div class="author">七清水回答：</div>
        <div class="answer-details">
          ${
            q.answer
              ? q.answer
                  .split("\n")
                  .map((line) => `<div>${(line || "").trim()}</div>`)
                  .join("")
              : "<em>（暂无回复）</em>"
          }
        </div>
      `;
      container.appendChild(questionCard);
    });
  } catch (error) {
    console.error("Error loading blog.json:", error);
    if (container) {
      container.innerHTML = `
        <p>加载失败或较慢（可能是跨境网络原因）。请稍后重试。</p>
        <button id="retry-load">Retry</button>
      `;
      const btn = document.getElementById("retry-load");
      if (btn) btn.addEventListener("click", loadQuestions);
    }
  }
}

// Initialize Page (single DOMContentLoaded)
document.addEventListener("DOMContentLoaded", () => {
  // loadCategories(); // Uncomment if you add the category dropdown back into the form
  loadQuestions();

  const form = document.getElementById("question-form");
  if (form) form.addEventListener("submit", submitQuestion);
});
