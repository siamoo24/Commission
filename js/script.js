
var Q_price ;
var Q_art_price;
  
var Full_18_price;
var full_18_open;
  
var noise_price;
var clean_price;
  
var top_price;
var mid_price;
var bot_price;
  
var empty_price;
var skin_price;
var gray_price;
var dot_price;
var simple_price;
var complex_price;
  




// -------------------------------------------------------------------
// MENU 開關 (函數定義可以放在全域，因為它不會存取 DOM 元素)
// -------------------------------------------------------------------
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('show');
  }
}

// -------------------------------------------------------------------
// 輪播功能 (函數定義可以放在全域)
// -------------------------------------------------------------------
function SlideshowFunc( folder, images, id, slideshow ) {
 
  if (!slideshow) return; // 安全檢查：如果找不到容器就退出

  images.forEach((imgName, index) => {
      const img = document.createElement('img');
      img.src = folder + imgName;
      if(index === 0) img.classList.add('active');
      slideshow.appendChild(img);
  });
   
  let current = 0;
    setInterval(() => {
        const imgs = document.querySelectorAll( id +' img'); 
        if (imgs.length === 0) return; // 安全檢查
     
        const prev = current;
        current = (current + 1) % imgs.length;

        imgs[prev].classList.remove('active');

        imgs[current].classList.add('active');
  
        setTimeout(() => {  imgs[prev].classList.remove('prev'); }, 500); 
        
    }, 3000);

}

// -------------------------------------------------------------------
// 負責在「載入完成」的那一刻把 LOADING 動畫關掉。
// -------------------------------------------------------------------
 window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
  });


// -------------------------------------------------------------------
// 🚀 主要啟動區塊：等待 DOM 載入完成後執行所有初始化和事件綁定
// -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Menu 動畫/錨點跳轉
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        navLinks.classList.remove('show');
      }
      
      const targetId = link.getAttribute('href');
      // 建議調整 setTimeout 時間為 500
      setTimeout(() => {
        window.location.hash = targetId;
      }, 500); 
    });
  });

});


// ------------------------------------
  // 3. R委託 popup (Modal)
  // ------------------------------------
  function initRModalView(){
    var RModal = document.getElementById("RModal");
    var RBtn = document.getElementById("RBtn");
    
    if (!RModal || !RBtn) return console.error("RModal 或 RBtn 不存在");
    // 確保元素存在 (與 OtherModal 保持一致的檢查邏輯)
    if (RModal && RBtn) {
      var RSpan = RModal.querySelector(".close"); 


      RBtn.onclick = function() {
          RModal.style.display = "block";
      };
      
      if (RSpan) {
        RSpan.onclick = function() { RModal.style.display = "none"; }
      } 
      else {
            console.error("RSpan: 找不到關閉按鈕 (.close)。");
        }

      // 點擊蒙版關閉
      window.addEventListener('click', function(event) {
        if (event.target == RModal) {
          RModal.style.display = "none";
        }
      });

      
      
 
    document.getElementById("Full_18_price").innerText = Full_18_price;
    
    if(full_18_open == "false"){ document.getElementById("full_18_open").style.display="none"; }
    else{  document.getElementById("full_18_close").style.display="none";  }
    
    } 
  }

// -------------------------------------------------------------------
// WATERFLOW：使用 window.onload 確保圖片資源已載入
// -------------------------------------------------------------------
window.onload = function() {
  
  fetch("option.json")
  .then(response => response.json())  // 把回傳轉成 JSON
  .then(data => {
    
    //Waterflow
    const left = document.getElementById("water-left");
    const right = document.getElementById("water-right");
    const waterflowPATH = "Image/sample/WaterFlow/"
    
    data.waterflow_LEFT.forEach(fileName => {
      const img = document.createElement("img");
      img.src = waterflowPATH + fileName;
      left.appendChild(img);
    });

    data.waterflow_RIGHT.forEach(fileName => {
      const img = document.createElement("img");
      img.src = waterflowPATH+fileName;
      right.appendChild(img);
    });
    
      Full_18_price = data.Full_18_price;
      full_18_open = data.full_18_open;
    
    
  })
  .catch(error => {
    console.log("發生錯誤：", error);
  });
}




