## burgerking

과제에서는 **native한 sql**을 사용하라고 했는데 일단 이건 사용 안 한 것 같음
### 한 페이지 당 게시글 수 수정
`src/component/postList.js` 안에 보면 `perSlice` 상수가 있습니다. 

### 실행 방법
일단 당신의 로컬에서 실행하게 되면 또 *cors*오류가 뜰 것입니다. 교수님의 컴퓨터에서도 그렇지 않을까요?
```bash
#같이 실행
/burgerking $ npm start
#클라이언트만 실행
/burgerking $ npm run start:client
#서버만 실행
/burgerking/server $ npm start

# 관련 내용은 pakage.json을 확인해주세요
```

DB는 실행을 하는 환경에 설치되어 있어야 합니다. 당신의 컴퓨터에 MariaDB가 설치되어 있다면 `/server/config/config.json`을 고쳐서 당신의 DB와 연동시키세요.

### Version
node - 16.20.0  
node버전 안 맞으면 오류 엄청 납니다.  
node버전 맞추는 법은 구글에 nvm node version 어쩌구 치면 나옴

### 실행이 똑바로 된다면
저는 코드스페이스에서 실행시켰는데 실행이 잘 안 돼서 정말 힘들었습니다. 로컬 환경에서 실행시키는 건 좀 더 쉬울까요?
![1](https://user-images.githubusercontent.com/66898263/246614516-b1aef18d-6993-4216-85a4-b4f6459992bb.png)
![2](https://user-images.githubusercontent.com/66898263/246614536-851de461-cad3-4c6f-aa03-3020895c5ad4.png)
![3](https://user-images.githubusercontent.com/66898263/246614572-3167120c-3078-4bdc-8649-f169e3a56020.png)

제작년의 나는 참 코드를 더럽게 짜놨음. 근데 2년뒤에 내가 지금의 나를 보면 똑같이 느끼겠지.