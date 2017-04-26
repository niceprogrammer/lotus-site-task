hljs.initHighlightingOnLoad();

var HC_SETTINGS = {
  css: {
    activeClass: 'is-active',
    hiddenClass: 'is-hidden',
    topbarHiddenClass: 'topbar--hidden',
    topbarFixedClass: 'topbar--fixed'
  }
};

$(function() {
  var $window = $(window);
  var $topbar = $('[data-topbar]');
  var topbarHeight = parseInt($topbar.height());

  var bindEffects = function() {
    var scrolled = $window.scrollTop();
    if (scrolled > topbarHeight && scrolled < (topbarHeight * 2)) {
      $topbar.addClass(HC_SETTINGS.css.topbarHiddenClass);
    } else {
      $topbar
        .removeClass(HC_SETTINGS.css.topbarHiddenClass)
        .removeClass(HC_SETTINGS.css.topbarFixedClass);
    }

    if (scrolled > (topbarHeight * 2)) {
      $topbar
        .removeClass(HC_SETTINGS.css.topbarHiddenClass)
        .addClass(HC_SETTINGS.css.topbarFixedClass);
    }
  };

  $window.on('scroll.theme', bindEffects);

  if ($('[data-hero-unit="large"]').length === 0) {
    $('[data-menu]').children('[data-toggle-search]').removeClass('hidden');
  }

  var $searchBarMobile = $('[data-search-mobile]');
  var $closeButton = $('<button />', {
    'class': 'btn btn--default btn--search-topbar-close',
    'data-toggle-search': 'true',
    html: $('<span />', {'class': 'fa fa-close'})
  });

  $searchBarMobile.find('.search-box').append($closeButton);

  $(document).on('click', '[data-toggle-menu]', function() {
    $(this).toggleClass('tcon-transform');
    $('[data-menu]').toggle();
    $topbar.toggleClass('topbar--opened');
  });

  $(document).on('click', '[data-toggle-search]', function() {
    $searchBarMobile.toggleClass('search-box--mobile-active');
  });

  // Social share popups
  $('.share a').click(function(e) {
    e.preventDefault();
    window.open(this.href, '', 'height = 500, width = 500');
  });

  // Toggle the share dropdown in communities
  $('.share-label').on('click', function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute('aria-selected') == 'true';
    this.setAttribute('aria-selected', !isSelected);
    $('.share-label').not(this).attr('aria-selected', 'false');
  });

  $(document).on('click', function() {
    $('.share-label').attr('aria-selected', 'false');
  });

  // Submit search on select change
  $('#request-status-select, #request-organization-select')
    .on('change', function() {
      search();
    });

  // Submit search on input enter
  $('#quick-search').on('keypress', function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $('#quick-search').val(),
      status: $('#request-status-select').val(),
      organization_id: $('#request-organization-select').val()
    });
  }

  $('.image-with-lightbox').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.image-with-video-icon').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.accordion__item-title').on('click', function() {
    var $title = $(this);
    $title.toggleClass('accordion__item-title--active');
    $title
      .parents('.accordion__item')
      .find('.accordion__item-content')
      .slideToggle();
  });

  $('.tabs-link').click(function (e) {
    e.preventDefault();
    var $link = $(this);
    var tabIndex = $link.index();
    var $tab = $link.parents('.tabs').find('.tab').eq(tabIndex);
    $link
      .addClass(HC_SETTINGS.css.activeClass)
      .siblings()
      .removeClass(HC_SETTINGS.css.activeClass);
    $tab
      .removeClass(HC_SETTINGS.css.hiddenClass)
      .siblings('.tab')
      .addClass(HC_SETTINGS.css.hiddenClass);
  });

  // Fix animated icons
  $('.fa-spin').empty();
  $('[data-asynchtml-resource]').removeAttr('data-asynchtml-resource');
});

