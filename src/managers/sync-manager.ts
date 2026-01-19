/*
서버 데이터 저장 및 실시간 협업 기능을 담당합니다.

- **Persistence**: 씬 데이터를 JSON 포맷으로 직렬화하여 Supabase 등에 저장.
- **Realtime Sync**: 타 사용자의 변경 사항을 수신하여 로컬 스토어에 즉각 반영.
- **Conflict Resolution**: 동시 수정 시 발생하는 데이터 충돌 해결.
*/