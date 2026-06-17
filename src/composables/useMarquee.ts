import { type Ref } from 'vue'

export function useMarquee(trackEl: Ref<HTMLElement | null>) {
    const pauseMarquee = () => {
        if (trackEl.value) trackEl.value.style.animationPlayState = 'paused'
    }

    const resumeMarquee = () => {
        if (trackEl.value) trackEl.value.style.animationPlayState = 'running'
    }

    return { pauseMarquee, resumeMarquee }
}
