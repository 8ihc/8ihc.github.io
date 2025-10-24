// YouTube API 初始化
let ytPlayer = null;

function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        events: {
            'onReady': (event) => event.target.setVolume(100)
        }
    });
}

// 平滑音量調整
function fadeVolume(target, duration = 800) {
    if (!ytPlayer || typeof ytPlayer.getVolume !== 'function') return;
    const start = ytPlayer.getVolume();
    const steps = 10;
    let current = 0;
    const interval = setInterval(() => {
        current++;
        const vol = Math.round(start + (target - start) * (current / steps));
        ytPlayer.setVolume(Math.max(0, Math.min(100, vol)));
        if (current >= steps) {
            clearInterval(interval);
            if (target === 0) ytPlayer.mute();
        }
    }, duration / steps);
}

// jQuery 主程序
$(document).ready(function() {
    
    // 漢堡選單切換
    $('#hamburger').on('click', function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        $(this).toggleClass('active');
        $('#navMenu').toggleClass('active');
    });
    
    // 點擊選單連結後關閉選單並平滑滾動
    $('.nav-link[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // 關閉選單
        $('#hamburger').removeClass('active');
        $('#navMenu').removeClass('active');
        
        // 平滑滾動
        if (target && target !== '#') {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 60 // 減去 navbar 高度
            }, 800, 'swing');
        }
    });
    
    // 點擊選單外部關閉選單
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && !$(e.target).closest('.nav-menu').length) {
            $('#hamburger').removeClass('active');
            $('#navMenu').removeClass('active');
        }
    });
    
    // 遙控器點擊事件
    $('#remote').one('click', function() {
        $(this).addClass('clicked');
        setTimeout(() => $(this).removeClass('clicked'), 300);
        
        setTimeout(() => {
            $('#start-screen').addClass('hidden');
            $('#remote').css({ opacity: 0, pointerEvents: 'none' });
            $('#navbar').addClass('visible'); // 顯示導航欄
        }, 300);
        
        setTimeout(() => {
            $('#youtube-container').addClass('visible');
            $('#video-container').css('pointerEvents', 'auto');
            if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
        }, 800);
    });

    // 效果1: 滾動時影片淡出
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                $('#video-container').addClass('fading-out');
                fadeVolume(0, 900);
            } else {
                $('#video-container').removeClass('fading-out');
                fadeVolume(100, 600);
                if (ytPlayer) ytPlayer.unMute();
            }
        });
    }, { threshold: 0.5 });
    
    const scrollVideo = document.getElementById('scroll-video');
    if (scrollVideo) videoObserver.observe(scrollVideo);

    // 效果2: 卡片自動翻轉動畫
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const $card = $(entry.target);
            if (entry.intersectionRatio > 0.5 && !$card.attr('data-animated')) {
                $card.addClass('animating').attr('data-animated', 'true');
                setTimeout(() => $card.removeClass('animating'), 1200);
            }
        });
    }, { threshold: 0.5 });
    
    $('.card').each(function() {
        cardObserver.observe(this);
    });

    // 卡片點擊翻轉
    $('.card').on('click', function() {
        if (!$(this).hasClass('animating')) {
            $(this).toggleClass('flipped');
        }
    }).on('keypress', function(e) {
        if (e.key === 'Enter' && !$(this).hasClass('animating')) {
            $(this).toggleClass('flipped');
        }
    });

    // 效果3: 文字畫底線
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('underlined');
            }
        });
    }, { threshold: 0.5 });
    
    $('.highlight-text').each(function() {
        textObserver.observe(this);
    });
});
