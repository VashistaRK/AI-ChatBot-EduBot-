## Overview

This project is a web-based chatbot application that allows users to communicate with a chatbot interface. The chatbot is powered by the **Google Generative Language API**, enabling it to generate responses based on user inputs. The application also includes a file upload feature, emoji support, and responsive UI components for an enhanced user experience.

## Features

- **Message Handling**: Users can send messages via a chat input, and the chatbot will respond using AI-generated content.
- **File Upload**: Users can attach image files to their messages, and these files are displayed in the chat history.
- **Emoji Picker**: A custom emoji picker is integrated into the chat input, allowing users to add emojis to their messages.
- **Responsive Design**: The application is designed to work smoothly across different screen sizes.
- **Typing Indicator**: The chatbot shows a "thinking" animation while it processes the user's message.
- **API Integration**: Uses **Google Generative Language API** for AI responses.

## Technologies Used

- **JavaScript**: Core logic for message handling, file uploads, API integration, and user interaction.
- **HTML/CSS**: Structure and styling of the chatbot UI.
- **Google Generative Language API**: Provides chatbot responses via AI.
- **Emoji Mart**: For handling the emoji picker interface.
- **FileReader API**: To preview the uploaded image files before they are sent.
  
## API Key

The chatbot uses the Google Generative Language API. To enable chatbot responses, you need to provide an API key. Replace the `API_KEY` in the script with your valid Google API key.

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

## File Structure

```
/chatbot-application
│
├── /css
│   └── styles.css            # Styling for chatbot
├── /js
│   └── script.js             # Core JavaScript for chatbot interaction
├── /images
│   └── bot-avatar.svg        # Bot avatar used in the chat UI
├── index.html                # Main HTML file
└── README.md                 # Project Documentation
```

## How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/chatbot-application.git
   ```

2. **Set up API Key**:
   - Replace the placeholder API key in the `script.js` file:
     ```javascript
     const API_KEY = "YOUR_API_KEY_HERE";
     ```

3. **Open `index.html`** in a browser to run the application.

## Usage

- **Sending Messages**: Type your message in the input box and press **Enter** or click the **Send** button.
- **File Upload**: Click the file upload icon to attach an image. The preview will appear in the chat, and the image will be sent with your message.
- **Emoji Selection**: Click the emoji icon to open the emoji picker and select emojis to add to your message.
- **Chat History**: Both user messages and bot responses will appear chronologically in the chat window.

## Key Functions Explained

### `generateBotResponce(incomingMessageDiv)`
- This function sends the user’s message to the Google Generative Language API and retrieves the bot's response. It updates the chat history and displays the response in the chat window.

### `handleOutgoingMessage(e)`
- Handles the process of sending user messages and file uploads. Creates a new message element in the chat window and sends the message to the API for the bot response.

### `fileInput.addEventListener("change",...)`
- Handles file selection and previews the selected image in the chat window. Converts the image into a Base64 string to include in the chat message.

### `EmojiMart.Picker`
- Provides an emoji picker interface. Users can insert emojis into the chat message by selecting them from the picker.

## Dependencies

- **Google Generative Language API**: For chatbot AI responses.
- **Emoji Mart**: Emoji picker used for the chat input.
- **FileReader API**: Handles image file previews for attachments.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as per the terms of the license.

## Future Enhancements

- **Persistent Chat History**: Implement local storage or a database to store chat history across sessions.
- **Voice Input/Output**: Add voice recognition and text-to-speech features for a more immersive chat experience.
- **Multi-file Uploads**: Enable support for multiple file uploads in a single message.

## Contributing

Feel free to submit a pull request or raise issues if you find any bugs or have suggestions for improvements!
