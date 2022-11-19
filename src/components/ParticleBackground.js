import { useCallback } from "react"
import Particles from "react-particles"
import { loadFull } from "tsparticles";
import particlesConfig from "./config/particle-config"

export const ParticleBackground = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    return(
        <Particles id="tsparticles" options={particlesConfig} init={particlesInit}/>
    );
}