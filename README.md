# Simple Kanban Board



> react-beautiful-dnd를 이용한 노션 보드 클론 코딩입니다.
>
> - react-beautiful-dnd를 사용하여 Drag and Drop이 가능한 Kanban Board를 구현하였습니다. 
> - [react-color](https://casesandberg.github.io/react-color/)를 사용하여 보드의 색상을 변경할 수 있게 해주었습니다.
> - context api를 사용하여 theme toggle을 구현하였습니다.
> - localStorage를 이용해서 기존의 작성했던 보드의 정보를 저장해주었습니다.


## ✅ Feat

### Theme Switching
> styled-components 와 useContext를 이용하여 Theme Switching 구현

![theme_switching](https://github.com/coyo-hm/Simple-Kanban-Board/assets/56423604/414136c8-f01c-4c84-86fb-1dce03621db4)


### Board & Card Drag and Drop
> react-beautiful-dnd를 사용하여 Drag and Drop이 가능한 Kanban Board를 구현
>
> * 카드끼리의 위치 이동은 물론 보드끼리의 위치 이동도 가능 
> * 또한 보드에서 다른 보드로 카드 이동 가능 
> * 아래의 휴지통으로 보드나 카드를 드랍하여 카드나 보드는 삭제


![board_card_dnd](https://github.com/coyo-hm/Simple-Kanban-Board/assets/56423604/04bf7497-0350-4ced-bf77-8369a3248ad1)

### Board 생성
> Recoil과 React-Hook-Form 을 이용하여 보드 생성 및 편집

![create_board](https://github.com/coyo-hm/Simple-Kanban-Board/assets/56423604/b8dcc10a-19c0-4408-a4bc-1b9714beb6b3)


### Board 색상 추가
> Recoil과 React-Color를 이용하여 보드 색상을 관리 구현

![add_board_colors](https://github.com/coyo-hm/Simple-Kanban-Board/assets/56423604/eaa18b5b-628d-4f59-a71e-a82e6eb964c1)

## 👉🏻 Quick Start

```shell
npm install
npm start
```

## 🛠️ Tech Stack

- [react v_18.2.0](https://ko.legacy.reactjs.org/)
- [react-beautiful-dnd v_13.1.0](https://www.npmjs.com/package/react-beautiful-dnd)
- [react-helmet v_6.1.0](https://www.npmjs.com/package/react-helmet)
- [react-hook-form v_7.34.0](https://react-hook-form.com/)
- [react-color v_2.19.3](https://casesandberg.github.io/react-color/)
- [recoil v_0.7.4](https://recoiljs.org/ko/)
- [styled-components v_5.3.5](https://styled-components.com/)
- [typescript v_4.8.3](https://www.typescriptlang.org/)

## 🔗 URL

- [Demo Page](https://coyo-hm.github.io/Simple-Kanban-Board/)
- [Github Repository](https://github.com/coyo-hm/Simple-Kanban-Board)