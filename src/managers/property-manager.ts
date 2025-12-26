/*
유니티의 인스펙터(Inspector)처럼 오브젝트의 세부 파라미터를 제어하고 UI와 데이터를 동기화합니다.

- **Property Reflection**: 선택된 오브젝트의 타입에 따라 필요한 속성 필드(Transform, Material, Script 등) 자동 구성.
- **Data Validation**: 입력된 값의 유효성 검증(예: Scale은 0보다 커야 함) 및 자동 보정.
- **UI Bridge**: UI 컴포넌트가 직접 스토어를 수정하는 대신, 매니저를 통해 정제된 데이터를 반영.
- **Multi-selection Support**: 여러 오브젝트 선택 시 공통 속성을 추출하여 일괄 편집 지원.
*/