# Contributing Guidelines

### 1. 시작 전 확인

- 내 GitHub 계정에 원본 레포지토리(방장레포)를 포크했는지 확인
- upstream이 설정되어 있는지 확인:
  ```bash
  git remote -v
  ```
- 만약 없다면 설정:

  ```bash
  git remote add upstream https://github.com/puddingForever/react-study.git
  ```

  - 내 원격 저장소는 origin, 원래 주인(방장)의 저장소는 upstream으로 추적시작

### 2. 최신 변경사항 가져오기

```bash
# main 브랜치로 이동
git checkout main

# upstream에서 최신 변경사항 가져오기
git pull upstream main

#  origin에 변경사항 반영 (내 레포)
git push origin main
```

### 3. 새 브랜치 만들기

```bash
# 새 브랜치 생성
git checkout -b docs/your-topic-name
```

### 4. 변경사항 작성

- 문서나 코드 수정
- 저장

### 5. 변경사항 커밋

```bash
# 변경된 파일 확인
git status

# 모든 변경사항 스테이징
git add .

# 변경사항 저장
git commit -m "docs: add your topic documentation"
```

### 6. origin에 브랜치 푸시

```bash
# GitHub에 브랜치 올리기
git push origin docs/your-topic-name
```

### 7. Pull Request 보내기

1. GitHub에서 "Compare & pull request" 클릭
2. 제목 및 설명 작성
3. "Create pull request" 클릭
4. 방장 저장소(upstream)의 main 브랜치로 병합 요청(Pull Request)

### 8. 승인되면 upstream의 main에 병합됨

## 자주 발생하는 문제와 해결방법

### "Permission Denied" 오류

- 협업자로 추가되어 있는지 확인
- GitHub 로그인 상태 확인
- 비밀번호 대신 personal access token 사용 필요할 수 있음

### "Branch Already Exists" 오류

- 다른 브랜치 이름 사용
- 예시: `docs/your-topic-name-2`

### "Can't Push" 오류

- 최신 변경사항을 가져왔는지 확인
- `git pull upstream main` 먼저 실행
- 인터넷 연결 확인
- GitHub 로그인 상태 확인

## 문서 작성 스타일

- 일관된 마크다운 형식 사용
- 기존 문서 구조 따르기
- 명확하고 간결한 설명 작성
- 적절한 코드 예제 포함
- 문서 최신 상태 유지

## PR 제출 전 체크리스트

- [ ] 문서가 스타일 가이드라인을 따르는지
- [ ] 모든 링크가 작동하는지
- [ ] 코드 예제가 올바르게 포맷팅되었는지
- [ ] 민감한 정보가 포함되지 않았는지
- [ ] 모든 변경사항이 필요한 것인지
- [ ] 문서가 올바르게 포맷팅되었는지
