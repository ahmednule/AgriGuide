"use client";
// app/components/ChatButton.tsx
import { useState, useCallback, FormEvent } from "react";
import { Button, cn, Image, Input } from "@nextui-org/react";
import { sendMessage } from "@/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { convertMarkdownToHtml } from "@/lib/utils";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError("");

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    try {
      setIsLoading(true);
      const response = await sendMessage(input);
      const botMessage = { text: response, isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className={cn(
          "fixed bottom-5 right-5 bg-emerald-500 text-white z-50 p-2 transition duration-500 rotate-0",
          {
            "rotate-45": isOpen,
          }
        )}
        title="Chat with AgriAI"
        onPress={() => setIsOpen(!isOpen)}
        isIconOnly
        size="lg"
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </Button>
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-80 bg-white p-4 shadow-lg rounded-lg border border-gray-300">
          <div className="h-64 overflow-y-auto mb-2">
            {error && (
              <div className="my-2 p-2 rounded-lg bg-red-500 text-white">
                {error}
              </div>
            )}

            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`my-2 p-2 whitespace-pre-wrap rounded-lg ${
                    message.isUser ? "bg-emerald-500 text-white" : "bg-gray-200"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(message.text),
                  }}
                />
              ))
            ) : (
              <div className=" text-gray-500">No messages yet.</div>
            )}
          </div>
          <form onSubmit={handleSendMessage}>
            <Input
              fullWidth
              placeholder="Ask a question..."
              value={input}
              classNames={{
                inputWrapper: "!pr-0",
              }}
              onValueChange={(value) => setInput(value)}
              endContent={
                <Button
                  type="submit"
                  isIconOnly
                  isDisabled={!input.trim()}
                  className="bg-emerald-600 text-white"
                  isLoading={isLoading}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              }
            />
          </form>
        </div>
      )}
    </>
  );
}
