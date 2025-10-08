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

    // Set up the 3D properties for all images once
    gsap.set("img", {
        transformPerspective: 1000,
        transformOrigin: "center center"
    });

    const tiltElements = document.querySelectorAll("img");
    const maxTilt = 10;

    // Create quickTo functions for each axis and element
    tiltElements.forEach((element) => {
        // Create a quickTo function for rotationX and rotationY
        const xTo = gsap.quickTo(element, "rotationX", { duration: 0.15, ease: "power1.inOut" });
        const yTo = gsap.quickTo(element, "rotationY", { duration: 0.15, ease: "power1.inOut" });

        let moving = false;
        let timeout;

        element.addEventListener("mousemove", (event) => {
            clearTimeout(timeout);
            moving = true;

            const rect = element.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;

            const tiltX = ((elementCenterY - event.clientY) / rect.height) * maxTilt;
            const tiltY = ((event.clientX - elementCenterX) / rect.width) * maxTilt;

            gsap.set(element, { rotationX: tiltX, rotationY: tiltY });

            timeout = setTimeout(() => {
                moving = false;
                gsap.to(element, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power2.out" });
            }, 100);
        });


        // Optional: Reset on mouse leave
        element.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
        });
    });
    //    swiper
    const sections = gsap.utils.toArray("section");

    let scrollTween;

    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onEnter: () => goToSection(i),
            onEnterBack: () => goToSection(i),
        });
    });

    function goToSection(index) {
        scrollTween = gsap.to(window, {
            scrollTo: { y: sections[index], offsetY: 0 },
            duration: 1,
            ease: "power2.inOut",
        });
    }

    // optional animation while changing section
    sections.forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: section,
                start: "top center",
                toggleActions: "play none none reverse",
            },
        });
    });
});