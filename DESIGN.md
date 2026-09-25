---
name: 松東營造設計系統 (Song Dong Design System)
description: 穩健、沉穩、具工藝質感的傳統營造與公共工程品牌設計語言
colors:
  navy: "#10283f"
  dark: "#081725"
  gold: "#c7a469"
  paper: "#f6f5f1"
  text: "#263746"
  muted: "#65717b"
  line: "#dedfdc"
typography:
  body:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", Arial, sans-serif'
    fontSize: "16px"
    lineHeight: "1.85"
    letterSpacing: "0.02em"
  heading:
    fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif'
    fontWeight: "700"
    lineHeight: "1.3"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
---

## 1. Overview
松東營造的視覺設計以「穩重、紮實、安全與工程信賴感」為核心。設計應傳遞實體產業與公共建設的扎實根基，而非虛擬科技公司的輕飄感。

## 2. Colors
- **主色 (Navy #10283f)**：象徵沉穩、專業、深邃與制度化管理，用於主要導覽、標題、深色區塊背景與主要按鈕。
- **深色 (Dark #081725)**：用於頁尾 (Footer)、強化視覺對比的基底深色。
- **強調色 (Gold #c7a469)**：象徵品質、榮譽與點睛細節，用於重點提示、邊框修飾、特色標籤。
- **基底紙色 (Paper #f6f5f1)**：以微暖紙感取代純白（#ffffff），營造質樸、耐看、不刺眼的閱讀體驗。
- **內文文字 (Text #263746)**：深青灰色彩，具備極佳易讀性與印刷墨色質感。
- **次要文字 (Muted #65717b)**：用於時間、備註、副標題與佐證數據。
- **分隔線 (Line #dedfdc)**：細微低調的結構劃分線。

## 3. Typography
- **字體選用**：以 `Noto Sans TC` 與正黑體系統字體為主，字重清晰分明（400 / 500 / 700）。
- **行高與字距**：中文內文行高設定為 `1.85`，提供充裕的閱讀呼吸感；中文字距微調至 `0.02em` 提升印刷質感。
- **標題層級**：標題嚴禁過長或無意義修飾詞，重點在於結構清楚、層次分明。

## 4. Layout
- **版心與格線**：最大寬度通常保持在 1200px ~ 1280px，留白大器均勻。
- **工程實績展現**：以真實工程現場照片（道路、橋梁、鋼筋、混凝土施工過程）作為主視覺，圖文並茂，佐以明確的完工年份與工程標案名稱。
- **區塊節奏**：深色與淺色交錯區塊，避免連續單調；但在單一區塊內維持純淨與對齊。

## 5. Elevation & Depth
- **拒絕無效懸浮**：營造業強調「落地生根」，卡片與區塊應以細邊框 (`1px solid var(--line)`) 或微弱位移陰影為主。
- **陰影規範**：若使用陰影，需具備明確的下沉偏移與漫射（如 `0 4px 16px rgba(16, 40, 63, 0.06)`），嚴禁彩色光暈或擴散模糊。

## 6. Shapes
- **微圓角**：卡片與按鈕以 `4px` 或 `8px` 為主，展現工整、方正與結構感。
- **避免大膠囊圓角**：除了小型狀態 Tag 標籤外，不要在大按鈕或大卡片上使用 `rounded-3xl` 或 `rounded-full`。

## 7. Components
- **導覽列**：固定頂部，微透明或實色背景，具備明確聯絡電話與標誌。
- **工程卡片**：真實照片佔比高，清楚標註工程名稱、地點、工期與負責工法。
- **聯絡資訊塊**：醒目的統一編號、地址、電話，展現合法合規的實體企業信賴度。

## 8. Anti-AI Slop Checklist (絕對禁止的 AI 刻板設計)
- ❌ **絕對禁止 AI 萬年紫色/藍色漸層**（`indigo to purple`）與無意義的霓虹光球。
- ❌ **絕對禁止無意義的科技毛玻璃**（濫用 `backdrop-blur` 和透明半透白邊框）。
- ❌ **絕對禁止科技 SaaS 的 3 欄等寬抽象圖示卡片**（卡片放閃電、火箭、盾牌等向量空泛圖示）。
- ❌ **絕對禁止假大空科技宣傳文案**（如「引領未來的全方位智能建築賦能平台」）。
- ❌ **絕對禁止浮誇的彈跳動效**，過渡動效應控制在 0.2s ~ 0.3s 的線性/漸慢，保持穩重。
