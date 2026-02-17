import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Sparkles, Copy, Check } from 'lucide-react';

const CodeBlock = ({ language, children }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-lg overflow-hidden my-4 border border-white/10 bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/5">
                <span className="text-xs text-gray-400 font-mono lowercased">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-400" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy code</span>
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
                wrapLongLines={true}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

const ChatMessage = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`w-full py-6 transition-all ${isUser ? '' : 'bg-white/5'}`}>
            <div className="max-w-3xl mx-auto flex gap-4 px-4 md:px-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? 'bg-white/10 border border-white/5' : 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
                    }`}>
                    {isUser ? <User size={18} className="text-gray-300" /> : <Sparkles size={18} />}
                </div>
                <div className="flex-1 space-y-2 overflow-hidden min-w-0">
                    <div className="font-semibold text-sm text-gray-200">
                        {isUser ? 'You' : 'Nexus AI'}
                    </div>
                    <div className="text-[16px] leading-7 text-gray-300 break-words">
                        {isUser ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <CodeBlock language={match[1]} {...props}>
                                                {String(children).replace(/\n$/, '')}
                                            </CodeBlock>
                                        ) : (
                                            <code className={`${className} bg-white/10 rounded px-1.5 py-0.5 text-sm font-mono text-indigo-200`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
