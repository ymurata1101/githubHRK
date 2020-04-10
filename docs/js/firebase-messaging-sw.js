// �L���b�V���t�@�C���̎w��
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    '/poster-keisuke.github.io/',
];

// �C���X�g�[������
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// ���\�[�X�t�F�b�`���̃L���b�V�����[�h����
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
// Firebase���p����
importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-messaging.js');
firebase.initializeApp({
    'messagingSenderId': '379502638253'
});
const messaging = firebase.messaging();
 
// �t�H�A�O���E���h�ł̃v�b�V���ʒm��M
messaging.onMessage(function(payload) {
    var notificationTitle = payload.data.title; // �^�C�g��
    var notificationOptions = {
      body: payload.data.body, // �{��
      icon: '/pwa_512.png', // �A�C�R��
      click_action: 'https://xxxx.sample.com/' // ��ѐ�URL
    };
 
    if (!("Notification" in window)) {
        // �u���E�U���ʒm�@�\�ɑΉ����Ă��邩�𔻒�
    } else if (Notification.permission === "granted") {
        // �ʒm������Ă�����ʒm����
        var notification = new Notification(notificationTitle,notificationOptions);
    }
});
 
// �o�b�N�O���E���h�ł̃v�b�V���ʒm��M
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = payload.notification.title; // �^�C�g��
    var notificationOptions = {
            body: payload.notification.body, // �{��
            icon: payload.notification.icon, // �A�C�R��
    };
 
    return self.registration.showNotification(notificationTitle,
    notificationOptions);
});