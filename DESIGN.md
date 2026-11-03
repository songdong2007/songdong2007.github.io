---
name: 松東營造設計系統 (Song Dong Design System)
description: 現代、俐落、專業、自然；工程穩定感與人情溫度
colors:
  navy: "#142E47"
  green: "#527C78"
  paper: "#F7F6F2"
  sage: "#EDF3F0"
  copper: "#B78358"
  surface: "#FFFFFF"
  text: "#203A51"
  muted: "#637572"
  line: "color-mix(in srgb, #527C78 22%, #FFFFFF)"
typography:
  display:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif'
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.02em"
  headline:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif'
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.5
  title:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif'
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.85
    letterSpacing: "0.02em"
  label:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", system-ui, sans-serif'
    fontSize: "13px"
    lineHeight: 1.85
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  card-mobile: "20px"
  md: "24px"
  lg: "40px"
  section: "52px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.navy}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "24px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "11px 13px"
  tag:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.green}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
---

# Design System: 松東營造

## Overview

**Creative North Star:「工程的穩定、人情的溫度」**

現代、俐落、專業、自然的營造企業網站。以清晰結構、真實施工紀錄與易讀資訊呈現專業，透過暖白與自然綠色保留企業的人情味。照片、案名與既有事實是內容主體。

**Key Characteristics:** 白色與暖白主畫布、深藍結構、自然綠資訊提示、少量銅色、方正細框及低陰影。本文件依核准方向與現行原始碼整理，不代表已完成瀏覽器視覺驗收。

## Colors

### Primary

- **navy 深藍**：頁首、頁尾與主要按鈕。
- **green 自然綠**：圖示、標籤、年度、選取與焦點。

### Secondary

- **copper 暖銅**：標題短線、獎金福利與測試提示等少量點綴。
- **sage 淡綠**：聯絡卡、生活福利、側欄與選取背景。

### Neutral

- **surface 白色、paper 暖白**：主要畫布、卡片與圖片襯底。
- **text 深藍灰、muted 灰綠**：主要與次要文字。
- **line 淡綠灰**：由 green 與 surface 混合的細框與分隔線。

程式來源為 `assets/css/base.css` 的 `:root`。舊名稱相容映射：`--dark` → navy、`--gold` → copper、`--gold-deep` → green、`--gold-light` → paper。`--navy-dark`、`--line-dark` 為既有色彩混合值。必填提示使用 `color-mix(in srgb,var(--copper) 70%,var(--navy))`，提供較深的銅色文字；不新增獨立色票。

## Typography

使用 frontmatter 的繁體中文無襯線字型堆疊；內文行高 1.8–1.9（現行 1.85），主要字重 400、600、700。長段落通常限制在 65–75ch，數字資訊可用等寬數字。

| 層級 | 桌面核准範圍 | 手機核准範圍 | 現行共用值 |
| --- | --- | --- | --- |
| 主標題 | 30–34px | 25–28px | 34px / 28px |
| 區段標題 | 23–26px | 21–24px | 26px / 23px |
| 卡片標題 | 18–20px | 17–19px | 20px / 18px |
| 內文 | 15–16px | 15–16px | 16px |
| 輔助資訊 | 12–13px | 12–13px | 依元件使用 |

頁面級 `.section-topic` 採主標題尺寸，內部區段使用較小層級。手機輸入欄位文字維持 16px。

## Layout

內容最大寬度 1120px，桌面左右各 24px，600px 以下各 20px。桌面區段留白 40–56px（共用 52px），手機 28–36px（共用 32px）；卡片間距桌面 20–24px、手機 16–20px。

900px 以下導覽改抽屜；600px 以下雙欄卡片改單欄。工程概述在 800px 以下、表單與說明在 900px 以下改單欄。首頁照片適度佔約半個視窗：目前桌面 45vh、限制 300–430px，手機 240px。人物照片須保護頭部構圖。

首頁依最新參考圖整理：上方左欄為公司敘事，右欄為整合資本額、經營理念與薪資資訊的單一卡片；組織架構移到兩欄與下方徽章之後，獨立佔滿內容寬度。手機依內容順序垂直閱讀。

## Elevation & Depth

透過白色、暖白與淡綠表面分層，卡片使用淡邊框與輕微向下陰影。共用值為 `0 4px 18px color-mix(in srgb,var(--navy) 5%,transparent)`；工程卡片 hover 可略增陰影。避免硬邊偏移、發光與大片毛玻璃。

轉場以 0.2s ease 的顏色、邊框、陰影及抽屜位移為主。`prefers-reduced-motion: reduce` 停止動畫、轉場和平滑捲動。所有互動保留可見鍵盤焦點。

## Shapes

卡片、按鈕、欄位、圖片與彈窗主要採 8px 圓角；標籤及縮圖內層採 4px。以 1px 細框建立方正結構。時間軸節點可為圓形，不將大圓角或膠囊形套用全站。

## Components

### Buttons

深藍底白字主按鈕、白底深藍細框次按鈕。共用內距 10px 22px、最小高度 46px。Hover 微調底色，focus 清楚可見；手機主要表單動作可滿寬。

### Navigation

桌面頁首 sticky，捲動後高度由 88px 縮至 68px並縮小標誌。導覽白字、銅色底線標記目前頁面。手機右側深藍抽屜保留關閉按鈕、遮罩、Escape、焦點管理與開關狀態。頁尾延續深藍白字。

### Cards / Containers

- **工程實績**：雙欄工程照片卡片，呈現具體案名及既有工程資訊。
- **工程詳細頁**：大主圖、概述與資料雙欄、縮圖切換相簿。大圖完整顯示，縮圖可裁切。
- **獲獎紀錄**：年度由新到舊的時間軸，內含雙欄卡片；證書在一致暖白框內以 contain 完整顯示並可放大。
- **薪資福利**：雙欄圖示卡片，以白色卡片為主，圖示置於極淡綠方形襯底；獎金卡使用極淡銅底，旅遊與補助項目才使用淡綠底，保留原有明細。
- **員工活動**：雙欄一致封面，說明在照片下方；封面保護人物頭部，進入相簿後完整顯示照片。
- **員工專區**：兩張入口卡片與內容分頁；綠色及底線標示選取狀態。

### Inputs / Fields

標籤在欄位上方，短欄位桌面雙欄、長欄位跨全寬，手機全單欄。欄位至少 48px 高，白底、細框及綠色 focus。必填使用深銅色、選填使用 muted。錯誤或結果放在按鈕附近，以文字清楚標示。

招募頁左側介紹與動作、右側淡綠聯絡卡。應徵頁左表單右指引；申訴頁左表單右說明，保留銅色測試通知。保留全部既有欄位、附件、同意選項、動作、測試狀態及實際服務；未實際送達不得顯示送達成功。

### Image Viewers

深藍半透明遮罩、暖白襯底、明確關閉按鈕。完整大圖採 contain，保留圖片描述、鍵盤操作與焦點返回。

## Do's and Don'ts

- **Do** 保留原內容與事實，以真實工程、證書與活動照片建立信任。
- **Do** 維持白與暖白主畫布、克制的自然色提示與清晰資訊層級。
- **Do** 檢查人物頭部、證書完整性、手機閱讀順序及鍵盤操作。
- **Don't** 使用科技藍紫漸層、發光色塊、氾濫毛玻璃或膠囊按鈕。
- **Don't** 套用抽象圖示三欄 SaaS 樣板或空洞科技行銷文案。
- **Don't** 將原始碼檢查表述為桌面與手機視覺驗收；目前瀏覽器／網址存取未能完成驗證。
