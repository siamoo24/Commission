# 📦 需要先安裝
# pip install pillow


import os
from PIL import Image

# ================== 設定區 ==================
TARGET_DIR = r"./A"     # ← 改成你的 A 資料夾路徑
MAX_SIZE_KB = 200       # 超過才壓
START_QUALITY = 85
MIN_QUALITY = 40

SUPPORTED_EXT = (".jpg", ".jpeg", ".png", ".webp")
# ============================================


def get_size_kb(path):
    return os.path.getsize(path) / 1024


def compress_jpg_webp(img, path):
    quality = START_QUALITY

    while quality >= MIN_QUALITY:
        img.save(path, quality=quality, optimize=True)
        if get_size_kb(path) <= MAX_SIZE_KB:
            print(f"  ✅ 壓縮完成 ({quality}%)")
            return True
        quality -= 5

    print("  ⚠️ 已到最低畫質仍超過限制")
    return False


def compress_png(img, path):
    # 先試 PNG 自身壓縮
    img = img.convert("RGBA")
    img.save(path, optimize=True)

    if get_size_kb(path) <= MAX_SIZE_KB:
        print("  ✅ PNG 壓縮完成")
        return True

    # 還是太大 → 轉 WebP
    webp_path = path.replace(".png", ".webp")
    img.convert("RGB").save(webp_path, "WEBP", quality=80)
    os.remove(path)

    print(f"  🔁 PNG 轉 WebP → {os.path.basename(webp_path)}")
    return True


def process_image(path):
    size = get_size_kb(path)
    ext = os.path.splitext(path)[1].lower()

    if size <= MAX_SIZE_KB:
        return

    print(f"📦 {int(size)}KB → {path}")

    try:
        img = Image.open(path)

        if ext in (".jpg", ".jpeg", ".webp"):
            compress_jpg_webp(img, path)

        elif ext == ".png":
            compress_png(img, path)

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
