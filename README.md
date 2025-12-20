# Flight Time Games Server

Next.js 기반 게임 서버입니다. 클라이언트가 게임을 다운로드할 수 있는 API를 제공합니다.

## 설치

```bash
npm install
```

## 실행

개발 모드:
```bash
npm run dev
```

프로덕션 빌드:
```bash
npm run build
npm start
```

## API 엔드포인트

### GET /api/games
사용 가능한 모든 게임 목록을 반환합니다.

**Response:**
```json
[
  {
    "id": "sudoku",
    "name": "스도쿠",
    "description": "숫자 퍼즐 게임",
    "version": "1.0.0",
    "iconUrl": "https://example.com/icons/sudoku.png",
    "downloadUrl": "http://localhost:3000/api/games/sudoku/download",
    "fileSize": 12345,
    "isBuiltIn": false,
    "categories": ["퍼즐", "논리"],
    "lastUpdated": "2024-01-15T00:00:00Z"
  }
]
```

### GET /api/games/[gameId]
특정 게임의 상세 정보를 반환합니다.

### GET /api/games/[gameId]/download
게임의 Dart 코드를 다운로드합니다.

## 게임 모듈 구조

게임은 `games/` 폴더에 JSON 파일로 저장됩니다.

### 게임 JSON 구조

```json
{
  "id": "game_id",
  "name": "게임 이름",
  "description": "게임 설명",
  "version": "1.0.0",
  "iconUrl": "아이콘 URL",
  "fileSize": 0,
  "isBuiltIn": false,
  "categories": ["카테고리1", "카테고리2"],
  "lastUpdated": "2024-01-15T00:00:00Z",
  "gameType": "game_type",
  "config": {
    // 게임별 설정
  },
  "dartCode": "// Dart 코드 문자열"
}
```

### 게임 추가 방법

1. `games/` 폴더에 새 JSON 파일 생성 (예: `my_game.json`)
2. 게임 메타데이터와 Dart 코드를 JSON에 작성
3. 서버 재시작 후 자동으로 API에 반영

## 환경 변수

`.env.local` 파일 생성:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 게임 모듈 형태

게임 모듈은 두 가지 형태로 제공할 수 있습니다:

### 1. JSON + Dart 코드 (현재 방식)
- 게임 메타데이터와 Dart 코드를 JSON에 포함
- 간단하고 빠르게 구현 가능
- Flutter에서 동적 로딩 제한적

### 2. JSON 설정 기반 (권장)
- 게임 로직을 JSON으로 정의
- 클라이언트에서 JSON을 읽어 게임 렌더링
- 더 유연하고 확장 가능

### 3. Dart 패키지 (고급)
- 게임을 별도 Dart 패키지로 빌드
- 클라이언트에서 패키지 다운로드 및 로드
- 가장 강력하지만 구현 복잡

## 예시 게임

`games/sudoku.json` - 스도쿠 게임 예시가 포함되어 있습니다.

# FlightTimeServer
