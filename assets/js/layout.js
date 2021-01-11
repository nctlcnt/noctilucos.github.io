$(document).ready(function(){
    init()

    $(window).resize(function() {
        init()
        realFunc()
        getCarouselConfig()
    })

    // carousel
    var carouselControl = 0
    var step = 0
    var currentPage = 0
    var max = 6
    getCarouselConfig()

    $('.prev-icon').on('click', function(e){
        currentPage--
        if(currentPage < 0) {
            currentPage = 0
            return
        }
        carouselControl -= step
        $('.next-icon').removeClass('disabled')
        $('.carousel-wrapper ul').css('transform', 'translateX(-'+ carouselControl +'px)')
        if(currentPage <= 0) {
            $('.prev-icon').addClass('disabled')
        }
    })

    $('.next-icon').on('click', function(e){
        currentPage++
        if(currentPage > max) {
            currentPage = max
            return
        }

        carouselControl += step
        $('.carousel-wrapper ul').css('transform', 'translateX(-'+ carouselControl +'px)')
        $('.prev-icon').removeClass('disabled')
        if(currentPage >= max) {
            $('.next-icon').addClass('disabled')
        }
    })

    function getCarouselConfig(){
        carouselControl = 0
        currentPage = 0
        $('.carousel-wrapper ul').css('transform', 'translateX(-'+ carouselControl +'px)')
        $('.prev-icon').addClass('disabled')
        $('.next-icon').removeClass('disabled')

        step = $('.carousel-wrapper li').width() + 20
        if($(window).width() >= 1200) {
            max = 6
        }
        if($(window).width() < 1200) {
            max = 7
        }
        if($(window).width() < 737) {
            max = 8
        }
    }

    window.addEventListener('scroll', realFunc);

    function init() {
        var menuHeight = $('#overall-header').height() + $('.subHeadWrapper').height()
        $('#sideBarCnt').css({'width': $('.sideBar').width() + 'px'})
        $('.container .head').css({'width': $('.docContainer').width() + 'px'})
        $('#fullTreeMenuListContainer').css({'height': 'calc(100vh - '+(menuHeight + 115) +'px);'})
        $('.rightSideMenu').css({'height': 'calc(100vh - '+(menuHeight + 115)+'px);'})
        if ($('.docContainer').height() + menuHeight >= document.body.clientHeight) {
            $('.history').addClass('history-fixed')
            $('#footerWrapper').css({'margin-top': '48px'})
        }
    }

    function realFunc() {
        if (breakpoint() == 'lg') {
            var menuHeight = $('#overall-header').height() + $('.subHeadWrapper').height()
            var sd = $(window).scrollTop();
            var dcHeight = $('.docContainer').height() + menuHeight - sd
            var clientHeight = document.body.clientHeight
            if (sd >= $('#overall-header').height()) {
                // head and sidebar fixed
                $('.subHeadWrapper').css({'top': '0px'})
                $('#docHead').css({'top': ($('.subHeadWrapper').height() + 1) + 'px'})
                $('.sideBar').css({'padding-top': '0px'})
                $('.sideBar #sideBarCnt').addClass('sidebar-fixed')
                $('.rightSideMenu').addClass('rsm-fixed')
                if (dcHeight + 48 > clientHeight) {
                    // history fixed
                    $('.history').addClass('history-fixed')
                    $('#footerWrapper').css({'margin-top': '48px'})
                } else {
                    $('.history').removeClass('history-fixed')
                    $('#footerWrapper').css({'margin-top': '0px'})
                }
            } else {
                // head and sidebar fixed
                $('.subHeadWrapper').css({'top': ($('#overall-header').height()-sd) + 'px'})
                $('#docHead').css({'top': (menuHeight-sd)+1 + 'px'})
                $('.sideBar').css({'padding-top': $('.subHeadWrapper').height() + 'px'})
                $('.sideBar #sideBarCnt').removeClass('sidebar-fixed')
                $('.rightSideMenu').removeClass('rsm-fixed')

                // history fixed
                if (sd < $('#overall-header').height() && dcHeight + 48 > clientHeight) {
                    if (!$('.history').hasClass('history-fixed')) {
                        $('.history').addClass('history-fixed')
                        $('#footerWrapper').css({'margin-top': '48px'})
                    }
                } else {
                    $('.history').removeClass('history-fixed')
                    $('#footerWrapper').css({'margin-top': '0px'})
                }
            }
        } else {
            $('.subHeadWrapper').css({'top': 'unset'})
            $('#docHead').css({'top': 'unset'})
            $('.sideBar').css({'padding-top': '20px'})
        }
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        console.log(scrollTop)
        if (document.documentElement.clientWidth >= 1680) {
            if (scrollTop >= 400 && scrollTop <= 5899) {
                $('.pageMenuList').css("position", 'fixed');
                $('.pageMenuList').css("top", '130px');
            } else {
                $('.pageMenuList').css("position", 'absolute');
                $('.pageMenuList').css("top", '0');
            }
        }else if (document.documentElement.clientWidth >= 1200){
            if (scrollTop >= 360 && scrollTop <= 4584) {
                $('.pageMenuList').css("position", 'fixed');
                $('.pageMenuList').css("top", '100px');
            } else {
                $('.pageMenuList').css("position", 'absolute');
                $('.pageMenuList').css("top", '0');
            }
        }else {
            if (scrollTop >= 360 && scrollTop <= 4300) {
                $('.pageMenuList').css("position", 'fixed');
                $('.pageMenuList').css("top", '100px');
            } else {
                $('.pageMenuList').css("position", 'absolute');
                $('.pageMenuList').css("top", '0');
            }
        }
    }

    $('.sideBarIcon').click(function() {
        $(".sideBar").toggleClass('hide-sm');
        $(".sideBar").toggleClass('hide-xs');
        setTimeout(function() {
            $('#sideBarCnt').css({'width': $('.sideBar').width() + 'px'})
        }, 100)
    })

    $(document).click(function(){
        $('.otherVersions').hide()
        $('.fullVersionInfo').hide()
    })

    $('.changeBtn').on('click', function(e) {
        $('.otherVersions').toggle()
        stopPropagation(e);
    })

    $('.fvChange').on('click', function(e) {
        $('.fullVersionInfo').toggle()
        stopPropagation(e);
    })
})
