import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

export default function Page() {
    async function createSnippet(formData: FormData) {
        "use server";
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        if (!title || !code) {
            alert("Please fill in all fields");
            return;
        }

        const snippet= await prisma.snippet.create({
            data: {
                title: title as string,
                code: code as string,
            },
        })

        console.log(snippet);

        redirect('/');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                action={createSnippet}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-xl font-bold text-gray-700">Create a Code Snippet</h2>

                <div className="space-y-2">
                    <Label htmlFor='title' className="text-sm font-medium">Title</Label>
                    <Input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Enter snippet title'
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor='code' className="text-sm font-medium">Code</Label>
                    <textarea
                        name='code'
                        id='code'
                        placeholder='Enter your code here'
                        rows={5}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <Button
                    type='submit'
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
