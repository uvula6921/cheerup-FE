# cheerup-FE

## ๐ ๊ฐ์

- ๋ช์นญ : cheerup
- ๊ฐ๋ฐ ์ธ์ : 5๋ช
  - Front end: **๋ธ์์ฐฌ, ๋ฐ๊ฒฝ์ค**
  - Back end: **๋ฐ์์, ๊น์ ์ฉ, ์ด์ค์**
- ๊ฐ๋ฐ ๊ธฐ๊ฐ : 2021.07.09 ~ 2021.07.15
- ์ฃผ์ ๊ธฐ๋ฅ
  - ์ ์ ๊ฐ ๊ณ ๋ฏผ์ ์ ์ผ๋ฉด ๋๋ค์ผ๋ก ๊ณ ๋ฏผ์ ๋ํ ํด๊ฒฐ์ฑ์ ์ ์ํด์ค. (๋ง๋ฒ์ ๊ณ ๋ฏผํด๊ฒฐ์ฑ ์ปจ์ ์ฐจ์ฉ)
  - ๊ฒ์๊ธ๊ณผ ๋๊ธ์ ๋ํ CRUD
  - JWT๋ฅผ ์ด์ฉํ ๋ก๊ทธ์ธ
- ๊ฐ๋ฐ ์ธ์ด : JavaScript,
- ๊ฐ๋ฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ : React.js
- ํ์ ๊ด๋ฆฌ ํด : git
- ํ์ ํด : [notion](https://www.notion.so/22-1fc891afa24f457aac4aac2cb320a79f)
- ๊ฐ๋จ ์๊ฐ : ๋ฆฌ์กํธ - ์คํ๋ง ๊ฒ์ํ ๊ธฐ๋ฅ์ ํตํ ๊ณ ๋ฏผํด๊ฒฐ ์ฌ์ดํธ.

## โ๐ป ํ๋ก์ ํธ ํน์ง

- ํ๋ก ํธ์๋์ ๋ฐฑ์๋๋ฅผ ๋ถ๋ฆฌํ์ฌ ํ๋ก์ ํธ ๊ฐ๋ฐ

  - ๊ฐ ํํธ๋ณ๋ก Repository๋ฅผ ์์ฑ ํ ์์
  - ํ๋ก ํธ: AWS S3
  - ๋ฐฑ์๋: AWS EC2
  - ๋น๋ ํ, S3์ EC2๋ฅผ ์ฐ๋
    - API ๋ช์ธ์์ ๋ฐ๋ผ APIํธ์ถ ๋ฐ ์๋ต ํ์ธ
  - ๋ก๊ทธ์ธ ์ JWT, ์ฟ ํค ์ฌ์ฉ
  - material-ui๋ฅผ ์ด์ฉํด ๋ ์ด์์ ๊ตฌํ

## ๐ป ์ฌ์ฉ ํจํค์ง

* **reduxjs/toolkit**
  - ๋ฐ์ดํฐ ์ ์ญ ๊ด๋ฆฌ๋ฅผ ์ํ ๋ฆฌ๋์ค ๊ด๋ฆฌ ํจํค์ง
* **styled-components**
  - ์ปดํฌ๋ํธ์ ์คํ์ผ์ ์ค์ ํ๋ ํจํค์ง
* **axios**
  - ์๋ฒ ํต์ ์ ์ํ ํจํค์ง
* **connected-react-router, history**
  - ๋ผ์ฐํ ๋ฐ ํ์ด์ง ์ด๋์ ์ํ ํจํค์ง
* **swiper**
  - ์ฌ๋ผ์ด๋๋ฅผ ๊ตฌํํ๋ ํจํค์ง
* **universal-cookie**
  - ์ฟ ํค crud ๊ด๋ จ ๋์์ ์ํ ํจํค์ง
* **jwt-decode**
  - ํ ํฐ์ payload ๋ด์ฉ์ ๋์ฝ๋ฉํ๊ธฐ ์ํ ํจํค์ง
* **material-ui**
  - UI Framework ํจํค์ง

## ๐ ํต์ฌ ํธ๋ฌ๋ธ ์ํ

### ์ํ๋ฐฉ์ ์ ํ ์ ์ค์์ดํผ ์์น๊ฐ ๊ทธ๋๋ก ์ ์ง๋จ.
- ์ํ๋ฐฉ์์ ๋ฐ๊พธ๋ฉด ๊ฐ์ฅ ์ฒซ ์นด๋๋ก ์ค์์ดํผ๊ฐ ๋์๊ฐ์ผ UX ์ ์ผ๋ก ๋ฐ๋์ง.
- querySelector๋ก ๋ธ๋๋ฅผ ๊ฐ์ ธ์ค๋ ค๊ณ ํ ๋ ๋ฌธ์ ๊ฐ ์์์.
- useEffect()๋ก ๋ ๋๋ง ์ดํ ๋ธ๋ ํ ๋น
- ์ํ ๋ฒํผ์์ ์์ฑ๋ swiper ๊ฐ์ฒด์ slide ์์น๋ฅผ ์ด๊ธฐํํ๋ ํจ์ onClick์ ์ถ๊ฐ

- ์ค์์ดํผ ๋ธ๋ ์ ์ ๋ฐ swiper state์ ํ ๋น
```jsx
const [swiper, setSwiper] = useState(null);
useEffect(() => {
  const swiperInstance = document.querySelector(".swiper-container").swiper;
  setSwiper(swiperInstance);
}, []);
```

- ์ํ ๋ฒํผ ํด๋ฆญ ์ slide ์ด๊ธฐํ

```jsx
<MenuItem value="" onClick={() => swiper.slideTo(0, 250, false)}>
  ๋ฑ๋ก์ผ ์
</MenuItem>
```

### card onClick ์ด๋ฒคํธ ๋ฒ๋ธ๋ง
- ์นด๋ ์์ absolute position์ผ๋ก ๋ค์ด๊ฐ ๋ฒํผ์ ๋๋ ์๋, ์นด๋ ํด๋ฆญ๋ ๋ฐ์๋์ด ๋ํ์ผ ํ์ด์ง๋ก ๋์ด๊ฐ.
- z-index๋ฅผ ํ์ฉํด๋ ๋ฌธ์  ์ฌํ
- stopPropagation()์ผ๋ก ์ด๋ฒคํธ ์ ๋ฌ ๋ฐฉ์ง
- touchstart ์ด๋ฒคํธ ์ ์ด๋ฅผ ์ํด์ ๋ฐ๋๋ผ ์๋ฐ์คํฌ๋ฆฝํธ๋ฅผ ํ์ฉ

```jsx
<IconButton
  size="small"
  aria-label="like"
  style={{
    backgroundColor: "#fff",
    padding: "8px",
    position: "absolute",
    top: "3px",
    right: "5px",
    border: "1px solid #0B184E",
  }}
  onClick={(e) => {
    dispatch(listActions.likeSV(user_name, l.id));
    e.stopPropagation();
  }}
>
```

### article ๋ชจ๋์ loadArticleSV์ ์ธ์๊ฐ ์ ๋๋ก ๋ค์ด๊ฐ์ง ์์
- api๋ก ๋ฆฌ์คํธ๋ฅผ ๊ฐ์ ธ์ฌ๋๋ง๋ค username์ผ๋ก ์๋ณํ์ฌ ๋ณ๊ฒฝ๋์ด์ผ ํ๋ ๊ฐ์ด ๊ฐฑ์ ๋์ง ์๊ณ  ๊ทธ๋๋ก ๋ฐํ๋จ (likeItChecker state)
- .get(`/article?username=${user_name}`) api ํธ์ถ ์ username ํ๋ผ๋ฏธํฐ์ ๊ฐ์ด ์๋ค์ด๊ฐ๋๊ฒ์ผ๋ก ํ์ธ.

```jsx
const loadArticleSV = (user_name, id) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/article?username=${user_name}`)
      .then((res) => {
        if (id) {
          const article = res.data.filter((l, idx) => {
            return l.id === parseInt(id);
          });
          dispatch(loadArticle(article));
        } else {
          dispatch(loadArticle(res.data));
        }
      })
      .catch((err) => {
        console.log("list load error!", err);
      });
  };
};
```

- dispatch๋ก ๋ถ๋ฌ์ค๋ ๊ณผ์ ์์ arg๋ก ์ฐ์ธ user_name state๊ฐ ์ ๋๋ก ๊ฐฑ์ ๋๊ธฐ ์ ์ ๋ค์ด๊ฐ๋ฒ๋ฆผ.
- useEffect์์ user_name์ด ๋ณ๊ฒฝ๋๋ฉด dispatch ๋๋๋ก ์์ .

```jsx
const user_name = useSelector((state) => state.user.user_name);

...

useEffect(() => {
  dispatch(listActions.loadArticleSV(user_name));
}, [user_name]);
```

### ๋ก๊ทธ์ธ ์ด์ ์ ์ ์๋ ๊ธ์ด ๋จ์์๋๋ก ํ๋ ๊ธฐ๋ฅ์ด ์ ๋๋ก ์๋ํ์ง ์์ 
- ์๋ก๊ณ ์นจ์ด ๋  ๋๋ง๋ค, loginCheckํจ์๊ฐ ์คํ๋จ
- loginCheckํจ์์์ ์ฟ ํค๋ฅผ ํตํด ๋ก๊ทธ์ธ์ด ํ์ธ์ด ๋๋ฉด, ๋ค์ ๋ก๊ทธ์ธ ๋ฆฌ๋์๋ฅผ ์คํํ๋ ๋ฐฉ์์ผ๋ก ํ์๊ธฐ ๋๋ฌธ์ ๋ฌธ์ ๊ฐ ๋์์.
- loginCheckํจ์๊ฐ ์คํ๋๋ฉด ๋ก๊ทธ์ธ ๋ฆฌ๋์๋ฅผ ์คํํ๋ ๋ฐฉ์์ด ์๋, ๋ก๊ทธ์ธ ์ฌ๋ถ๋ง ํ์ธํ๋ ๋ฆฌ๋์๋ฅผ ๋ฐ๋ก ๋ง๋ค์ด์ ์คํํจ.

```jsx
const CHECK_LOGIN = "CHECK_LOGIN";

...

const checkLogin = createAction(CHECK_LOGIN, (user_name) => ({ user_name }));

...

const loginCheckCK = () => {
  return (dispatch, getState, { history }) => {
    const token = cookies.get("refresh_token");
    const decoded = jwt_decode(token);
    dispatch(checkLogin(decoded.sub));
  };
};

...

[CHECK_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user_name = action.payload.user_name;
        draft.is_login = true;
      }),
```
