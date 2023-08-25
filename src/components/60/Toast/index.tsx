import { createRoot } from 'react-dom/client';
import ToastManager from './ToastManager';

// 알림을 띄울 때 많이 사용하는 컴포넌트
// toast 클래스 -> Toast들을 띄우는 역할

class Toast {
  portal: HTMLElement | null = null;
  createToast: ((message: string, duration: number) => void) | undefined;
  constructor() {
    const portalId = 'toast-portal';
    const portalElement = document.getElementById(portalId); // 포탈용

    // portalId로 찾은 portalElement가 있다면 binding후 return
    if (portalElement) {
      this.portal = portalElement;
      return;
    } else {
      // 없다면 만들어줌
      this.portal = document.createElement('div');
      this.portal.id = portalId;
      // appendChild로 추가
      document.body.appendChild(this.portal);
    }
    // add: ToastManager 초기화
    this.initializeRoot();
  }

  // add: ToastManager를 포털에 렌더링
  initializeRoot() {
    // ReactDom.createPortal: 포털에다가 원하는 컴포넌트를 넣는 기능
    // ReactDom.render: 포털 자체를 출력
    const element = createRoot(this.portal!);
    element.render(
      <ToastManager
        bind={(createToast) => {
          this.createToast = createToast;
          // show함수를 실행시킬 때, Toast 안에 있는 ToastManager가 실행 됨
        }}
      />
    );
  }
  // show 메서드: Toast에 들어갈 메세지와 Toast가 얼마나 유지할 것인가
  show(message: string, duration = 2000) {
    // add: createToast가 정의되지 않았을 경우 초기화 후 재시도
    //this.createToast(message, duration); // ToastManager에서 받기 createToast 함수 실행
    if (!this.createToast) {
      this.initializeRoot();
      setTimeout(() => {
        this.show(message, duration);
      }, 100);
      return;
    }
    // createToast 함수를 통해 ToastManager에 메세지와 지속 시간 전달
    this.createToast(message, duration);
  }
}

export default new Toast();
