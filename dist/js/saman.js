window.addEventListener("load", () => {
    // ثبت پلاگین ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // برای استفاده سریع و آسان
    var initReveals = () => {
        // راه‌اندازی اساسی
        gsap.utils.toArray('[data-reveal]').forEach(el => {
            const direction = el.dataset.reveal || 'bottom';
            const delay = el.dataset.delay || 0;

            const animations = {
                bottom: { y: 50 },
                top: { y: -50 },
                left: { x: -50 },
                right: { x: 50 },
                scale: { scale: 0.8 }
            };

            gsap.fromTo(el, {
                opacity: 0,
                ...animations[direction]
            }, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 1,
                delay: parseFloat(delay),
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    // فراخوانی تابع
    initReveals();

    // ریست انیمیشن‌ها هنگام رفرش صفحه
    ScrollTrigger.refresh();
});