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
    const adblocker = true;
    const removePopup = false;
    let currentUrl = window.location.href;
    let isAdFound = false;
    let adLoop = 0;
    let videoPlayback = 1;

    if (adblocker) removeAds();
    if (removePopup) popupRemover();

    function popupRemover() {
        setInterval(() => {
            const modalOverlay = document.querySelector("tp-yt-iron-overlay-backdrop");
            const popup = document.querySelector(".style-scope ytd-enforcement-message-view-model");
            const popupButton = document.getElementById("dismiss-button");
            const video = document.querySelector('video');

            document.body.style.setProperty('overflow-y', 'auto', 'important');

            if (modalOverlay) {
                modalOverlay.removeAttribute("opened");
                modalOverlay.remove();
            }

            if (popup) {
                if (popupButton) popupButton.click();
                popup.remove();
                if (video) video.play();
                setTimeout(() => {
                    if (video) video.play();
                }, 500);
            }
  
            if (video && video.paused) video.play();

        }, 1000);
    }

    function removeAds() {
        setInterval(() => {
            const video = document.querySelector('video');
            const ad = document.querySelector('.ad-showing');

            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removePageAds();
            }

            if (ad) {
                isAdFound = true;
                adLoop++;

                if (adLoop < 10) {
                    const openAdCenterButton = document.querySelector('.ytp-ad-button-icon');
                    openAdCenterButton?.click();

                    const blockAdButton = document.querySelector('[label="Block ad"]');
                    blockAdButton?.click();

                    const blockAdButtonConfirm = document.querySelector('.Eddif [label="CONTINUE"] button');
                    blockAdButtonConfirm?.click();

                    const closeAdCenterButton = document.querySelector('.zBmRhe-Bz112c');
                    closeAdCenterButton?.click();
                }

                const popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
                if (popupContainer && popupContainer.style.display === "") popupContainer.style.display = 'none';

                const skipButtons = [
                    '.ytp-ad-skip-button-container',
                    '.ytp-ad-skip-button-modern',
                    '.videoAdUiSkipButton',
                    '.ytp-ad-skip-button'
                ];

                if (video) {
                    video.playbackRate = 10;
                    video.volume = 0;

                    skipButtons.forEach(selector => {
                    const elements = document.querySelectorAll(selector);
                    elements?.forEach(element => element?.click());
                    });

                    video.play();
                    const randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
                    video.currentTime = video.duration + randomNumber || 0;
                }

            } else {
                if (video && video.playbackRate === 10) video.playbackRate = videoPlayback;
                if (isAdFound) {
                    isAdFound = false;
                    if (videoPlayback === 10) videoPlayback = 1;
                    if (video && isFinite(videoPlayback)) video.playbackRate = videoPlayback;
                    adLoop = 0;
                }
                else if (video) videoPlayback = video.playbackRate;
            }
        }, 50);
        removePageAds();
    }

    function removePageAds() {
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
            ytd-banner-promo-renderer-background,
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

        sponsor?.forEach(element => {
            if (element.getAttribute("id") === "rendering-content") {
                element.childNodes?.forEach(childElement => {
                    if (childElement?.data?.targetId && childElement.data.targetId !== "engagement-panel-macro-markers-description-chapters") element.style.display = 'none';
                });
            }
        });
    }

})();