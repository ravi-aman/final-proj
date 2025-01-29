import React from 'react'

const SnippetDetailPage = async function page({ params }: { params: Promise<{ id: string }> }) {

    const snippetId = (await params).id;
    return (
        <div>
            <h1 className='text-white text-2xl'>{`${snippetId}`}</h1>
        </div>
    )
}

export default SnippetDetailPage;
