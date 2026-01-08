// Load and Initialize Contact Section
function loadContactHTML() {
    const container = document.getElementById("contact-container");

    if (window.innerWidth <= 767) {
        container.innerHTML = `
            <div class="contact">
                <div class="contact-header">
                    <img src="./assets/images/telephone.jpg" alt="Contact image" class="contact-image">                  
                    <h2>联系我们:</h2>
                </div>
                <div class="contact-info">
                    <p style="margin-bottom: 0;">
                        Email: <a href="mailto:info@expaccounting.ca" class="email-link">zenwellness@outlook.com</a><br>
                        Phone: 604-428-0896<br>
                        欢迎Email或电话联系我们!
                    </p>
                    <p style="margin-top: 0;">
                        <a href="./blog.html" style="font-weight: bold; color: #0056b3;">请访问我们的博客</a> 发表评论或提问!
                    </p>
                </div>
               
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="contact">
                <div class="contact-image-wrapper">
                    <img src="./assets/images/telephone.jpg" alt="Contact image" class="contact-image">    
                </div>
                <div class="contact-info">
                    <h2>Contact us:</h2>
                    <p style="margin-bottom: 0;">
                        Email: <a href="mailto:info@expaccounting.ca" class="email-link">zenwellness@outlook.com</a><br>
                        Phone: 604-428-0896<br>
                        欢迎Email或电话联系我们!
                    </p>
                    <p style="margin-top: 0;">
                        <a href="./blog.html" style="font-weight: bold; color: #0056b3;">请访问我们的博客</a> 发表评论或提问!
                    </p>
                </div>
            </div>
        `;
    }
}

window.addEventListener('load', loadContactHTML);
window.addEventListener('resize', loadContactHTML);