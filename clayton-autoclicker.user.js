// ==UserScript==
// @name         Clayton Autoclicker for Stack Game
// @version      1.1
// @author       mudachyo
// @match        https://tonclayton.fun/*
// @grant        none
// @icon         https://mudachyo.codes/clayton/logo.jpg
// @downloadURL  https://github.com/mudachyo/Clayton/raw/main/clayton-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/Clayton/raw/main/clayton-autoclicker.user.js
// @homepage     https://github.com/mudachyo/Clayton
// ==/UserScript==

(function() {
    'use strict';

    // Симуляция события
    function simulateEvent(element, eventType, eventData) {
        const event = new PointerEvent(eventType, {
            isTrusted: true,
            bubbles: true,
            cancelable: true,
            pointerId: eventData.pointerId || 1,
            width: eventData.width || 1,
            height: eventData.height || 1,
            pressure: eventData.pressure || 0.5,
            clientX: eventData.clientX || 0,
            clientY: eventData.clientY || 0,
            screenX: eventData.screenX || 0,
            screenY: eventData.screenY || 0,
        });
        element.dispatchEvent(event);
    }

    // Симуляция клика
    function simulateMouseClickOnCanvas() {
        const canvas = document.querySelector('canvas[data-engine="three.js r166"]');
        const gameSessionDiv = document.querySelector('div.go4109123758');
        
        if (canvas && !gameSessionDiv) {
            const eventData = {
                screenX: 396,
                screenY: 640,
                clientX: 227,
                clientY: 434,
                pressure: 0.5,
                pointerId: 1
            };

            simulateEvent(canvas, 'pointerdown', eventData);
            simulateEvent(canvas, 'mousedown', eventData);

            simulateEvent(canvas, 'pointermove', eventData);
            simulateEvent(canvas, 'mousemove', eventData);

            simulateEvent(canvas, 'pointerup', { ...eventData, pressure: 0 });
            simulateEvent(canvas, 'mouseup', { ...eventData, pressure: 0 });

            simulateEvent(canvas, 'click', { ...eventData, pressure: 0 });
        } else if (gameSessionDiv) {
            console.log('Автоматический кликер взял паузу на 2-3 минуты из-за активной игровой сессии');
            clearInterval(autoClickerInterval);
            setTimeout(() => {
                autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));
            }, getRandomDelay(120000, 180000));
        }
    }

    // Клик на кнопку Collect или Start Farming
    function clickCollectOrStartButton() {
        const buttons = document.querySelectorAll('#content > div > div > div > div.home-wrapper.enter > div.content-wrapper > div.farm-wrapper > button');
        buttons.forEach(button => {
            if (button.textContent.includes('Collect') || button.textContent.includes('Start Farming') || button.textContent.includes('Забрать') || button.textContent.includes('Начать фарм')) {
                button.click();
            }
        });
    }

    setInterval(clickCollectOrStartButton, 3000);

    // Случайная задержка
    function getRandomDelay(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Интервал для автоматического клика
    let autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));
})();
