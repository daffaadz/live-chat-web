import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { database, ref, push, onValue } from "../../backend/firebase";

// Fungsi untuk memanggil AIMLAPI
const fetchAIResponse = async (userMessage) => {
  const apiUrl = "https://api.aimlapi.com/chat/completions";
  const apiKey = "bbd5f01623234fe2acca48def8f03baf"; // Masukkan API Key AIMLAPI Anda

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Pastikan model sesuai dokumentasi
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      // Log detail error untuk debugging
      const errorDetails = await response.text();
      console.error("API Error Details:", errorDetails);
      throw new Error(`Failed to fetch AI response: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content; // Ambil respons dari API
  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    return "Sorry, I'm having trouble responding right now.";
  }
};


const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Ambil pesan dari Firebase secara realtime
    const messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });

    return () => {
      // Hentikan listener Firebase saat komponen unmount
      messagesRef.off && messagesRef.off();
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, "messages");

      // Kirim pesan pengguna
      push(messagesRef, {
        text: newMessage,
        timestamp: Date.now(),
        role: "user",
      });

      const userMessage = newMessage;
      setNewMessage("");
      setIsTyping(true); // Tampilkan "Typing..." status

      try {
        // Dapatkan respons dari AI
        const aiResponse = await fetchAIResponse(userMessage);

        // Kirim balasan AI ke Firebase
        push(messagesRef, {
          text: aiResponse,
          timestamp: Date.now(),
          role: "admin",
        });
      } catch (error) {
        // Tangani error
        push(messagesRef, {
          text: "I'm sorry, I couldn't respond right now.",
          timestamp: Date.now(),
          role: "admin",
        });
      } finally {
        setIsTyping(false); // Sembunyikan "Typing..." status
      }
    }
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      {/* Tampilan Utama */}
      <div
        id="home"
        className="w-screen h-screen flex flex-col lg:flex-row justify-evenly items-center bg-gradient-to-b from-4 to-3 text-white"
      >
        {/* Teks Utama */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:ml-40 text-center lg:text-left px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold leading-tight">
            Visual <br /> Studio
          </h1>
          <p className="text-lg mt-4 lg:mt-6 max-w-md">
            The ultimate code editor experience for developers worldwide.
          </p>
        </div>

        {/* Paragraf */}
        <div className="w-full lg:w-1/2 px-8">
          <p className="text-md sm:text-lg leading-relaxed max-w-lg text-justify mx-auto lg:mr-40">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            suscipit excepturi perspiciatis necessitatibus animi autem hic
            voluptate aperiam eum id fuga natus qui aliquid nemo tempora cumque
            accusantium, itaque quo officiis voluptates maiores, facilis sequi.
            Laborum voluptatibus ullam porro doloribus omnis, voluptate, est sit
            labore, assumenda quod voluptatem magnam totam!
          </p>
        </div>
      </div>

      {/* About Us */}
      <div
        id="about"
        className="w-screen h-screen py-20 px-6 bg-gradient-to-b from-3 to-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Div Kiri Kosong */}
          <div
            className="h-full hidden lg:block bg-gray-200 rounded-lg py-72"
            data-aos="fade-up"
          ></div>

          {/* Div Kanan */}
          <div className="h-full flex flex-col gap-6">
            <div
              className="bg-gray-50 shadow-md rounded-lg p-6 py-16"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                Who We Are
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
                deserunt.
              </p>
            </div>
            <div
              className="bg-gray-50 shadow-md rounded-lg p-6 py-16"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                Our Mission
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
                deserunt.
              </p>
            </div>
            <div
              className="bg-gray-50 shadow-md rounded-lg p-6 py-16"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                Why Choose Us
              </h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
                deserunt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Produk */}
      <div
        id="product"
        className="w-screen py-20 px-6 bg-gradient-to-b from-4 to-3"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-zinc-100">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
              data-aos="fade-up"
            >
              <img
                src={`https://via.placeholder.com/300x200?text=Product+${
                  i + 1
                }`}
                alt={`Product ${i + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Product {i + 1}</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              <div className="p-4 text-center">
                <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-800">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Menu */}
      <div
        id="contact"
        className="w-screen py-20 px-6 bg-gradient-to-b from-3 to-4 text-white"
      >
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          data-aos="fade-up"
        >
          {/* Contact Form */}
          <form className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl mb-4 font-bold">Send us a message</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
            />
            <textarea
              placeholder="Your Message"
              className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
              rows="5"
            ></textarea>
            <button className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-800">
              Send
            </button>
          </form>

          {/* Live Chat */}
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            data-aos="fade-up"
          >
            <h3 className="text-2xl mb-4 font-bold">Live Chat</h3>
            <div className="h-48 overflow-y-auto bg-gray-700 rounded-lg p-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white text-right"
                        : "bg-green-600 text-white text-left"
                    }`}
                  >
                    {message.role === "admin" ? "[Admin] " : "[User] "}
                    {message.text}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="mb-2 flex justify-start">
                  <span className="px-4 py-2 rounded-lg bg-green-600 text-white">
                    [Admin] Typing...
                  </span>
                </div>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-grow px-4 py-2 rounded bg-gray-700 text-white mr-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-800"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
