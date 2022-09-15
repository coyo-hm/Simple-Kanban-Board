# Simple Kanban Board

![ezgif com-gif-maker](https://user-images.githubusercontent.com/56423604/190454639-62c2abb5-359b-4e33-bc6a-fe45c2fcf3c1.gif)
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/56423604/190454736-c55b9ec0-4d28-436e-bb20-7955f2828167.gif)

> react-beautiful-dnd를 이용한 간단한 칸반 보드

## Quick Start

```shell
npm install
npm start
```

## Project Structure

```Plain text
src
│
├── atoms ────────────────  Global State
│
├── components ───────────  view 컴포넌트
│   ├── DraggableBoard
│   ├── DraggableCard
│   ├── DroppableArea
│   └── Home
│
├── helpers ──────────────  각종 유틸 함수 및 공통 상수
│   └── constant
│
├── hooks ────────────────  hook
│   └── useTheme
│
├── images ───────────────  이미지 파일
│
│
├── style ────────────────  styled-components' custom style & GlobalStyle
│   ├── globalStyle
│   └── index
│
├── theme ────────────────  theme 관련
│   ├── ToggleTheme
│   ├── styled.d.ts
│   └── theme
│
├── App.js ───────────────  Theme Context 적용 & GlobalStyle 적용
│
└── index.js ─────────────  애플리케이션 엔트리 포인트
```

## Tech Stack

- react v_18.2.0
- react-beautiful-dnd v_13.1.0
- react-dom v_18.2.0
- react-helmet v_6.1.0
- react-hook-form v_7.34.0
- recoil v_0.7.4
- styled-components v_5.3.5
- typescript v_4.8.3
