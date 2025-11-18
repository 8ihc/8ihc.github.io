(function($){
  $(function(){
    // 1) IntersectionObserver to play/pause chapter videos when visible
    var observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var video = entry.target.querySelector('video.bg-video');
        if(!video) return;
        if(entry.isIntersecting){
          var p = video.play();
          if(p && p.catch){ p.catch(function(){}); }
        } else {
          try{ video.pause(); } catch(e){}
        }
      });
    }, observerOptions);

    // observe each chapter
    document.querySelectorAll('.chapter').forEach(function(el){ io.observe(el); });

    // 3) Parallax-like subtle movement for .text-box within each chapter
    var $window = $(window);
    var ticking = false;
    var $boxes = $('.chapter .text-box');

    function updateParallax(){
      var winH = window.innerHeight || document.documentElement.clientHeight;
      var scrollTop = $window.scrollTop();

      $boxes.each(function(){
        var $box = $(this);
        var $section = $box.closest('.chapter');
        var rect = $section[0].getBoundingClientRect();
        var sectionTop = $section.offset().top;
        
        // 計算使用者在這個 chapter 內捲動了多少距離
        var scrolledInSection = scrollTop - sectionTop;
        
        // 當使用者在 chapter 內捲動超過 50% 視窗高度時，顯示 text-box
        if(scrolledInSection > winH * 0.5){ // 50% 視窗高度後顯示
          $box.addClass('visible');
        } else {
          $box.removeClass('visible');
        }
        
        // compute progress from -sectionHeight .. viewportHeight
        var progress = (rect.top) / winH;
        // set small translate based on progress
        var offset = progress * 30; // px, adjust for more/less parallax
        $box.css('transform', 'translateY(' + (offset) + 'px)');
      });
      ticking = false;
    }

    $window.on('scroll resize', function(){
      if(!ticking){
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });

    // initial update
    updateParallax();

    // 4) Ensure wall videos stay muted to allow autoplay and reduce CPU
    $('.wall-video').prop('muted', true).each(function(){
      // remove controls for cleaner thumbnail look
      this.controls = false;
    });

  });
})(jQuery);
