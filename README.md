# songdong2007.github.io
松東營造官網

## 目錄結構

```
index.html                 關於松東（GitHub Pages 進入點，須留在根目錄）
pages/
  projects.html            工程實績
  awards.html              獲獎紀錄
  benefits.html            員工福利
  activities.html          員工花絮
  employees.html           員工天地（最新公告、申訴入口）
  contact.html             聯絡我們
  complaints.html          申訴管道
  safety.html              職安衛政策
  projects/                工程實績內頁（beigang、changsheng、jishui、nanke、xishu）
  albums/                  活動相簿
assets/
  css/
    site.css               主要分頁共用樣式（index 與上方六個主選單頁）
    subpage.css            內頁共用樣式（工程內頁、申訴、相簿）
    contact.css            聯絡頁樣式
    safety.css             職安衛頁樣式
  js/
    site.js                選單、獎項篩選、燈箱，以及舊版 index.html#錨點導向
  images/
    brand/                 標誌
    awards/                獲獎紀錄
    company/               公司與團隊照片
    construction/          施工現場照片
    news/                  活動花絮
```

主選單六頁的頁首與頁尾內容相同；新增或調整選單項目時，六個檔案需一併修改，並在目前頁面的連結加上 `aria-current="page"`。


所有連結皆為相對路徑；新增頁面時依所在層級調整 `../` 前綴。

## 申訴表單測試

- 頁面：`pages/complaints.html`；目前僅接受模擬資料測試，尚未確認正式收件。
- 表單透過 FormSubmit 寄送；首次送出後，收件人需點擊驗證信。
- 更換收件信箱：修改 `pages/complaints.html` 中 form 的 `action`，新信箱需重新驗證。這是靜態網站設定，信箱會出現在公開HTML；驗證後可改用FormSubmit提供的不透明端點識別碼。
- 正式開放前需確認受理人、備援管道、權限與保密安排，調整測試標示和資料使用說明。
- 本次未代為送出測試或確認郵件投遞。
