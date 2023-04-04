const tls = gsap.timeline({ defaults: {delay: 3, ease: "power1.out" } });
const tl = gsap.timeline({ defaults: {delay: 2, ease: "power1.out" } });

tl.fromTo(".loading-page-text span", 0.5, { y: 0 }, {      y: -10,
        ease: 'Power0.easeOut',
        yoyo: true,
        yoyoEase: 'Bounce.easeOut',
        repeat: -1,
        repeatDelay: 0.3 });



$(window).on('load', function(){ 

tls.to(".loading-page-text", 0.8, {
        y: 100,
        ease: 'Expo.easeIn'
      }, 0).to(".loading-page-grey", 1, {
        yPercent: 100,
        ease: 'Expo.easeOut'
      }, 0.8).to(".loading-page-white", 1, {
        yPercent: 100,
        ease: 'Expo.easeOut'
      }, 1).to(".loading-page", 1, {
        display:'none'
      }, 1);
});


tl.fromTo(".hero-title h1",{ opacity: 0 }, { opacity: 1,  y: "0%", duration: 1, stagger: 0.25 });

$(document).ready(function() {  
    
    $("html").niceScroll({
    	cursoropacitymax: 0.5,
		autohidemode: false,
        zindex: "999",
       scrollspeed: 300,
        Mousescrollstep : 100,
        Smoothscroll : true
    
    });

});


(function($) { // Begin jQuery
  $(function() { // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); // end DOM ready
})(jQuery); // end jQuery