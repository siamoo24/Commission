import os
from PIL import Image

# ================== 設定區 ==================
#TARGET_DIR = r"C:\\Users\\Administrator\\Pictures\\修圖"
TARGET_DIR = r"C:\\Users\\a8629\\Documents\\GitHub\\Commission\\Image\\sample"
MAX_SIZE_GENERAL = 500   # 一般檔案上限
MAX_SIZE_Q = 200         # Q_檔案上限
START_QUALITY = 85
MIN_QUALITY = 10         # JPG最低品質
PNG_SCALE_STEP = 0.9     # PNG 每次縮小比例
SUPPORTED_EXT = (".jpg", ".jpeg", ".png", ".webp")
# ============================================

def get_size_kb(path):
    return os.path.getsize(path) / 1024

def compress_jpg_webp(img, path, max_kb):
    quality = START_QUALITY
    while True:
        img.save(path, quality=quality, optimize=True)
        if get_size_kb(path) <= max_kb:
            print(f"  ✅ 壓縮完成 ({quality}%)")
            return True
        if quality > MIN_QUALITY:
            quality -= 5
        else:
            # 已經到最低品質，縮小尺寸
            w, h = img.size
            w, h = int(w * 0.9), int(h * 0.9)
            img = img.resize((w, h), Image.LANCZOS)
            print(f"  🔁 低品質仍超過 → 縮小尺寸至 {w}x{h}")

def compress_png(img, path, max_kb):
    scale = 1.0
    w, h = img.size
    while True:
        img_resized = img.resize((int(w*scale), int(h*scale)), Image.LANCZOS)
        img_resized.save(path, optimize=True)
        if get_size_kb(path) <= max_kb:
            print(f"  ✅ PNG 壓縮完成，尺寸 {int(w*scale)}x{int(h*scale)}")
            return True
        scale *= PNG_SCALE_STEP
        print(f"  🔁 PNG 太大 → 繼續縮小至 {int(w*scale)}x{int(h*scale)}")

def process_image(path):
    filename = os.path.basename(path)
    # 判斷上限
    max_kb = MAX_SIZE_Q if "Q_" in filename else MAX_SIZE_GENERAL
    size = get_size_kb(path)
    ext = os.path.splitext(path)[1].lower()
    if size <= max_kb:
        return
    print(f"📦 {int(size)}KB → {path} (目標 {max_kb}KB)")
    try:
        img = Image.open(path)
        if ext in (".jpg", ".jpeg", ".webp"):
            compress_jpg_webp(img, path, max_kb)
        elif ext == ".png":
            compress_png(img, path, max_kb)
    except Exception as e:
        print(f"❌ 無法處理：{path}")
        print(f"   原因：{e}")

def run():
    print("🔍 開始遞迴掃描圖片...\n")
    for root, _, files in os.walk(TARGET_DIR):
        print(f"📂 掃描中：{root}")
        for file in files:
            if file.lower().endswith(SUPPORTED_EXT):
                full_path = os.path.join(root, file)
                process_image(full_path)
    print("\n🎉 所有圖片處理完成")

if __name__ == "__main__":
    run()
