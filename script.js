
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
// 菜單開關 (函數定義可以放在全域，因為它不會存取 DOM 元素)
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
 


// ------------------------------------
// 2. 自由委託 popup (OtherModal)
// ------------------------------------
var OtherModal = document.getElementById("OtherModal");
var OtherBtn = document.getElementById("OtherBtn");

// 確保元素存在
if (OtherModal && OtherBtn) {
  var OtherSpan = OtherModal.querySelector(".close"); 

  OtherBtn.onclick = function() { OtherModal.style.display = "block";}
 
  if (OtherSpan) {
    OtherSpan.onclick = function() { OtherModal.style.display = "none"; }
  } 
  else {
    console.error("自由委託: 找不到關閉按鈕 (.close)。");
  }

  // 點擊蒙版關閉
    window.addEventListener('click', function(event) {
      if (event.target == OtherModal) {
        OtherModal.style.display = "none";
      }
    });

  } 
  else {
    console.error("自由委託: 找不到 OtherModal 或 OtherBtn。");
  }


  // ------------------------------------
  // 3. R委託 popup (Modal)
  // ------------------------------------
  var RModal = document.getElementById("RModal");
  var RBtn = document.getElementById("RBtn");
  
  // 確保元素存在 (與 OtherModal 保持一致的檢查邏輯)
  if (RModal && RBtn) {
    var RSpan = RModal.querySelector(".close"); 


    RBtn.onclick = function() {
        RModal.style.display = "block";
    };
     
    if (RSpan) {
      RSpan.onclick = function() { RModal.style.display = "none"; }
    } 

    // 點擊蒙版關閉
    window.addEventListener('click', function(event) {
      if (event.target == RModal) {
        RModal.style.display = "none";
      }
    });
  } 

});


// ----------------------------------------------------------------
// ❤️ 選項選擇
// ----------------------------------------------------------------
function selectOption(groupName, price, tit_name, div_name, img_name, exp_name){
  
      // 1. 取得同一組所有選項的 Radio Button 元素
      const radios = document.getElementsByName(groupName);
      
      // 2. 移除同一組所有選項的反紅背景
      let tableElement = null;
      if (radios.length > 0) {
          tableElement = radios[0].closest('.option-card'); // 找到最近的 .option-card 祖先 (即 table)
      }
      
      if (tableElement) {
          // 透過 querySelectorAll 找到 table 內所有具有 'selected' 類別的元素
          const selectedElements = tableElement.querySelectorAll('.selected');
          
          // 迭代並移除所有找到的元素上的 'selected' 類別
          for (const element of selectedElements) {
              element.classList.remove('selected');
          }
      }
      
      // 3. 選中對應的 Radio Button，並將其父層 div 設為紅色 (反紅)
    const selectedRadio = document.getElementById(`radio_${div_name}`);
    

    if (selectedRadio) {
        // 選中 Radio Button
        selectedRadio.checked = true; 
    }
    
    // 反紅該選項
    const selectedTit = document.getElementById(tit_name);
    if (selectedTit) {selectedTit.classList.add('selected');}
    
    const selectedDiv = document.getElementById(div_name);
    if (selectedDiv) {selectedDiv.classList.add('selected');}
    
    const selectedImg = document.getElementById(img_name);
    if (selectedImg) {selectedImg.classList.add('selected');}
    
    const selectedExp = document.getElementById(exp_name);
    if (selectedExp) {selectedExp.classList.add('selected');}


    // 4. 自動重新計算總分
    calculateModalScore();
      
  }
  
function calculateModalScore() {
    let totalScore = 0;

    // 定義所有 Radio Button 組合的 name 屬性
    const groups = ['style_line', 'style_range', 'style_color'];

    for (const groupName of groups) {
        const radios = document.getElementsByName(groupName);
        for (const radio of radios) {
            if (radio.checked) {
              
                selectedRadioId = radio.id;
                
                if(selectedRadioId.includes("noise")){ totalScore += parseInt(noise_price); }
                if(selectedRadioId.includes("clean")){ totalScore += parseInt(clean_price); }
                if(selectedRadioId.includes("top")){ totalScore += parseInt(top_price); }
                if(selectedRadioId.includes("mid")){ totalScore += parseInt(mid_price); }
                if(selectedRadioId.includes("bot")){ totalScore += parseInt(bot_price); }
                if(selectedRadioId.includes("empty")){ totalScore += parseInt(empty_price); }
                if(selectedRadioId.includes("skin")){ totalScore += parseInt(skin_price); }
                if(selectedRadioId.includes("gray")){ totalScore += parseInt(gray_price); }
                if(selectedRadioId.includes("dot")){ totalScore += parseInt(dot_price); }
                if(selectedRadioId.includes("simple")){ totalScore += parseInt(simple_price); }
                if(selectedRadioId.includes("complex")){ totalScore += parseInt(complex_price); }
                
                break; // 確保每個 group 只計算一次
            }
        }
    }

    // 顯示結果
    const resultDiv = document.getElementById('total_price_display');
    resultDiv.innerHTML = `報價：${totalScore}`;
}
  
//--------------------------------------------
//4. 計算機
//--------------------------------------------
function selectNoise() {  selectOption("style_line", noise_price, "noise_tit", "noise_div", "noise_img", "noise_exp");}
function selectClean() {  selectOption("style_line", clean_price, "clean_tit", "clean_div", "clean_img", "clean_exp");}
function selectTop() {  selectOption("style_range", top_price, "top_tit", "top_div", "top_img", "top_exp");}
function selectMid() {  selectOption("style_range", mid_price, "mid_tit", "mid_div", "mid_img", "mid_exp");}
function selectBot() {  selectOption("style_range", bot_price, "bot_tit", "bot_div", "bot_img", "bot_exp");}
function selectEmpty() {  selectOption("style_color", empty_price, "empty_tit", "empty_div", "empty_img", "empty_exp");}
function selectSkin() {  selectOption("style_color", skin_price, "skin_tit", "skin_div", "skin_img", "skin_exp");}
function selectGray() {  selectOption("style_color", gray_price, "gray_tit", "gray_div", "gray_img", "gray_exp");}
function selectDot() {  selectOption("style_color", dot_price, "dot_tit", "dot_div", "dot_img", "dot_exp");}
function selectSimple() {  selectOption("style_color", simple_price, "simple_tit", "simple_div", "simple_img", "simple_exp");}
function selectComplex() {  selectOption("style_color", complex_price, "complex_tit", "complex_div", "complex_img", "complex_exp");}

// -------------------------------------------------------------------
// 輪播啟動區塊：使用 window.onload 確保圖片資源已載入
// -------------------------------------------------------------------
window.onload = function() {
  
  fetch("option.json")
  .then(response => response.json())  // 把回傳轉成 JSON
  .then(data => {
    
    //Q
    const slideshow_Q = document.getElementById('Q');
    SlideshowFunc( '/Image/sample/Q/', data.slideshow_Q_imgs,'#Q', slideshow_Q);
    
    //Q插
    const slideshow_Q_art = document.getElementById('Q_art');
    SlideshowFunc( '/Image/sample/Q_art/', data.slideshow_Q_art_imags, '#Q_art', slideshow_Q_art);
    
    //其他
    const slideshow_Other = document.getElementById('Other');
    SlideshowFunc( '/Image/sample/Other/', data.slideshow_Other_imgs, '#Other', slideshow_Other);

    //Waterflow
    const left = document.getElementById("water-left");
    const right = document.getElementById("water-right");
    const waterflowPATH = "Image/sample/WaterFlow/"
    
    data.waterflow_LEFT.forEach(fileName => {
      const img = document.createElement("img");
      img.src = waterflowPATH+fileName;
      left.appendChild(img);
    });

    data.waterflow_RIGHT.forEach(fileName => {
      const img = document.createElement("img");
      img.src = waterflowPATH+fileName;
      right.appendChild(img);
    });
    
    Q_price = data.Q_price;
    Q_art_price = data.Q_art_price;
      
    Full_18_price = data.Full_18_price;
    full_18_open = data.full_18_open;
      
    noise_price = data.noise_price;
    clean_price = data.clean_price;
      
    top_price = data.top_price;
    mid_price = data.mid_price;
    bot_price = data.bot_price;
      
    empty_price = data.empty_price;
    skin_price = data.skin_price;
    gray_price = data.gray_price;
    dot_price = data.dot_price;
    simple_price = data.simple_price;
    complex_price = data.complex_price;
    
    document.getElementById("Q_price").innerText = data.Q_price;
    document.getElementById("Q_art_price").innerText = data.Q_art_price;
    document.getElementById("Full_18_price").innerText = data.Full_18_price;
    
    document.getElementById("noise_price").innerText = data.noise_price;
    document.getElementById("clean_price").innerText = data.clean_price;
    
    document.getElementById("top_price").innerText = data.top_price;
    document.getElementById("mid_price").innerText = data.mid_price;
    document.getElementById("bot_price").innerText = data.bot_price;
    
    document.getElementById("empty_price").innerHTML += data.empty_price;
    document.getElementById("skin_price").innerHTML += data.skin_price;
    document.getElementById("gray_price").innerHTML += data.gray_price;
    
    
    document.getElementById("dot_price").innerHTML += data.dot_price;
    document.getElementById("simple_price").innerHTML += data.simple_price;
    document.getElementById("complex_price").innerHTML += data.complex_price;
 
    
    if(data.full_18_open == "false"){ document.getElementById("full_18_open").style.display="none"; }
    else{  document.getElementById("full_18_close").style.display="none";  }
    
    selectNoise();
    selectTop();
    selectEmpty();
    
    
    
  })
  .catch(error => {
    console.log("發生錯誤：", error);
  });
}


