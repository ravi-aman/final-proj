import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import React from 'react';
import Link from 'next/link';

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
    const snippet = await prisma.snippet.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!snippet) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-gray-500 text-xl">Snippet not found.</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
            <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-2xl p-6 space-y-6">

                <div className="flex justify-between items-center border-b pb-4 border-gray-700">
                    <h1 className="text-2xl font-bold">{snippet.title}</h1>
                    <div className="flex gap-3">
                        <Link href={`/snippet/${snippet.id}/edit/`}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
                        </Link>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                    </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
                        <code className="text-green-300">{snippet.code}</code>
                    </pre>
                </div>

            </div>
        </div>
    );
};

export default SnippetDetailPage;
