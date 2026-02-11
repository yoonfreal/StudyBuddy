import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { MessageCircle, Send } from 'lucide-react';
import './StudentQA.css'; // optional, can skip for now

const STORAGE_KEY = 'studybuddy_qa';

const StudentQA = () => {
    const { user } = useAuth();
    const [question, setQuestion] = useState('');
    const [qaList, setQaList] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setQaList(JSON.parse(stored));
        }
    }, []);

    const newQuestion = {
        id: Date.now(),
        author: user.name,
        role: user.role,
        question,
        answers: [],
        status: 'waiting', // waiting | solved
        createdAt: new Date().toISOString().split('T')[0]
    };

    const saveQA = (data) => {
        setQaList(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const handleAskQuestion = () => {
        if (!question.trim()) return;

        const newQuestion = {
            id: Date.now(),
            author: user.name,
            role: user.role,
            question,
            answers: [],
            createdAt: new Date().toISOString().split('T')[0]
        };

        saveQA([newQuestion, ...qaList]);
        setQuestion('');
    };

    return (
        <div className="qa-page container">
            <h1>Q&A</h1>
            <p>Ask questions and learn from the community</p>

            {/* Ask Question */}
            <div className="qa-ask-box">
                <textarea
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAskQuestion}>
                    <Send size={16} />
                    Ask
                </button>
            </div>

            {/* Questions List */}
            <div className="qa-list">
                {qaList.length === 0 && (
                    <p>No questions yet. Be the first to ask!</p>
                )}

                {qaList.map((item) => (
                    // <div key={item.id} className="qa-item">
                    <div
                        key={item.id}
                        className={`qa-item ${item.status}`}
                    >
                        <div className="qa-question">
                            <MessageCircle size={18} />
                            <div>
                                <strong>{item.author}</strong>
                                <span> • {item.createdAt}</span>
                                <p>{item.question}</p>
                            </div>
                        </div>

                        {item.answers.length > 0 && (
                            <div className="qa-answers">
                                {item.answers.map((ans, idx) => (
                                    <div key={idx} className="qa-answer">
                                        <strong>{ans.author}:</strong> {ans.text}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentQA;