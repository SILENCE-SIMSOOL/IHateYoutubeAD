/*
 IHateYoutubeAD - 1.0.0 (Extension Plugin)
   - Author: SimSool
   - License: MIT
        Copyright (c) 2025 SimSool

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
   - Description: Escape the clutter of YouTube ads!
*/

(function() {
    let loopAD = 0;
    let isAdFound = false;
    let currentUrl = window.location.href;

    iHateYoutubeAD();

    function iHateYoutubeAD() {
        var videoPlayback = 1;

        setInterval(() =>{
            var video = document.querySelector('video');
            const ad = [...document.querySelectorAll('.ad-showing')][0];

            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removePageAD();
            }

            if (ad) {
                isAdFound = true;
                loopAD = loopAD + 1;

                if(loopAD < 10){
                    const a = document.querySelector('.ytp-ad-button-icon');
                    a?.click();

                    const b = document.querySelector('[label="Block ad"]');
                    b?.click();

                    const c = document.querySelector('.Eddif [label="CONTINUE"] button');
                    c?.click();

                    const d = document.querySelector('.zBmRhe-Bz112c');
                    d?.click();
                }
                else if (video) video.play();

            var popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
            if (popupContainer && popupContainer.style.display == "") popupContainer.style.display = 'none';

            const skipButtons = [
                'ytp-ad-skip-button-container',
                'ytp-ad-skip-button-modern',
                '.videoAdUiSkipButton',
                '.ytp-ad-skip-button',
                '.ytp-ad-skip-button-modern',
                '.ytp-ad-skip-button',
                '.ytp-ad-skip-button-slot'
            ];

            if (video) {
                video.playbackRate = 10;
                video.volume = 0;
                skipButtons.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    if (elements && elements.length > 0) {
                        elements.forEach(element => {
                            element?.click();
                        });
                    }
                });
                video.play();
                let randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
                video.currentTime = video.duration + randomNumber || 0;
            }

            } else {
                if (video && video?.playbackRate == 10) video.playbackRate = videoPlayback;
                if (isAdFound) {
                    isAdFound = false;
                    if (videoPlayback == 10) videoPlayback = 1;
                    if(video && isFinite(videoPlayback)) video.playbackRate = videoPlayback;
                    loopAD = 0;
                }
                else if(video) videoPlayback = video.playbackRate;
            }
        }, 50)
        removePageAD();
    }

    function removePageAD(){
        const sponsor = document.querySelectorAll("div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy");
        const style = document.createElement('style');

        style.textContent = `
            ytd-action-companion-ad-renderer,
            ytd-display-ad-renderer,
            ytd-video-masthead-ad-advertiser-info-renderer,
            ytd-video-masthead-ad-primary-video-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-ad-slot-renderer,
            yt-about-this-ad-renderer,
            yt-mealbar-promo-renderer,
            ytd-statement-banner-renderer,
            ytd-ad-slot-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-banner-promo-renderer-background
            statement-banner-style-type-compact,
            .ytd-video-masthead-ad-v3-renderer,
            div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
            div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
            div#main-container.style-scope.ytd-promoted-video-renderer,
            div#player-ads.style-scope.ytd-watch-flexy,
            ad-slot-renderer,
            ytm-promoted-sparkles-web-renderer,
            masthead-ad,
            tp-yt-iron-overlay-backdrop,

            #masthead-ad {
                display: none !important;
            }
        `;

        document.head.appendChild(style);

        sponsor?.forEach((element) => {
            if (element.getAttribute("id") === "rendering-content") {
                element.childNodes?.forEach((childElement) => {
                    if (childElement?.data.targetId && childElement?.data.targetId !=="engagement-panel-macro-markers-description-chapters"){
                        element.style.display = 'none';
                    }
                });
            }
        });
    }

})();
