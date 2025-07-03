# nextjs-cinema-app

This is a [Next.js](https://nextjs.org/) project created for submission to the Onebite Challenge.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the app by modifying files inside the `app/` directory. The page will auto-update as you make changes.

---

## 1. 프로젝트 생성하기

- App Router를 사용하는 새로운 Next.js 프로젝트를 생성해주세요.
- 버전은 현재 보안상 가장 안전한 **v15.2.3**으로 진행해 주세요.
- 이름은 `onebite-cinema-app` 또는 자유롭게 설정하셔도 됩니다.

```bash
npx create-next-app@15.2.3 onebite-cinema-app
```

---

## 2. 라우팅 설정하기

다음과 같이 라우트를 구성합니다:

1. `/` : 인덱스 페이지  
2. `/search` : 검색 페이지  
   - `q`라는 이름의 쿼리스트링을 전달받아 화면에 렌더링합니다.
3. `/movie/[id]` : 영화 상세 페이지  
   - `id`라는 이름의 URL 파라미터를 화면에 렌더링합니다.

---

## 3. 레이아웃 설정하기 (스타일 및 기능 제외)

다음 요구사항을 만족하도록 글로벌 및 페이지별 레이아웃을 구성합니다:

- 인덱스 페이지(`/`)와 검색 페이지(`/search`)는 **글로벌 레이아웃 + 서치바 레이아웃**이 중첩 적용됩니다.
- 영화 상세 페이지(`/movie/[id]`)는 **글로벌 레이아웃만 적용**됩니다.

> 페이지 결과물은 커뮤니티에서 제공한 이미지를 참고해 주세요.

---

## Project Structure

This project uses the **App Router** (`app/` directory), introduced in Next.js 13+.

- Routing is handled by the **file system** inside the `app/` directory.
- Each folder in `app/` represents a route segment, and `page.tsx` files define the UI for those routes.
- Layouts, templates, and loading states can be co-located within route segments.

> Note: This project does **not** include API routes.

Example file structure:

```
app/
  layout.tsx           # Root (global) layout
  page.tsx             # Home route (/)
  search/
    layout.tsx         # SearchBar layout
    page.tsx           # Search results page
  movie/
    [id]/
      page.tsx         # Movie detail page
  components/          # UI components
  styles/              # Global or modular styles
```

---

## Learn More

To learn more about Next.js and the App Router, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and APIs.
- [App Router Introduction](https://nextjs.org/docs/app) – full guide to using the App Router.
- [Learn Next.js](https://nextjs.org/learn) – interactive tutorial for beginners.

You can also explore the [Next.js GitHub repository](https://github.com/vercel/next.js) to contribute or get help.

---

## Deployment

The easiest way to deploy your Next.js app is via the [Vercel Platform](https://vercel.com), built by the creators of Next.js.

For deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
