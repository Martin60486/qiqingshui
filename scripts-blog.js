// Supabase Initialization
const SUPABASE_URL = 'https://fsejygujfoxbioyxwnex.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZWp5Z3VqZm94YmlveXh3bmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MzIwMjcsImV4cCI6MjA0ODIwODAyN30.l14Ik580RCfmeW37Q6RjrNsjp-mFC91xIE0yg2JC7HI'; // Replace with your actual Anon Key
const mySupabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
// Load Categories
async function loadCategories() {
    try {
        const { data: categories, error } = await mySupabase
            .from("categories")
            .select("*")
            .order("id", { ascending: false });
        if (error) throw error;

        const categorySelect = document.getElementById("category");
        categorySelect.innerHTML = "";
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a category";
        defaultOption.selected = true;
        defaultOption.disabled = true;
        categorySelect.appendChild(defaultOption);
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = 7;//category.id;
            option.textContent = "Others";//category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Apply collapsible functionality
function applyCollapsibleFunctionality() {
    const questionCards = document.querySelectorAll(".question-card");
    questionCards.forEach((card) => {
        card.addEventListener("click", () => {
            const answer = card.querySelector(".answer-text"); // Locate the answer within the card
            if (answer.style.display === "none" || !answer.style.display) {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        });
    });
}

// Submit Question
async function submitQuestion(event) {
    event.preventDefault();
    const name = document.getElementById("name").value || "客户";
    //const category = document.getElementById("category").value;
    const question = document.getElementById("question").value;

    if (!question) {
        alert("请输入评论或提问");
        return;
    }

    try {
        const { error } = await mySupabase
            .from("blogqqs")
            .insert([{ name, question }]);
           
        if (error) throw error;

        alert("提交成功!");
        loadQuestions(); // Reload questions after submission
    } catch (error) {
        console.error("Error submitting question:", error);
        alert("提交失败，请重试.");
    }
}

// Load Questions
async function loadQuestions() {
    const container = document.getElementById("questions-container-blog");
    if (container) {
        container.innerHTML = "<p>Loading…</p>";
    }

    try {
        // Read from local static JSON (fast in China)
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
                    ${(q.answer ? q.answer.split('\n').map(line => `<div>${(line || "").trim()}</div>`).join('') : "<em>（暂无回复）</em>")}
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

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
   // loadCategories();
    loadQuestions();
});

//document.getElementById("question-form").addEventListener("submit", submitQuestion);
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form");
  if (form) form.addEventListener("submit", submitQuestion);
});
