# AS08 Project - User Prompts Summary

## 初始需求
**Prompt:** 請幫我建立一個使用 Bootstrap 5.3 的單頁式網頁

**詳細規格:**
- 使用 Bootstrap 5.3
- 單頁式網頁結構
- Landing page（著陸頁）
- Video wall section（2×2 影片牆）
- 4個 full-screen chapter sections
- 每個 chapter 都有背景影片
- 影片根據捲動位置自動播放/暫停
- 文字疊加在影片上的效果
- 分離的 CSS 和 JS 檔案
- 提供了 4 個影片 URL

---

## 迭代修正記錄

### 1. 全螢幕顯示問題
**Prompt:** 現在 class chapter 並沒有真的滿版

**問題:** Chapter sections 沒有真正填滿整個視窗
**解決方案:** 
- 加入 `height: 100vh` 和 `min-height: 100vh`
- 使用 `dvh` 單位以支援行動裝置

---

### 2. 增加文字內容
**Prompt:** 可以每個 chapters 再增加兩三個段落嗎？

**需求:** 每個 chapter 的文字內容太少
**解決方案:** 為每個 chapter 增加 2-3 個段落的詳細內容

---

### 3. 文字框捲動問題
**Prompt:** 我發現問題了，現在的 class="text-box" 沒辦法隨著滑鼠捲動捲上去

**問題:** text-box 內容超出時無法捲動
**解決方案:**
- 加入 `max-height: 85vh`
- 設定 `overflow-y: auto`
- 加入自訂捲動條樣式（webkit-scrollbar）

---

### 4. 延遲顯示文字框
**Prompt:** 我希望在進到每個 `<section class="chapter">` 時，text-box 可以不要先出現

**需求:** text-box 應該在捲動一段距離後才淡入顯示
**解決方案:**
- 初始設定 `opacity: 0`
- 用 JavaScript 偵測捲動位置
- 達到 80% 視窗高度時加上 `.visible` class

---

### 5. 增加閱讀空間
**Prompt:** 這樣是不是應該讓 section class="chapter" 的高度高一點

**問題:** text-box 出現後只剩 20vh 的空間可以閱讀
**解決方案:** 將 chapter 高度從 100vh 增加到 200vh

---

### 6. 調整高度與觸發時機
**Prompt:** 請增加到 300 vh 然後讓 text-box 早點出現

**需求:** 
- 更多閱讀空間
- 更早顯示文字內容
**解決方案:**
- chapter 高度增加到 300vh
- text-box 觸發點從 80% 改為 50%

---

### 7. 影片顯示問題（第一次）
**Prompt:** 現在 chapters 的影片沒有顯示出來耶

**問題:** 增加 chapter 高度到 300vh 後，背景影片消失
**原因:** `position: absolute` 配合 `inset: 0` 導致影片被拉伸到 300vh
**解決方案:** 改用 `position: fixed` 讓影片固定在視窗內

---

### 8. 全黑畫面問題
**Prompt:** 現在整個畫面都變黑的了.... 包含 landing page

**問題:** 所有 chapter 的 fixed 影片重疊在一起，覆蓋整個頁面
**解決方案:**
- 影片改回 `position: absolute`
- 預設 `opacity: 0`
- 用 JavaScript 加上 `.active` class 控制顯示

---

### 9. 影片仍未顯示
**Prompt:** 還是沒有看到 chapters 的影片 只有看到背景白色一片 跟 text box

**問題:** 影片元素存在但沒有載入
**解決方案:** 
- 改用 `position: fixed` 並調整 z-index
- 修改 `.overlay` 為 `position: sticky`

---

### 10. 持續黑屏
**Prompt:** 還是沒有耶.....

**問題診斷:** 看到全黑畫面，text-box 可以捲動
**解決方案:** 加入測試用的 `opacity: 1` 和 `background: #000` 來診斷問題

---

### 11. 診斷結果
**Prompt:** 現在看到全黑畫面，往下捲有 text box

**診斷結果:** `.bg-video` 元素存在，但影片沒有載入
**解決方案:** 
- 在 HTML 中直接加入 `<source>` 標籤
- 改用 `preload="auto"`
- 簡化 JavaScript 載入邏輯

---

### 12. 問題未解決
**Prompt:** 還是沒有...你是不是愈改愈糟糕了....

**決定:** 回到最簡單可行的結構
**最終解決方案:**
- chapter: `position: relative`, `height: 300vh`
- bg-video: `position: absolute`, `height: 100vh`（後改為 100%）
- overlay: `position: sticky`
- 移除複雜的 opacity 和 active class 控制

---

### 13. 影片間隙問題
**Prompt:** 現在幾乎都正常了 只是現在每個影片之間會有空白的部分，可否讓影片的 section height 高一點?

**問題:** 影片高度只有 100vh，chapter 是 300vh，中間有空白
**解決方案:** 將 `.bg-video` 的 `height` 從 `100vh` 改為 `100%`，讓影片填滿整個 chapter

---

## 最終技術規格

### HTML 結構
- Bootstrap 5.3.2 CDN
- jQuery 3.6.0 CDN
- Landing header (vh-100)
- Video wall section (2×2 grid with col-6)
- 4 chapter sections (each 300vh height)
- 每個 chapter 包含：
  - `<video class="bg-video">` with `<source>` tag
  - `<div class="overlay">` with sticky positioning
  - `<div class="text-box">` with 3-4 paragraphs

### CSS 特性
- Chapter: `position: relative`, `height: 300vh`
- bg-video: `position: absolute`, `height: 100%`, `object-fit: cover`
- overlay: `position: sticky`, `top: 0`, `height: 100vh`
- text-box: `max-height: 85vh`, `overflow-y: auto`, custom scrollbar
- text-box visibility: `opacity: 0` initially, `.visible` class for `opacity: 1`
- Responsive breakpoints: 767.98px, 480px

### JavaScript 功能
- IntersectionObserver: 偵測 chapter 進入視窗（threshold 0.3）
- Video play/pause: 根據 IntersectionObserver 控制
- Scroll handler: 計算捲動位置，控制 text-box 顯示（50% 視窗高度）
- Parallax effect: translateY 根據捲動位置
- Wall videos: 確保 muted 並移除 controls

### 影片來源
所有影片來自 Washington Post CDN (d21rhj7n383afu.cloudfront.net)
- 格式: MP4, 1280×720, 2000 bitrate
- 4 個不同的邊境相關影片片段

---

## 主要挑戰與學習

1. **定位問題**: 當 container 高度從 100vh 增加到 300vh 時，absolute 和 fixed 定位的行為差異
2. **影片載入**: 需要在 HTML 中直接使用 `<source>` 標籤，而非純 JavaScript 動態設定
3. **Z-index 層級**: 影片、overlay 和 text-box 的堆疊順序管理
4. **Sticky positioning**: 利用 sticky 讓文字內容浮在捲動的影片上方
5. **效能優化**: 使用 IntersectionObserver 替代 scroll event 偵測影片可見性
