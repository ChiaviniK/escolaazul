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

    // 7. Google News Fetcher (rss2json)
    const newsContainer = document.getElementById('news-container');
    const newsLoader = document.getElementById('news-loader');

    if (newsContainer && newsLoader) {
        // Query Google News via rss2json API
        const rssUrl = "https://news.google.com/rss/search?q=valo+grande+iguape&hl=pt-BR&gl=BR&ceid=BR:pt-419";
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    newsLoader.remove();
                    
                    // Take only top 6 news
                    const topNews = data.items.slice(0, 6);
                    
                    topNews.forEach(item => {
                        const pubDate = new Date(item.pubDate).toLocaleDateString('pt-BR');
                        
                        // Clean up title (Google News sometimes appends source name at the end separated by " - ")
                        let cleanTitle = item.title;
                        const lastDash = cleanTitle.lastIndexOf(" - ");
                        let source = "Google News";
                        if (lastDash > 0) {
                            source = cleanTitle.substring(lastDash + 3);
                            cleanTitle = cleanTitle.substring(0, lastDash);
                        }

                        const card = document.createElement('a');
                        card.href = item.link;
                        card.target = '_blank';
                        card.className = "group glass-panel p-6 rounded-2xl border border-borderWhite hover:border-primary/50 transition-all flex flex-col justify-between h-full hover:shadow-lg hover:-translate-y-1 bg-surface/50";
                        
                        card.innerHTML = `
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    <span class="text-xs font-semibold text-primary uppercase tracking-wider">${source}</span>
                                </div>
                                <h4 class="text-lg font-bold text-textMain mb-3 group-hover:text-primary transition-colors line-clamp-3">${cleanTitle}</h4>
                            </div>
                            <div class="mt-4 pt-4 border-t border-borderWhite flex justify-between items-center text-xs text-textMuted">
                                <span>${pubDate}</span>
                                <span class="font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Ler mais <span aria-hidden="true">&rarr;</span>
                                </span>
                            </div>
                        `;
                        newsContainer.appendChild(card);
                    });
                } else {
                    newsLoader.innerHTML = "<p>Nenhuma notícia encontrada no momento.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching news:", error);
                newsLoader.innerHTML = "<p>Não foi possível carregar as notícias. Tente novamente mais tarde.</p>";
            });
    }

    // 8. Lightbox Modal Logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightboxModal && lightboxImg) {
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const src = trigger.getAttribute('data-src') || trigger.querySelector('img')?.src;
                const title = trigger.getAttribute('data-title') || trigger.querySelector('h4')?.innerText || '';
                const desc = trigger.getAttribute('data-desc') || trigger.querySelector('p')?.innerText || '';

                if (src) {
                    lightboxImg.src = src;
                    lightboxTitle.innerText = title;
                    lightboxDesc.innerText = desc;
                    lightboxModal.classList.remove('hidden');
                    lightboxModal.classList.add('flex', 'active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeLightbox() {
            lightboxModal.classList.add('hidden');
            lightboxModal.classList.remove('flex', 'active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }
});

