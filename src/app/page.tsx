"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/message/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: { content: message }, // Ensure this structure matches
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("New message response:", data);
        setResponse(data.message);
        setPrompt(message);
        setMessage("");
      } else {
        console.error("Failed to send message:", response.status);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/mean-chicken.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1>Can a chicken live here dot com</h1>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Start your poultrey journey{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                today
              </code>
              .
            </li>
            <li>
              Submit your location and find out:{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                {" "}
                Can a chicken live here?{" "}
              </code>
            </li>
          </ol>
          <form onSubmit={handleSubmit}>
            <input
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-foreground focus:ring-opacity-50 focus:outline-none transition-colors w-full h-10 px-4 sm:h-12 sm:px-5 text-black"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Enter info"
            />
            <div className="my-5">
              <button
                type="submit"
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              >
                Send
              </button>
            </div>
          </form>
         <div>
         <p className="my-5 text-gray-600">{prompt}</p>
          <p className="my-5  text-gray-200 ">
            {response}
          </p>
         </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.backyardchickens.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.mypetchicken.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.thehappychickencoop.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to →
          </a>
        </footer>
      </div>
    </div>
  );
}
