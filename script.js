document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            mobileNav.classList.toggle('flex');
        });

        // Close mobile menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('flex');
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Drag and Drop Functionality
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');

    if (dropzone && fileInput) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight dropzone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, unhighlight, false);
        });

        // Handle dropped files
        dropzone.addEventListener('drop', handleDrop, false);
        
        // Handle selected files via click
        fileInput.addEventListener('change', handleFilesSelected);
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropzone.classList.add('dragover');
    }

    function unhighlight(e) {
        dropzone.classList.remove('dragover');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
        // Sync files to input
        fileInput.files = files;
    }

    function handleFilesSelected(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        fileList.innerHTML = ''; // Clear current list
        
        if (files.length === 0) return;

        const fileArray = [...files];
        fileArray.forEach(file => {
            const li = document.createElement('li');
            li.className = 'flex items-center gap-2 text-sm text-gray-300 bg-surface p-2 rounded-lg border border-borderWhite';
            
            // File icon based on type
            let iconSvg = `<svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
            if (file.type.startsWith('image/')) {
                iconSvg = `<svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;
            }

            li.innerHTML = `
                ${iconSvg}
                <span class="truncate flex-grow">${file.name}</span>
                <span class="text-xs text-textMuted shrink-0">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            `;
            fileList.appendChild(li);
        });
    }

    // 4. Form Submission Simulation
    const form = document.getElementById('contribution-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Enviando...`;
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                form.reset();
                fileList.innerHTML = '';
                btn.innerHTML = `Contribuição Enviada! <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`;
                btn.classList.add('bg-green-600');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.classList.remove('bg-green-600');
                }, 3000);
            }, 1500);
        });
    }

    // 5. Swiper Carousel Initialization
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            initialSlide: 1,
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
            },
            keyboard: {
                enabled: true,
            },
        });

        const heroBgSwiper = new Swiper(".heroBgSwiper", {
            effect: "fade",
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            loop: true,
            allowTouchMove: false,
            speed: 3000, // Very slow, elegant crossfade
        });
    }

    // 6. Music Player Logic
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const musicPanel = document.getElementById('music-panel');
    const audio = document.getElementById('main-audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const trackName = document.getElementById('current-track-name');
    const playlistContainer = document.getElementById('playlist');
    const musicIndicator = document.getElementById('music-indicator');

    if (musicToggleBtn && audio) {
        const tracks = [
            { name: "A Ferida das Águas", src: "assets/musicas/A_Ferida_das_Águas.mp3" },
            { name: "Entre o Rio e a Fibra", src: "assets/musicas/Entre_o_Rio_e_a_Fibra.mp3" },
            { name: "O ferro mordeu o barro", src: "assets/musicas/O_ferro_mordeu_o_barro.mp3" },
            { name: "O verso fino da rede", src: "assets/musicas/O_verso_fino_da_rede.mp3" }
        ];

        let currentTrackIndex = 0;
        let isPlaying = false;
        let isPanelOpen = false;

        function loadPlaylist() {
            playlistContainer.innerHTML = '';
            tracks.forEach((track, index) => {
                const item = document.createElement('div');
                item.className = `p-2 rounded-lg cursor-pointer transition-colors text-textMuted hover:bg-surfaceLight hover:text-textMain ${index === currentTrackIndex ? 'bg-surfaceLight text-primary font-bold' : ''}`;
                item.innerText = `${index + 1}. ${track.name}`;
                item.onclick = () => {
                    currentTrackIndex = index;
                    loadTrack();
                    playTrack();
                };
                playlistContainer.appendChild(item);
            });
        }

        function loadTrack() {
            audio.src = tracks[currentTrackIndex].src;
            trackName.innerText = tracks[currentTrackIndex].name;
            loadPlaylist();
        }

        function playTrack() {
            audio.play().then(() => {
                isPlaying = true;
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
                musicIndicator.classList.remove('hidden');
            }).catch(e => console.error("Audio playback failed:", e));
        }

        function pauseTrack() {
            audio.pause();
            isPlaying = false;
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            musicIndicator.classList.add('hidden');
        }

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        });

        prevBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
            loadTrack();
            playTrack();
        });

        nextBtn.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            loadTrack();
            playTrack();
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
            }
        });

        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            audio.currentTime = (clickX / width) * duration;
        });

        audio.addEventListener('ended', () => {
            nextBtn.click();
        });

        musicToggleBtn.addEventListener('click', () => {
            isPanelOpen = !isPanelOpen;
            if (isPanelOpen) {
                musicPanel.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none', 'scale-95');
            } else {
                musicPanel.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none', 'scale-95');
            }
        });

        loadTrack();
    }
});
