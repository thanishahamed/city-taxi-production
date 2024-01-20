import lottie from "lottie-web";
import { useEffect, useRef } from "react";

const LottieViewer = ({lottieName, loop = true}) => {
    const animContainer = useRef(null);
    
    useEffect(() => {
        loadLottie();
    }, []);
    
    const loadLottie = () => {
        if (!animContainer.current.innerHTML) {
            lottie.loadAnimation({
                container: animContainer.current,
                renderer: 'svg',
                loop: loop,
                autoplay: true,
                animationData: require(`../assets/lotties/${lottieName}.json`)
            });
        }
    }

    return (
        <div className="" style={{overflow: 'hidden'}}>
            <div ref={animContainer} style={{height: '100vh', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}></div>
        </div>
    )
}

export default LottieViewer;