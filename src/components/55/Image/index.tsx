import {
  useEffect,
  useRef,
  useState,
  CSSProperties,
  HTMLAttributes,
} from 'react';

type Props = {
  lazy?: boolean;
  threshold?: number;
  src: string;
  placeholder?: string;
  block?: boolean;
  width: number | string;
  height: number | string;
  alt: string;
  mode?: 'cover' | 'fill' | 'contain';
} & HTMLAttributes<HTMLImageElement>;

//  옵저버 생성
// 전역에서 만든 이유는 컴포넌트가 새로 생성되더라도 다시 생성되지 않도록
// 모듈내에서 전역적으로 사용하기 위해
let observer = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';
// 화면안으로 들어오면 이벤트가 실행되도록 하는 커스텀 이벤트
// Intersection Observer의 콜백 함수로 전달되는 관찰 대상 엘리먼트들의 정보를 담은 배열입니다.
// 각 entry 객체는 관찰 대상 엘리먼트와 관련된 정보를 포함하고 있습니다.
// io는 Intersection Observer 인스턴스를 나타냅니다.
// 이를 통해 unobserve 메서드를 호출하여 엘리먼트의 감시를 중지할 수 있습니다.
const onIntersection = (
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver
) => {
  entries.forEach((entry) => {
    // 만약 엘리먼트가 뷰포트 내에 보이는 상태면
    if (entry.isIntersecting) {
      // 감시 중단
      io.unobserve(entry.target);
      // 커스텀 이벤트 호출
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

/* lazy: 로딩여부, 
threshold: 화면에 얼만큼 들어와야 로딩할건지
threshold = 0.5 => 절반 걸치면 로딩 시작
placeholder: 로딩 안할떄 무엇을 보여줄건지
*/
const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}: Props) => {
  // 이미지 컴포넌트가 로드 여부 판단
  const [loaded, setLoaded] = useState(false);
  // 이미지 태그에 접근
  const imgRef = useRef<HTMLImageElement | null>(null);

  const imageStyle: CSSProperties = {
    display: block ? 'block' : undefined,
    width,
    height,
    objectFit: mode, // mode는 3가지 타입 가능(cover, fill, contain)
  };

  // 이미지 태그가 로드 되면
  useEffect(() => {
    // 로딩이 끝났으면,
    if (!lazy) {
      // 로딩 완료
      setLoaded(true);
      return;
    }
    // 로드가 완료됨
    const handleLoadImages = () => setLoaded(true);
    // 이미지 요소에 이벤트 리스너 달아주기
    const imgElement = imgRef.current;
    // 널이 아닐 경우에, handleLoadImages
    imgElement &&
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImages);
    return () => {
      imgElement &&
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImages);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) return;
    // 옵저버 생성
    observer = new IntersectionObserver(onIntersection, { threshold });
    // 이미지 요소가 널이 아닐때, 관찰시킴
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      // 로드가 되었다면 사진 보여주고 아니면 placeholder 보여주기
      src={loaded ? src : placeholder}
      style={{ ...imageStyle, ...props.style }}
      alt={alt}
    />
  );
};
export default Image;
