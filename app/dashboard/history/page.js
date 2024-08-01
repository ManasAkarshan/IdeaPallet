"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/utils/db";
import { AIOutput } from "@/app/utils/schema";
import Templates from "@/app/(data)/Templates";
import markdownToText from 'markdown-to-text'
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

function History() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const {user} = useUser();

  useEffect(() => {
    const fetchAIOutput = async () => {
      try {
        const results = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.emailAddresses[0].emailAddress)).orderBy(AIOutput.createdAt, 'desc').execute();
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchAIOutput();
  }, [user]);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text:", err));
  };
  const selectedTemplate = (slug) => {
    const template = Templates.find((template) => template.slug === slug);
    return (
    <div className="flex gap-2 max-md:flex-col max-md:text-center items-center">
        {<img src={template?.icon} className="h-8 w-8"/>}
        {template?.name}
    </div>
    );
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">AI Output Data</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {data.length > 0 ? (
        <div className="overflow-x-auto bg-secondary">
          <table className="w-full border rounded-md shadow-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="sm:px-5 sm:py-4 px-2 py-2 font-bold text-left sm:text-2xl">
                  Template
                </th>
                <th className="sm:px-5 sm:py-4 px-2 pl-4 py-2 font-bold text-left sm:text-2xl">
                  AI Response
                </th>
                <th className="sm:px-5 sm:py-4 px-2 py-2 font-bold text-left sm:text-2xl max-sm:hidden">
                  Date
                </th>
                <th className="sm:px-5 sm:py-4 px-2 py-2 font-bold text-left sm:text-2xl max-sm:hidden">
                  Words
                </th>
                <th className="sm:px-5 sm:py-4 px-2 py-2 font-bold text-left sm:text-2xl">
                  Copy
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="sm:px-5 sm:py-10 px-2 py-2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                    {selectedTemplate(item.slug)}
                  </td>
                  <td className="sm:px-5 sm:py-10 px-2 pt-2 pb-1 pl-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl max-sm:line-clamp-3">
                    {markdownToText(item.aiResponse).length > 150
                      ? markdownToText(item.aiResponse).slice(0, 150) + '...'
                      : markdownToText(item.aiResponse)}
                  </td>
                  <td className="sm:px-5 sm:py-10 px-2 py-2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl max-sm:hidden">
                    {item.createdAt}
                  </td>
                  <td className="sm:px-5 sm:py-10 px-2 py-2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl max-sm:hidden">
                    {item.aiResponse.split(" ").length}
                  </td>
                  <td className="sm:px-5 sm:py-10 px-2 py-2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => handleCopy(item.aiResponse)}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="">No data available</p>
      )}
    </div>
  );
}

export default History;
