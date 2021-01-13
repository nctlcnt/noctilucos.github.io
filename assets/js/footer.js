$(function () {
    $('#footerSubscribe').keydown(function (e) {
        if (e.keyCode === 13) {
            subscribe()

        }
    })
    $('#btnFooterSubscribe').click(function () {
        subscribe()
    })
    $('#toTop').click(function () {
        window.scrollTo(0, 0)
    })
    $(window).scroll(function () {
        if (window.scrollY > 0) {
            $('#toTop').show()
        } else {
            $('#toTop').hide()
        }
    })
    document.querySelector('.timePeriod').innerHTML = '2003–' + new Date().getFullYear()
})

function subscribe() {
    $.ajax({
        type: 'POST',
        url: WebRoot + '/SubscribeNewsletter.ashx',
        data: {
            Email: $('#footerSubscribe').val()
        },
        success: function (res) {
            alert("Subscribed. Thank you!");
        }
    })
}