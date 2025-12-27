import { useEffect, useState } from "react";
import photos from "./data/photos"; // tumhare photos ka path

const TOTAL_PHOTOS = photos.length;
const BACKGROUND_PHOTOS = 60;

export default function Birthday() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');
    const [isPlaying, setIsPlaying] = useState(false);



    // Audio setup
    const audio = new Audio("/src/assets/music/song1.mp3"); // tumhare music ka path
    audio.loop = true;



    const toggleMusic = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection('next');
            setCurrentIndex(prev => (prev + 1) % TOTAL_PHOTOS);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        return () => audio.pause(); // cleanup audio on unmount
    }, []);

    // Teddy bears floating
    useEffect(() => {
        const teddyContainer = document.createElement("div");
        teddyContainer.className = "teddy-bears";
        teddyContainer.style.position = "fixed";
        teddyContainer.style.top = "0";
        teddyContainer.style.left = "0";
        teddyContainer.style.width = "100%";
        teddyContainer.style.height = "100%";
        teddyContainer.style.pointerEvents = "none";
        teddyContainer.style.zIndex = 2;

        const teddyGIFs = [
            "/src/assets/teddy/teddy1.jpeg",
            "/src/assets/teddy/teddygif.webp",
            "/src/assets/teddy/teddy2.gif",
            "/src/assets/teddy/teddy3.gif",
            "/src/assets/teddy/teddy4.gif",
            "/src/assets/teddy/teddy5.gif",
            "/src/assets/teddy/teddy6.gif"
        ];

        for (let i = 0; i < 20; i++) {
            const teddy = document.createElement("img");
            teddy.src = teddyGIFs[Math.floor(Math.random() * teddyGIFs.length)];
            teddy.className = "teddy";
            teddy.style.position = "absolute";
            teddy.style.left = Math.random() * 100 + "%";
            teddy.style.top = Math.random() * 100 + "%";
            teddy.style.width = `${20 + Math.random() * 20}px`;
            teddy.style.animationDelay = Math.random() * 8 + "s";
            teddy.style.animationDuration = (5 + Math.random() * 5) + "s";
            teddyContainer.appendChild(teddy);
        }

        document.body.appendChild(teddyContainer);

        return () => teddyContainer.remove();
    }, []);

    // Stars, particles, hearts, snowflakes
    useEffect(() => {
        // Stars
        const starsContainer = document.getElementById("stars");
        for (let i = 0; i < 80; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.animationDelay = Math.random() * 3 + "s";
            starsContainer.appendChild(star);
        }

        // Floating Particles
        const particlesContainer = document.createElement("div");
        particlesContainer.className = "particles";
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 8 + "s";
            particle.style.animationDuration = (Math.random() * 4 + 6) + "s";
            particlesContainer.appendChild(particle);
        }
        document.body.appendChild(particlesContainer);

        // Floating Hearts
        const heartsContainer = document.createElement("div");
        heartsContainer.className = "floating-hearts";
        for (let i = 0; i < 12; i++) {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.innerHTML = "💕";
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = Math.random() * 4 + "s";
            heart.style.fontSize = (Math.random() * 10 + 12) + "px";
            heartsContainer.appendChild(heart);
        }
        document.body.appendChild(heartsContainer);

        // Snowflakes
        const snowflakesContainer = document.getElementById("snowflakes");
        for (let i = 0; i < 20; i++) {
            const snowflake = document.createElement("div");
            snowflake.className = "snowflake";
            snowflake.innerHTML = "✨";
            snowflake.style.left = Math.random() * 100 + "%";
            snowflake.style.animationDelay = Math.random() * 10 + "s";
            snowflake.style.animationDuration = (Math.random() * 5 + 8) + "s";
            snowflakesContainer.appendChild(snowflake);
        }
    }, []);

    const handlePrevious = () => {
        setDirection('prev');
        setCurrentIndex((currentIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS);
    }

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((currentIndex + 1) % TOTAL_PHOTOS);
    }

    return (


        <div className="wrapper">
            <div className="name-background">
                {Array.from({ length: 50 }).map((_, i) => (
                    <span key={i}>Nutan</span>
                ))}
            </div>

            <div className="background-photos">
                {[...Array(BACKGROUND_PHOTOS)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-photo"
                        style={{
                            left: `${(i * 13) % 100}%`,
                            top: `${(i * 17) % 100}%`,
                            animationDelay: `${(i * 0.3) % 10}s`,
                            animationDuration: `${15 + (i % 10)}s`
                        }}
                    >
                        <img src={photos[i]} alt="" />
                    </div>
                ))}
            </div>

            <div className="stars" id="stars"></div>
            <div className="snowflakes" id="snowflakes"></div>

            <div class="name-background">
                <span>Nutan</span><span>Nutan</span><span>Nutan</span><span>Nutan</span>
                <span>Nutan</span><span>Nutan</span><span>Nutan</span><span>Nutan</span>
                <span>Nutan</span><span>Nutan</span><span>Nutan</span><span>Nutan</span>
                <span>Nutan</span><span>Nutan</span><span>Nutan</span><span>Nutan</span>
            </div>

            <div className="container">
                <div className="photo-gallery">
                    <div className="photo-container">
                        {[-1, 0, 1].map(offset => {
                            const index = (currentIndex + offset + TOTAL_PHOTOS) % TOTAL_PHOTOS;
                            return (
                                <div
                                    key={index}
                                    className={`photo-frame ${offset === 0 ? 'active' : offset === -1 ? 'exit' : 'next'}`}
                                >
                                    <img src={photos[index]} alt={`Memory ${index + 1}`} className="photo-img" />
                                    <div className="photo-border"></div>
                                    <div className="hearts-decoration">
                                        <div className="heart-icon">💖</div>
                                        <div className="heart-icon">💖</div>
                                        <div className="heart-icon">💖</div>
                                        <div className="heart-icon">💖</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="message">Happy Birthday Nutan !!</div>
                <div className="message gradient-text">
                    {"Happy Birthday Nutan !!".split("").map((char, i) => (
                        <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>

                <div className="submessage">Wishing you endless joy & love ❤️</div>

                <div className="controls">
                    <button className="control-btn" onClick={handlePrevious}>← Previous</button>
                    <div className="photo-counter">{currentIndex + 1} / {TOTAL_PHOTOS}</div>
                    <button className="control-btn" onClick={handleNext}>Next →</button>
                    <button className="control-btn" onClick={toggleMusic}>
                        {isPlaying ? "🔊 Stop Music" : "🎵 Play Music"}
                    </button>
                </div>
            </div>
        </div>
    )
}
