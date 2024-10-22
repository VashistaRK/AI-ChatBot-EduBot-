const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

const API_KEY = "AIzaSyAyTeI3-Es6ATRgh6AmFearkxHvkiCX1rQ";
const API_URL = ``;//add ur own api

const userData = {
    message : null,
    file:{
        data: null,
        mime_type: null
    }
}

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

//generate bot response using api
const generateBotResponce = async (incomingMessageDiv)  => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    //add user message to chat history
    chatHistory.push({
        role:  "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file}] : [] )]

    });
    //api request options
    const requestOptions = {
        method:  'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({
            contents:chatHistory
        })
    }
    try{
        // fetch bot responce form api
        const  response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        //extract and display bots responce
        const apiResponceText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        messageElement.innerText = apiResponceText;

        //add bot responce to chat history
        chatHistory.push({
            role:  "model",
            parts: [{ text: apiResponceText }]
    
        });
    }catch(error){
        //handle error in api responce
        console.log(error);
        messageElement.innerText=error.message;
        messageElement.style.color = "#ff0000";
    }finally{
        //reset users file data, remove thinking indicators and scroll chat to bottom
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth"});
    }
}

//handle outgoing user messages
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));

    //create and display user message
    const messageContent = `<div class="message-text"></div>
    ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`: ""}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth"});


    //simulating bot response with thinking indicator
    setTimeout(()=>{
        const messageContent = `<svg class="bot-avatar" width = 3rem ; version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 70.09" style="enable-background:new 0 0 122.88 70.09" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M45.63,32.77c3.56,0,6.45,2.89,6.45,6.45c0,3.56-2.89,6.45-6.45,6.45c-3.56,0-6.45-2.89-6.45-6.45 C39.18,35.65,42.07,32.77,45.63,32.77L45.63,32.77z M61.44,7.74c12.62,0,24.19,3.01,32.7,7.87c5.17,2.95,9.31,6.62,12.07,10.81 c1.23,0.11,2.41,0.29,3.52,0.52c0.11,0.02,0.22,0.05,0.32,0.07V12.02c-1.92-1.11-3.22-3.19-3.22-5.58c0-3.56,2.88-6.44,6.44-6.44 c3.56,0,6.44,2.88,6.44,6.44c0,2.38-1.29,4.46-3.22,5.58v17.43c2.55,1.51,4.66,3.64,5.72,6.57c1.82,5.01-0.12,10.84-5.57,14.02 c-2.92,1.7-6.54,2.53-10.98,2.23l0-0.06c-2.75,3.85-6.68,7.24-11.52,10.01c-8.51,4.86-20.08,7.87-32.7,7.87 c-12.62,0-24.19-3.01-32.7-7.87c-4.84-2.76-8.77-6.15-11.52-10.01l0,0.06c-4.44,0.29-8.06-0.53-10.98-2.23 c-5.46-3.18-7.39-9.01-5.57-14.02c1.06-2.93,3.17-5.06,5.72-6.57V12.02C4.46,10.9,3.17,8.82,3.17,6.44C3.17,2.88,6.05,0,9.6,0 c3.56,0,6.44,2.88,6.44,6.44c0,2.38-1.29,4.46-3.22,5.58V27c0.11-0.02,0.22-0.05,0.32-0.07c1.11-0.23,2.28-0.4,3.52-0.52 c2.76-4.19,6.9-7.86,12.07-10.81C37.25,10.75,48.82,7.74,61.44,7.74L61.44,7.74z M86.36,29.31c-6.24-3.56-15.04-5.77-24.92-5.77 c-9.88,0-18.68,2.2-24.92,5.77c-4.89,2.79-7.92,6.22-7.92,9.6c0,3.39,3.03,6.81,7.92,9.6c6.24,3.56,15.04,5.77,24.92,5.77 c9.88,0,18.68-2.2,24.92-5.77c4.89-2.79,7.92-6.22,7.92-9.6C94.28,35.53,91.25,32.11,86.36,29.31L86.36,29.31z M78.62,32.77 c3.56,0,6.45,2.89,6.45,6.45c0,3.56-2.89,6.45-6.45,6.45s-6.45-2.89-6.45-6.45C72.17,35.65,75.06,32.77,78.62,32.77L78.62,32.77z"/></g></svg>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth"});
        generateBotResponce(incomingMessageDiv);
    }, 600);
}

//handle enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if(e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768){
        handleOutgoingMessage(e);
    }
});

//adjust input field height dynamically
messageInput.addEventListener("input", () => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});

//handling file input changes and preview the selected file
fileInput.addEventListener("change",() => {
    const file = fileInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src=e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String =  e.target.result.split(",")[1];

        //store file data in user data
        userData.file = {
            data: base64String,
            mime_type: file.type
        }
        fileInput.value="";
    }

    reader.readAsDataURL(file);
});

//cancel file upload
fileCancelButton.addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});

//initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
    theme: "light",
    skinTonePosition: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const {selectionStart: start,  selectionEnd: end} = messageInput;
        messageInput.setRangeText(emoji.native, start, end ,"end");
        messageInput.focus();
    },
    onClickOutside: (e) => {
        if(e.target.id === "emoji-picker"){
            document.body.classList.toggle("show-emoji-picker");
        }else{
            document.body.classList.remove("show-emoji-picker");
        }
    }
});

document.querySelector(".chat-form").appendChild(picker);

sendMessageButton.addEventListener("click", (e) => handleOutgoingMessage(e))
document.querySelector("#file-upload").addEventListener("click", () => fileInput.click())

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));