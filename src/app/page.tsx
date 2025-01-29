import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Home</h1>
            <p className="text-gray-500">Your saved snippets</p>
          </div>
          <Link href="/snippet/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
              + New Snippet
            </Button>
          </Link>
        </div>

        {/* Snippets List */}
        <div className="space-y-4">
          {snippets.length > 0 ? (
            snippets.map((snippet) => (
              <div key={snippet.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{snippet.title}</h2>
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">View</Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No snippets available. Create one!</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;
