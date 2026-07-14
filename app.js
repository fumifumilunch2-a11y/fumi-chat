// 1. Firebaseの基本機能とリアルタイムデータベース機能を読み込む（CDN形式）
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

// 2. あなたのFirebaseプロジェクトの設定（画面に表示されたものです！）
const firebaseConfig = {
    apiKey: "AIzaSyAQEUonks2_XAY16zkzPanSq4F7QAo3h6Y",
    authDomain: "fumichat-9e489.firebaseapp.com",
    projectId: "fumichat-9e489",
    storageBucket: "fumichat-9e489.firebasestorage.app",
    messagingSenderId: "699411432110",
    appId: "1:699411432110:web:c7e39681d8983b1001a33f",
    // 💡 データを保存するデータベースのURLです
    databaseURL: "https://fumichat-9e489-default-rtdb.firebaseio.com"
};

// 3. Firebaseとデータベースを起動する
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const chatRef = ref(database, 'messages');

// --- ここから下はこれまでのチャットアプリの動作用プログラム ---

const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const themeBtn = document.getElementById('theme-btn');

const myId = Math.random().toString(36).substring(2, 10);

function appendMessage(text, senderId) {
    if (text.trim() === '') return;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (senderId === myId) {
        messageDiv.classList.add('mine');
    } else {
        messageDiv.classList.add('other');
    }

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    bubbleDiv.textContent = text;

    messageDiv.appendChild(bubbleDiv);
    messageContainer.appendChild(messageDiv);

    const chatMain = document.querySelector('.chat-main');
    chatMain.scrollTop = chatMain.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const text = messageInput.value;
    if (text.trim() === '') return;

    push(chatRef, {
        text: text,
        senderId: myId,
        timestamp: Date.now()
    });

    messageInput.value = '';
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    appendMessage(data.text, data.senderId);
});

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});