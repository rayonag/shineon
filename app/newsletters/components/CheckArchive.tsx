'use client';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

const CheckArchive = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loadingState, setLoadingState] = useState('hidden');
    const fetchArchive = async () => {
        // fetch data
        setLoadingState('flex justify-center');
        const { data, error } = await supabase.from('news-letter-info').select().eq('status', 'archive');
        if (error) {
            console.log('error', error);
            alert('エラーが発生しました。時間をおいて再度お試しください。');
        }
        if (!data) {
            return [];
        }
        const fileData = data.map((v) => ({
            title: v.title || v.fileName,
            description: v.description || 'no description',
            url: v.url,
            status: v.status,
            fileName: v.fileName
        }));
        setLoadingState('hidden');
        // use currentpage to slice the data into 10 max
        setFiles(fileData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        return;
    };
    useEffect(() => {
        setFiles(files.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage]);

    return (
        <>
            <div className="w-full max-w-lg flex flex-col justify-center">
                <div className={loadingState} aria-label="読み込み中">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
                <button onClick={async () => await fetchArchive()} className="white-button">
                    過去のニュースレターをチェック
                </button>
                <ul className="flex flex-wrap w-full">
                    {files.length == 10 && (
                        <div>
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={files.length / itemsPerPage <= currentPage}>
                                Next
                            </button>
                        </div>
                    )}
                    {files.map((file, index) => (
                        <div key={index} className="w-full md:w-[70vw]">
                            {file && (
                                <div
                                    //TODO: transition height not working
                                    className="h-30 p-2 m-1 border bg-gray-50 rounded-md overflow-auto"
                                    key={index}
                                >
                                    <div>
                                        <div>
                                            <a className="text-2xl border-b-4 border-yellow-300 hover:opacity-70" href={file.url} target="_blank">
                                                {file.title}
                                            </a>
                                            <div className="">
                                                {file.description}
                                                <a className="hover:opacity-70 cursor-pointer" href={file.url} target="_blank">
                                                    ...続きを読む
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default CheckArchive;
