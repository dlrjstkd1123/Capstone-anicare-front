import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chatbot = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const hasSentInitialMessageRef = useRef(false); // Ref 사용하여 중복 방지

  const apiKey = 'sk-proj-3i1vojApHnuC7cZdrduqT3BlbkFJQE266BtocZMZH00EWWwr';
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const persona = "당신은 강아지 전문가 애케플입니다. 유머가 넘치고 친절한 성격의 챗봇입니다. 재치 있는 농담을 좋아하며 항상 즐겁게 대화합니다.";

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = async (message = userInput.trim()) => {
    if (message.length === 0 || loading) return;

    addMessage('user', message);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: persona },
            ...messages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.message })),
            { role: 'user', content: message }
          ],
          max_tokens: 1024,
          top_p: 1,
          temperature: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || '응답이 없습니다.';
      const formattedResponse = aiResponse.replace(/\. /g, '.\n');

      addMessage('bot', formattedResponse);
    } catch (error) {
      console.error('Error!', error);
      addMessage('bot', 'Error!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage && !hasSentInitialMessageRef.current) {
      handleSendMessage(initialMessage).then(() => {
        hasSentInitialMessageRef.current = true; // Ref 업데이트
      });
    }
  }, [initialMessage]);

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto', margintop: "50px" }}>
      <Paper style={{ maxHeight: 600, overflow: 'auto' }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ margin: 1, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <Paper elevation={3} sx={{ display: 'inline-block', padding: 2 }}>
              <Typography color="textSecondary" style={{ whiteSpace: 'pre-wrap' }}>
                {msg.sender === 'user' ? '당신' : 'Chatbot'}: {msg.message}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Paper>
      {loading && <Typography>작성중입니다...</Typography>}
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="메시지를 입력"
            variant="outlined"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => handleSendMessage()}
            endIcon={<SendIcon />}
            disabled={loading}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chatbot;
