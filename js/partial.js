

// 切換內容的函式
function InfoChange(pageName) {
    url = './info/' + pageName + '.html'

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('頁面載入失敗');
            return response.text();
        })
        .then(html => {
            document.getElementById('info-partial').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('info-partial').innerHTML = '<p style="color:red;">載入發生錯誤</p>';
            console.error(error);
        });
}


// **網頁一載入，自動把 a.html 塞進預設頁面**
document.addEventListener('DOMContentLoaded', () => {
    InfoChange('about'); // 呼叫 InfoChange，並帶入你想要的檔名（例如 about）
});
