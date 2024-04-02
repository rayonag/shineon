'use client';
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';

const CheckLatest = () => {
    const [url, setUrl] = useState<string>('');
    const [loadingState, setLoadingState] = useState('hidden');
    const fetchLatest = async () => {
        // fetch data
        setLoadingState('flex justify-center');
        const { data, error } = await supabase.from('news-letter-info').select().eq('status', 'latest');
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
        console.log('data', data);
        const res = await supabase.storage.from('news-letter/archive').getPublicUrl(fileData[0].fileName);

        setUrl(data[0].url);
        return;
    };

    useEffect(() => {
        (async () => {
            await fetchLatest();
        })();
    }, []);
    return (
        <>
            <div className="flex flex-col justify-center w-full max-w-lg">
                <div className={loadingState} aria-label="読み込み中">
                    <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
                <a href={url} target="_blank" className="blue-green-gradient-button">
                    最新のニュースレターを読む
                </a>
            </div>
        </>
    );
};
export default CheckLatest;
