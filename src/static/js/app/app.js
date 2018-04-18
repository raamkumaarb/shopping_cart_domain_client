$(document).ready(function() {
  /*$('.page-center').matchHeight({
    target: $('html')
  });

  $(window).resize(function(){
    setTimeout(function(){
      $('.page-center').matchHeight({ remove: true });
      $('.page-center').matchHeight({
        target: $('html')
      });
        $('.resizing-table-container').height($(window).height() - 245)
    },100);
  });*/


// SCROLL
  if (!("ontouchstart" in document.documentElement)) {

   document.documentElement.className += " no-touch";

   var jScrollOptions = {
     autoReinitialise: true,
     autoReinitialiseDelay: 100
   };

   $('.box-typical-body').jScrollPane(jScrollOptions);
   $('.side-menu').jScrollPane(jScrollOptions);
   //$('.side-menu-addl').jScrollPane(jScrollOptions);
   $('.scrollable-block').jScrollPane(jScrollOptions);
 }

 // Header Menu
 //
 $('.site-header-collapsed .dropdown').each(function(){
   var parent = $(this),
     btn = parent.find('.dropdown-toggle');

   btn.click(function(){
     if (parent.hasClass('mobile-opened')) {
       parent.removeClass('mobile-opened');
     } else {
       parent.addClass('mobile-opened');
     }
   });
 });

 $('.dropdown-more').each(function(){
   var parent = $(this),
     more = parent.find('.dropdown-more-caption'),
     classOpen = 'opened';

   more.click(function(){
     if (parent.hasClass(classOpen)) {
       parent.removeClass(classOpen);
     } else {
       parent.addClass(classOpen);
     }
   });
 });

 // Left mobile menu
 $('.hamburger').click(function(){
   if ($('body').hasClass('menu-left-opened')) {
     $(this).removeClass('is-active');
     $('body').removeClass('menu-left-opened');
     $('html').css('overflow','auto');
   } else {
     $(this).addClass('is-active');
     $('body').addClass('menu-left-opened');
     //$('html').css('overflow','hidden');
   }
 });

 $('.mobile-menu-left-overlay').click(function(){
   $('.hamburger').removeClass('is-active');
   $('body').removeClass('menu-left-opened');
   $('html').css('overflow','auto');
 });

 // Right mobile menu
 $('.site-header .burger-right').click(function(){
   if ($('body').hasClass('menu-right-opened')) {
     $('body').removeClass('menu-right-opened');
     $('html').css('overflow','auto');
   } else {
     $('.hamburger').removeClass('is-active');
     $('body').removeClass('menu-left-opened');
     $('body').addClass('menu-right-opened');
    // $('html').css('overflow','hidden');
   }
 });

 $('.mobile-menu-right-overlay').click(function(){
   $('body').removeClass('menu-right-opened');
   $('html').css('overflow','auto');
 });

 // Full Height Header
   function boxFullHeight() {
   var sectionHeader = $('.section-header');
   var sectionHeaderHeight = 0;

   if (sectionHeader.size()) {
     sectionHeaderHeight = parseInt(sectionHeader.height()) + parseInt(sectionHeader.css('padding-bottom'));
   }

   $('.box-typical-full-height').css('min-height',
     $(window).height() -
     parseInt($('.page-content').css('padding-top')) -
     parseInt($('.page-content').css('padding-bottom')) -
     sectionHeaderHeight -
     parseInt($('.box-typical-full-height').css('margin-bottom')) - 2
   );
   $('.box-typical-full-height>.tbl, .box-typical-full-height>.box-typical-center').height(parseInt($('.box-typical-full-height').css('min-height')));
 }

 boxFullHeight();

 $(window).resize(function(){
   boxFullHeight();
 });

})