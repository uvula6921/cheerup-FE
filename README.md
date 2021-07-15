# cheerup-FE

## 📕 개요

- 명칭 : cheerup
- 개발 인원 : 5명
  - Front end: **노예찬, 박경준**
  - Back end: **박응수, 김선용, 이중원**
- 개발 기간 : 2021.07.09 ~ 2021.07.15
- 주요 기능
  - 유저가 고민을 적으면 랜덤으로 고민에 대한 해결책을 제시해줌. (마법의 고민해결책 컨셉 차용)
  - 게시글과 댓글에 대한 CRUD
  - JWT를 이용한 로그인
- 개발 언어 : JavaScript,
- 개발 라이브러리 : React.js
- 형상 관리 툴 : git
- 협업 툴 : [notion](https://www.notion.so/22-1fc891afa24f457aac4aac2cb320a79f)
- 간단 소개 : 리액트 - 스프링 게시판 기능을 통한 고민해결 사이트.

## ☝🏻 프로젝트 특징

- 프론트엔드와 백엔드를 분리하여 프로젝트 개발

  - 각 파트별로 Repository를 생성 후 작업
  - 프론트: AWS S3
  - 백엔드: AWS EC2
  - 빌드 후, S3와 EC2를 연동
    - API 명세서에 따라 API호출 및 응답 확인
  - 로그인 시 JWT, 쿠키 사용
  - material-ui를 이용해 레이아웃 구현

## 💻 사용 패키지

* **reduxjs/toolkit**
  - 데이터 전역 관리를 위한 리덕스 관리 패키지
* **styled-components**
  - 컴포넌트의 스타일을 설정하는 패키지
* **axios**
  - 서버 통신을 위한 패키지
* **connected-react-router, history**
  - 라우팅 및 페이지 이동을 위한 패키지
* **swiper**
  - 슬라이더를 구현하는 패키지
* **universal-cookie**
  - 쿠키 crud 관련 동작을 위한 패키지
* **jwt-decode**
  - 토큰의 payload 내용을 디코딩하기 위한 패키지
* **material-ui**
  - UI Framework 패키지

## 🚀 핵심 트러블 슈팅

### 소팅방식 전환 시 스와이퍼 위치가 그대로 유지됨.
- 소팅방식을 바꾸면 가장 첫 카드로 스와이퍼가 돌아가야 UX 적으로 바람직.
- querySelector로 노드를 가져오려고할때 문제가 있었음.
- useEffect()로 렌더링 이후 노드 할당
- 소팅 버튼에서 생성된 swiper 객체에 slide 위치를 초기화하는 함수 onClick에 추가

- 스와이퍼 노드 정의 및 swiper state에 할당
```jsx
const [swiper, setSwiper] = useState(null);
useEffect(() => {
  const swiperInstance = document.querySelector(".swiper-container").swiper;
  setSwiper(swiperInstance);
}, []);
```

- 소팅 버튼 클릭 시 slide 초기화

```jsx
<MenuItem value="" onClick={() => swiper.slideTo(0, 250, false)}>
  등록일 순
</MenuItem>
```

### card onClick 이벤트 버블링
- 카드 위에 absolute position으로 들어간 버튼을 눌렀을때, 카드 클릭도 발생되어 디테일 페이지로 넘어감.
- z-index를 활용해도 문제 재현
- stopPropagation()으로 이벤트 전달 방지
- touchstart 이벤트 제어를 위해서 바닐라 자바스크립트를 활용

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

### article 모듈의 loadArticleSV에 인자가 제대로 들어가지 않음
- api로 리스트를 가져올때마다 username으로 식별하여 변경되어야 하는 값이 갱신되지 않고 그대로 반환됨 (likeItChecker state)
- .get(`/article?username=${user_name}`) api 호출 시 username 파라미터에 값이 안들어가는것으로 확인.

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

- dispatch로 불러오는 과정에서 arg로 쓰인 user_name state가 제대로 갱신되기 전에 들어가버림.
- useEffect에서 user_name이 변경되면 dispatch 되도록 수정.

```jsx
const user_name = useSelector((state) => state.user.user_name);

...

useEffect(() => {
  dispatch(listActions.loadArticleSV(user_name));
}, [user_name]);
```

### 로그인 이전에 적었던 글이 남아있도록 하는 기능이 제대로 작동하지 않음 
- 새로고침이 될 때마다, loginCheck함수가 실행됨
- loginCheck함수에서 쿠키를 통해 로그인이 확인이 되면, 다시 로그인 리듀서를 실행하는 방식으로 했었기 때문에 문제가 되었음.
- loginCheck함수가 실행되면 로그인 리듀서를 실행하는 방식이 아닌, 로그인 여부만 확인하는 리듀서를 따로 만들어서 실행함.

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
