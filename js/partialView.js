document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".good-card");
  const partialView = document.getElementById("partialView");



  buttons.forEach((btn, index) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      // ⭐ 從按鈕 id 取 JSON key
      const jsonKey = btn.id.split(":")[1]; // partial-Q:Full18 -> Full18

      path = "partial/"+ jsonKey +"_partial.html";
      
      const res = await fetch(path);
      const html = await res.text();

      const oldContent = partialView.querySelector(".partial-content");    // partialView 
      partialView.classList.add("show");
      //console.log(jsonKey)
      if (oldContent) {
        oldContent.classList.remove("show");
        setTimeout(() => {
          oldContent.remove();
          insertNew(partialView, html, jsonKey+"_price");
        }, 400);
        partialView.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      } else {
        insertNew(partialView, html, jsonKey+"_price");
      }
    });
  });
});


function insertNew(partialView, html, jsonKey) {
  partialView.insertAdjacentHTML("beforeend", html);

  const newElem = partialView.querySelector(".partial-content:last-child");

  requestAnimationFrame(() => {
    if (newElem) newElem.classList.add("show");
        //console.log(jsonKey)
        // ⭐ 如果是滿版18，啟動專屬的 Modal 功能
        //if(jsonKey=='Full18_price'){initRModalView();}
      // 找參數
      const param = FindSlideshow_parm(jsonKey);
      if (!param) return;

    const { img_folder, img_key, div_id } = param;

    const Key = jsonKey.split("_")[0]+"_price"; 
      requestAnimationFrame(() => {
          applyJsonData(Key, newElem, img_key).then(data => {
              const imgList = data;
              const div = partialView.querySelector(`#${div_id}`);
              console.log(data);
              SlideshowFunc(img_folder, imgList,  div);
              
              if(jsonKey=='Other_price'){ initOtherModal(); }
              
              
          });
      });
    

  });
}

//--------------------------------
//- 讀取 JSON 資料並套用到對應元素
//--------------------------------
async function applyJsonData(key, scope, img_path) {
  const res = await fetch("option.json");
  const data = await res.json();

  if (key!='Other_price'){

    if (!data[key]) return;

      const target = scope.querySelector(`#${key}`);
      if (target) {
        target.textContent = data[key];
      }
  }
  return data[img_path]
}

// ------------------------------------
// 抓輪播資料 & 金額參數
//------------------------------------
function FindSlideshow_parm(jsonKey){
  
  const folder_base = "Image/sample/";
  const Key = jsonKey.split("_")[0]; // partial-Q:Full18 -> Full18
  return {
            img_folder: folder_base + Key + "/",
            img_key: "slideshow_"+Key+"_imgs",
            div_id: Key
        };
  

}
function SlideshowFunc(folder, images,  slideshow) {
  if (!slideshow) return;

  images.forEach((imgName, index) => {
    const img = document.createElement('img');
    img.src = folder + imgName;
    if(index === 0) img.classList.add('active');
    slideshow.appendChild(img);
  });

  let current = 0;
  const imgs = slideshow.querySelectorAll('img'); // 改用 container.querySelectorAll

  setInterval(() => {
    imgs.forEach(img => img.classList.remove('active')); // 先全部移除 active
    current = (current + 1) % imgs.length; // 下一張，如果超過總數就回到 0
    imgs[current].classList.add('active'); // 加上 active
  }, 3000);
}
