

class SmoothScroll{
    constructor(element, animationObjects){
        this.element = element;
        this.mediaSection = animationObjects.mediaSection;
        this.currentY = 0;
        this.targetY = 0;
        this.init();
        this.addEventListener()
        this.render()
    }

    init(){
        document.body.style.height = `${this.element.getBoundingClientRect().height}px`
    }

    lerp(start, end, t = 0.1){
        return start * (1 - t ) + end * t;
    }

    addEventListener(){
        window.addEventListener('scroll', () => {
            this.targetY = window.scrollY;
        })
        window.addEventListener('resize', this.init.bind(this));
    }

    animateMediaSection(){
        // Adjust width of intro video based on scroll position.
        let {top} = this.mediaSection.getBoundingClientRect();
        let videoWrapper = this.mediaSection.children[0]
        top = top < 0 ? 0 : top;
        videoWrapper.style.clipPath = `polygon(${top * .03}% 0%, ${100 - (top * .03)}% 0%, ${100 - (top * 0.03)}% 100%, ${top * .03}% 100%)`
    }

    render(){
        this.animateMediaSection()
        this.currentY = this.lerp(this.currentY, this.targetY);
        this.element.style.transform = `translate3d(0,-${this.currentY.toFixed(2)}px, 0)`;
        requestAnimationFrame(this.render.bind(this))
    }
}

export default SmoothScroll;