window.addEventListener("DOMContentLoaded", () => {
    mixitup('#grid');
    gsap.registerPlugin(ScrollTrigger);
    // document.addEventListener('mousemove', e => {
    //     gsap.to('#cursor', { x: e.clientX - 15, y: e.clientY - 15, duration: .2 });
    // });
    const cursor = document.querySelector("#cursor");

    const moveX = gsap.quickTo(cursor, "x", {
        duration: 0.3,
        ease: "power3"
    });

    const moveY = gsap.quickTo(cursor, "y", {
        duration: 0.3,
        ease: "power3"
    });

    window.addEventListener("mousemove", (e) => {
        moveX(e.clientX - 15);
        moveY(e.clientY - 15);
    });
    document.querySelectorAll('.scale-it').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to('#cursor', { scale: 2, duration: 0.3 });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to('#cursor', { scale: 1, duration: 0.3 });
        });
    });
    document.querySelectorAll('.scale-it').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, {
                color: '#ecfd00', // Blue
                duration: 0.3,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                color: '#ffffff', // Back to original
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    gsap.from(".hero-title", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });
    gsap.from(".hero-image-wrapper", {
        x: 150,
        opacity: 0,
        duration: 1.4,
        delay: .3,
        ease: "power4.out"
    });
    gsap.from(".about-title", {
        x: 150,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%", // Start when the top of the element reaches 80% of the viewport
            toggleActions: "play reverse play reverse",
            // markers: true // Uncomment for debugging
        }
    });
    gsap.from(".animated-content", {
        y: 100,          // Starts 100px below its final position
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".animated-content",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            // markers: true
        }
    });
    gsap.from(".animation-content", {
        y: 100,          // Starts 100px below its final position
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".animation-content",
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true
        }
    });
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    const overlay = document.getElementById("overlay");
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");
    let isOpen = false;

    menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        if (isOpen) {
            menu.classList.remove("translate-x-full");
            overlay.classList.remove("opacity-0", "invisible");
            line1.style.transform = "translate(-50%,8px) rotate(45deg)";
            line2.style.opacity = "0";
            line3.style.transform = "translate(-50%,-8px) rotate(-45deg)";
        } else {
            menu.classList.add("translate-x-full");
            overlay.classList.add("opacity-0", "invisible");
            line1.style.transform = "translateX(-50%)";
            line2.style.opacity = "1";
            line3.style.transform = "translateX(-50%)";
        }
    });

    overlay.addEventListener("click", () => menuBtn.click());

    gsap.utils.toArray(".typing").forEach((element) => {

        const word = element.textContent;
        element.textContent = "";

        let charIndex = 0;
        let deleting = false;

        function type() {

            if (!deleting) {
                element.textContent = word.substring(0, charIndex++);

                if (charIndex > word.length) {
                    deleting = true;
                    setTimeout(type, 20);
                    return;
                }

            } else {

                element.textContent = word.substring(0, charIndex--);

                if (charIndex < 0) {
                    deleting = false;
                }

            }

            setTimeout(type, deleting ? 10 : 20);
        }

        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            once: true,
            onEnter: type
        });

    });
    gsap.utils.toArray(".typing-slow").forEach((element) => {

        const word = element.textContent;
        element.textContent = "";

        let charIndex = 0;
        let deleting = false;

        function type() {

            if (!deleting) {
                element.textContent = word.substring(0, charIndex++);

                if (charIndex > word.length) {
                    deleting = true;
                    setTimeout(type, 200);
                    return;
                }

            } else {

                element.textContent = word.substring(0, charIndex--);

                if (charIndex < 0) {
                    deleting = false;
                }

            }

            setTimeout(type, deleting ? 50 : 100);
        }

        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            once: true,
            onEnter: type
        });

    });
})
