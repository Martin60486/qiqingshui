---
layout: default
title: Qi Qing Shui Blog| Qi Qing Shui
description: Traditional Chinese Medicine, Acupuncture, Herbal Therapy
keywords: Traditional, Chinese, Medicine, Acupuncture, Herbal, Therapy
---
<link rel="stylesheet" href="./assets/css/styles-blog.css">
<a href="./index.html" style="font-weight: bold; color: purple; margin-left: 5px; margin-bottom: 0; text-align: left;">Home</a>
<h2>请发表评论或提问</h2>
<form id="question-form" style="margin-top: 0;">
    <input type="text" id="name" name="name" placeholder="您的姓名 (选项)">
  <!--  <select id="category" name="category">
        <option value="">Select a category</option>
    </select> -->
    <textarea id="question" name="question" placeholder="您的评论或问题"></textarea>
    <button type="submit"><i class="fas fa-paper-plane"></i> 提交</button>
</form>

<section id="questions-container-blog">
    <!-- Questions will be displayed dynamically -->
</section>

<nav style="text-align: center; margin-bottom: 20px;">
  <a href="./index.html" style="font-weight: bold; color: purple; margin-right: 20px;">主页</a>
  <a id="login-link" href="./login.html" style="font-weight: bold; color: #0056b3;">管理</a>
</nav>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (isLoggedIn) {
      // Change link to "Admin Page" if logged in
      loginLink.textContent = 'Admin Page';
      loginLink.href = './admin.html';
    } else {
      // Default link to "Login Page"
      loginLink.textContent = 'Admin Login';
      loginLink.href = './login.html';
    }
  });
</script>

<!-- Include the Supabase Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<!-- Include Your Custom Script -->
<script src="./scripts-blog.js"></script>