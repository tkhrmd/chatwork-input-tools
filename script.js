(function(global) {
    'use strict';

    // Toリストの高さを2倍にする
    var _cwLTList = document.getElementById('_toList').getElementsByClassName('_cwLTList')[0];
    var height = parseInt(_cwLTList.style.getPropertyValue('height')) * 2 + 'px';
    _cwLTList.style.setProperty('max-height', height);
    _cwLTList.style.setProperty('height', height);

    // 拡張ボタン
    var buttons = [{
        html: '<li role="button" class="_showDescription" aria-label="info：選択したメッセージをinfoタグで囲みます"><span class="tag">info</span></li>',
        handler: encloseHandler('[info]', '[/info]'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="title：選択したメッセージをtitleタグで囲みます"><span class="tag">title</span></li>',
        handler: encloseHandler('[title]', '[/title]'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="code：選択したメッセージをcodeタグで囲みます"><span class="tag">code</span></li>',
        handler: encloseHandler('[code]', '[/code]'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="hr：メッセージにhrタグを挿入します"><span class="tag">hr</span></li>',
        handler: insertHandler('[hr]'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="bow：メッセージにおじぎエモーティコンを挿入します"><span class="emo">bow</span></li>',
        handler: insertHandler('(bow)'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="roger：メッセージに了解！エモーティコンを挿入します"><span class="emo">roger</span></li>',
        handler: insertHandler('(roger)'),
    }, {
        html: '<li role="button" class="_showDescription" aria-label="roger：メッセージにクラッカーエモーティコンを挿入します"><span class="emo">cracker</span></li>',
        handler: insertHandler('(cracker)'),
    }];

    // テキストエリア
    var _chatText = document.getElementById('_chatText');

    // ボタンリスト
    var _chatSendTool = document.getElementById('_chatSendTool');

    // 拡張ボタンリスト
    var _chatSendToolExtension = createElement('<ul id="_chatSendToolExtension"></ul>');

    // 拡張ボタンを生成してDOMに反映
    for (var i = 0; i < buttons.length; i += 1) {
        var elm = createElement(buttons[i].html);
        elm.addEventListener('click', buttons[i].handler);
        _chatSendToolExtension.appendChild(elm);
    }
    _chatSendTool.appendChild(_chatSendToolExtension);

    // HTMLからDOMを生成する
    function createElement(html) {
        var dummy = document.createElement('div');
        dummy.insertAdjacentHTML('beforeEnd', html);
        return dummy.children[0];
    }

    // タグで文字を囲むハンドラー
    function encloseHandler(tagOpen, tagClose) {
        return function(e) {
            enclose(tagOpen, tagClose);
        };
    }

    // タグで文字を囲む
    function enclose(tagOpen, tagClose) {
        _chatText.focus();
        var text = _chatText.value;
        var selectionStart = _chatText.selectionStart;
        var selectionEnd = _chatText.selectionEnd;
        var caret = selectionEnd;
        caret += selectionStart == selectionEnd ? tagOpen.length : tagOpen.length + tagClose.length;
        _chatText.value =
            text.substr(0, selectionStart) +
            tagOpen +
            text.substr(selectionStart, selectionEnd - selectionStart) +
            tagClose +
            text.substr(selectionEnd, text.length);
        _chatText.setSelectionRange(caret, caret);
    }

    // タグを挿入するハンドラー
    function insertHandler(tag) {
        return function(e) {
            insert(tag);
        };
    }

    // タグを挿入する
    function insert(tag) {
        _chatText.focus();
        var text = _chatText.value;
        var selectionStart = _chatText.selectionStart;
        var caret = selectionStart + tag.length;
        _chatText.value =
            text.substr(0, selectionStart) +
            tag +
            text.substr(selectionStart, text.length);
        _chatText.setSelectionRange(caret, caret);
    }
})(this);
