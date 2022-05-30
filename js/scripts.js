// Set the date we're counting down to
var countDownDate = new Date("Jun 19, 2022 07:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("day").innerText = days;
    document.getElementById("hour").innerText = hours;
    document.getElementById("minute").innerText = minutes;
    document.getElementById("second").innerText = seconds;

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("day").innerText = 0;
        document.getElementById("hour").innerText = 0;
        document.getElementById("minute").innerText = 0;
        document.getElementById("second").innerText = 0;
    }
}, 1000);

$(document).ready(function() {

    $('body').addClass('loaded');

    var modalEnvelope = document.getElementById('open-envelope')

    modalEnvelope.addEventListener('shown.bs.modal', function () {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
    });

    modalEnvelope.addEventListener('hide.bs.modal', function () {
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    });

    // window.addEventListener('scroll', () => {
    //     document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    //   });
    
    var current_Url = window.location.href;
    var convert_Url = new URL(current_Url);
    var get_Name = convert_Url.searchParams.get("to");

    document.getElementById("name-to").innerHTML = get_Name;

    AOS.init({
        duration: 2500,
        mirror: false,
        once: true
    });

    document.querySelector("#share-lock").onclick = function() {
        window.open('https://goo.gl/maps/gb87bRu3VJVvBZFZ9', '_blank'); 
    };


    var sound = new Howl({
        src: ['https://www.mboxdrive.com/song.mp3'],
        autoplay: true,
        loop: true,
    });

      sound.play();

    $('#btn-scroll').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
      });

    document.addEventListener("keydown", function(event) {
        var key = event.key || event.keyCode;

        if (key == 123) {
            return false;
        } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
            return false;
        }
    }, false);

    window.oncontextmenu = function() {
        return false;
    };

    document.addEventListener("keydown", function(event) {
        var key = event.key || event.keyCode;

        if (key == 123) {
            return false;
        } else if ((event.ctrlKey && event.shiftKey && key == 73) || (event.ctrlKey && event.shiftKey && key == 74)) {
            return false;
        }
    }, false);

    // Prevent F12      
    $(document).keydown(function(event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }
    });

    //stop copy of content
    function killCopy(e) {
        return false
    }

    function reEnable() {
        return true
    }
    document.onselectstart = new Function("return false")
    if (window.sidebar) {
        document.onmousedown = killCopy
        document.onclick = reEnable
    }

    // prevent ctrl + s
    $(document).bind('keydown', function(e) {
        if (e.ctrlKey && (e.which == 83)) {
            e.preventDefault();
            return false;
        }
    });

    //Render All Companies
    function renderContent(data) {

        if (data.length > 0) {

            const renderAllCompanies = data.map((item) => {

                return (

                    '<div class="msg-wrapper">' +
                    '                <p class="name-sender montserrat bold">' + item.name + '</p>' +
                    '                <p class="msg-sender nunito">' + item.message + '</p>' +
                    '            </div> '

                )

            });

            $("#render-message").html(renderAllCompanies);

        } else {

            $("#render-message").html('<span>No Messages</span>');

        }

    }


    function loadContent() {

        var xhr = new XMLHttpRequest();
        var url = "https://api.npoint.io/8a6b333aff8c78415e1a";

        xhr.open("GET", url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                var data = JSON.parse(this.responseText);
                localStorage.setItem("messagesData", this.responseText);
                renderContent(data.data_messages);

            }
        };

    }

    // function loadRSVP() {

    //     var xhr = new XMLHttpRequest();
    //     var url = "https://api.npoint.io/7b2426d35afbafd228c6";

    //     xhr.open("GET", url, true);
    //     xhr.send();

    //     xhr.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {

    //             var data = JSON.parse(this.responseText);
    //             localStorage.setItem("RSVPData", this.responseText);

    //         }
    //     };

    // }

    var myModalEl = document.getElementById('modal-wishes');
    myModalEl.addEventListener('hidden.bs.modal', function() {
        $("#error-text").html('');
        document.getElementById("form-wishes").reset();
    })

    loadContent();
    // loadRSVP();

    var ModalEnvelope = new bootstrap.Modal(document.getElementById('open-envelope'))
    ModalEnvelope.show()

    //send messages
    var form = document.getElementById('form-wishes');
    document.getElementById("send-messages").addEventListener("click", (e) => {

        if (document.getElementById('floatingInput').value != '' &&
            document.getElementById('floatingTextarea2').value != '') {
            $("#send-messages").addClass("disabled");
            $("#error-text").html('');
            var request = new XMLHttpRequest();
            var formData = new FormData(form);

            var url = "https://api.npoint.io/8a6b333aff8c78415e1a";

            request.open('POST', url, /* async = */ false);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onloadend = function() {
                if (request.status != 200) { // analyze HTTP status of the response
                    alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
                } else { // show the result
                    $("#send-messages").removeClass("disabled");
                    sweetAlert(
                        'Thank you!',
                        'Your wish has been uploaded successfully!',
                        'success'
                    );
                    var data = JSON.parse(this.responseText);
                    form.reset(); //reset form after AJAX success or do something else
                    var myModalEl = document.getElementById('modal-wishes');
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                    renderContent(data.data_messages);

                }
            };

            var latestData = JSON.parse(localStorage.getItem("messagesData"));
            latestData.data_messages.push(Object.fromEntries(formData));
            request.send(JSON.stringify(latestData));
            localStorage.setItem("messagesData", JSON.stringify(latestData));

        } else {

            var myModalEl = document.getElementById('modal-wishes');
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.show();
            $("#error-text").html('* Insert your name and messages');

        }

    });

    //send rsvp
    // var form_rsvp = document.getElementById('form-rsvp');
    // document.getElementById("send-rsvp").addEventListener("click", (e) => {

        
    //     if (document.getElementById('name_input').value != '' &&
    //         document.getElementById('address').value != '') {

    //             $("#send-rsvp").addClass("disabled");
    //         $("#error-text-rsvp").html('');

    //         var request = new XMLHttpRequest();
    //         var formData = new FormData(form_rsvp);

    //         var url = "https://api.npoint.io/7b2426d35afbafd228c6";

    //         request.open('POST', url, /* async = */ false);
    //         request.setRequestHeader('Content-Type', 'application/json');

    //         request.onloadend = function() {
    //             if (request.status != 200) { // analyze HTTP status of the response
    //                 alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
    //             } else { // show the result
    //                 $("#send-rsvp").removeClass("disabled");
    //                 $("#rsvp-box .card-body").html("<span class='card-title italino txt-shadow white'>Thank you for submitting the response!</span>");
    //                 sweetAlert(
    //                     'Thank you!',
    //                     'Your response has been sent successfully!',
    //                     'success'
    //                 );
    //                 form_rsvp.reset(); //reset form after AJAX success or do something else
    //                 var data = JSON.parse(this.responseText);

    //             }
    //         };

    //         var latestData = JSON.parse(localStorage.getItem("RSVPData"));
    //         latestData.data_invitee.push(Object.fromEntries(formData));
    //         request.send(JSON.stringify(latestData));
    //         localStorage.setItem("RSVPData", JSON.stringify(latestData));

    //     } else {

    //         $("#error-text-rsvp").html('* Insert your name and address');

    //     }

    // });

});