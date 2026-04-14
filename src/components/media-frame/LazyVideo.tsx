import { useInView } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  VideoHTMLAttributes,
} from "react";

type LazyLoadVideoProps = VideoHTMLAttributes<HTMLVideoElement>;

const LazyVideo = forwardRef<HTMLVideoElement, LazyLoadVideoProps>(
  ({ src, ...rest }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => videoRef.current!, []);

    const inView = useInView(videoRef, {
      once: true,
      margin: "50px",
      amount: 0.1,
    });

    useEffect(() => {
      if (inView && videoRef.current && typeof src === "string") {
        videoRef.current.src = src;
        videoRef.current.load();
      }
    }, [src, inView]);

    return (
      <video ref={videoRef} {...rest}>
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
);

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
