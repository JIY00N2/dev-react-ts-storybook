import { CSSProperties, useEffect, useRef, useState } from 'react';
import { BuildFCProps } from '../../types';

type Props = BuildFCProps<
  {
    lazy?: boolean;
    threshold?: number;
    placeholder?: string;
    src: string;
    block?: boolean;
    width: number;
    height: number;
    alt: string;
    mode: CSSProperties['objectFit'];
  },
  HTMLImageElement
>;

const LOAD_IMG_EVENT_LABEL = 'loadImage';

const onIntersection = (
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_LABEL));
    }
  });
};

const Image = ({
  lazy,
  threshold = 0.1,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const imgStyle: CSSProperties = {
    display: block ? 'block' : 'inline',
    width,
    height,
    objectFit: mode,
  };

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }
    const handleLoadImage = () => setLoaded(true);
    const imgElement = imgRef.current;
    imgElement?.addEventListener(LOAD_IMG_EVENT_LABEL, handleLoadImage);
    return () => {
      imgElement?.removeEventListener(LOAD_IMG_EVENT_LABEL, handleLoadImage);
    };
  }, [lazy]);

  useEffect(() => {
    if (!lazy) {
      return;
    }
    if (!observer.current) {
      observer.current = new IntersectionObserver(onIntersection, {
        threshold,
      });
      imgRef.current && observer.current.observe(imgRef.current);
    }
  }, [lazy, threshold]);

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      css={{ ...imgStyle }}
      {...props}
    />
  );
};

export default Image;
