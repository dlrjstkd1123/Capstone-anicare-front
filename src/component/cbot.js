// CBOT.js
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

function CBOT() {
    const location = useLocation();
    const { question } = location.state || {};  // 네비게이션에서 전달된 상태 접근

    return (
        <div className="Mainpage">
            <Chatbot initialMessage={question} />
        </div>
    );
}

export default CBOT;
