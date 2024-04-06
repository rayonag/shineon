'use client';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import { FC, memo, use, useEffect, useRef, useState } from 'react';

type EditProps = {
    fileName: string;
    title?: string;
    description?: string;
};
type RowsProps = {
    file: any;
    index: number;
    getData: () => void;
};
const Rows: FC<RowsProps> = memo(({ file, index, getData }) => {
    const [tempEdit, setTempEdit] = useState<EditProps>({ fileName: '' } as EditProps);
    const [isEditing, setIsEditing] = useState(''); //fileName
    const toggleEdit = async (file: any) => {
        console.log('file', file);
        console.log('tempEdit', tempEdit);
        await setTempEdit({ fileName: file.fileName, title: file.title || file.fileName, description: file.description || '' });
        const val = isEditing === file.fileName ? '' : file.fileName;
        setIsEditing(val);
    };
    const handleSave = async (props: EditProps) => {
        if (!confirm('Are you sure you want to edit this file?')) {
            return;
        }
        const res = await supabase.from('news-letter-info').update(props).eq('fileName', props.fileName);
        if (res.error) {
            alert('Something went wrong: ' + res.error.message);
            return;
        }
        console.log('res', res);
        setIsEditing('');
        getData();
    };
    const handleDelete = async (fileName: string) => {
        if (!confirm('Are you sure you want to delete this file?')) {
            return;
        }
        console.log('fileName', fileName);
        const res = await supabase.storage.from('news-letter').remove([`archive/${fileName}`]);
        if (res.error) {
            alert('Something went wrong: ' + res.error.message);
            return;
        }
        console.log('res', res);
        const res2 = await supabase.from('news-letter-info').delete().eq('fileName', fileName);
        if (res2.error) {
            alert('Something went wrong: ' + res2.error.message);
            return;
        }
        getData();
    };
    const handleToggleStatus = async (file: any) => {
        const res = await supabase
            .from('news-letter-info')
            .update({
                status: file.status == 'archive' ? 'latest' : 'archive'
            })
            .eq('fileName', file.fileName);
        if (res.error) {
            alert('Something went wrong: ' + res.error.message);
            return;
        }
        getData();
    };
    return (
        <div key={index} className="w-full md:w-[70vw]">
            {file && (
                <div
                    //TODO: transition height not working
                    className={`p-2 m-1 border bg-gray-50 rounded-md transition-all duration-1000 ease-in ${
                        isEditing === file.fileName ? 'h-60' : 'h-30'
                    }`}
                    key={index}
                    onClick={async () => await toggleEdit(file)}
                >
                    {isEditing === file.fileName ? (
                        <div>
                            <input
                                value={tempEdit.title}
                                onChange={(e) => setTempEdit({ ...tempEdit, title: e.currentTarget.value })}
                                onClick={(e) => e.stopPropagation()}
                                className="text-2xl border-b-4 border-yellow-300 hover:opacity-70"
                            />
                            <div>
                                <textarea
                                    rows={6}
                                    value={tempEdit.description}
                                    onChange={(e) => setTempEdit({ ...tempEdit, description: e.currentTarget.value })}
                                    className={`w-full `}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSave(tempEdit);
                                }}
                                className="text-white bg-blue-500 rounded-full px-2 mx-1"
                            >
                                保存
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(file.fileName);
                                }}
                                className="text-white bg-red-500 rounded-full px-2 mx-1"
                            >
                                削除
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleStatus(file);
                                }}
                                className="text-white bg-green-500 rounded-full px-2 mx-1" // Change bg-green-500 to bg-green-700
                            >
                                {file.status == 'archive' ? 'この記事を最新にする' : 'アーカイブする'}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <a className="text-2xl border-b-4 border-yellow-300 hover:opacity-70" href={file.url} target="_blank">
                                    {file.title}
                                </a>
                                <div className="w-full">
                                    {file.description}
                                    <a className="hover:opacity-70 cursor-pointer" href={file.url} target="_blank">
                                        ...続きを読む
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

const Settings = () => {
    const [latestFiles, setLatestFiles] = useState<any[]>([]);
    const [archiveFiles, setArchiveFiles] = useState<any[]>([]);
    const [files, setFiles] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loadingState, setLoadingState] = useState('hidden');
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const uploadFileRef = useRef<HTMLInputElement>(null);
    const fetchNewsLetter = async () => {
        const { data, error } = await supabase.from('news-letter-info').select();
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
        // use currentpage to slice the data into 10 max
        return fileData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    };

    const getData = async () => {
        // fetch data
        setLoadingState('flex justify-center');
        const newsLetters = await fetchNewsLetter();
        setArchiveFiles(newsLetters.filter((v) => v.status === 'archive'));
        setLatestFiles(newsLetters.filter((v) => v.status === 'latest'));
        setLoadingState('hidden');
    };
    useEffect(() => {
        (async () => {
            getData();
        })();
    }, []);
    // set page of archive files
    useEffect(() => {
        setFiles(files.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage]);

    const uploadFileToSupabase = async (status: 'archive' | 'latest') => {
        if (!uploadFile || uploadFile.length == 0) {
            return;
        }
        const fileName = uploadFile.name;
        const filePath = `archive/${fileName}`;
        const res = await supabase.storage.from('news-letter').upload(filePath, uploadFile);
        if (res.error) {
            alert('Something went wrong: ' + res.error.message);
            return;
        } else if (res.data == null) {
            alert('Failed to upload file (1)');
            return;
        } else {
            setUploadFile(null);
        }
        if (!res.data?.path) return alert('Failed to upload file (2)');
        const urlobj = await supabase.storage.from('news-letter/archive').getPublicUrl(fileName);
        const res2 = await supabase.from('news-letter-info').upsert({ fileName: fileName, url: urlobj.data.publicUrl, status: status }).select();
        if (res2.error) {
            alert('Something went wrong: ' + res2.error.message);
            return;
        }
        getData();
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authUser, setAuthUser] = useState('');
    useEffect(() => {
        (async () => {
            const { data } = await supabase.auth.getSession();
            if (data?.session?.user?.id) {
                setAuthUser(data.session.user.id);
            }
        })();
    }, []);
    const handleLogin = async (email: string, password: string) => {
        const user = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (!user.data) return;
        setAuthUser(user.data.user?.id || '');
        console.log('user', user);
    };
    const UploadFileButton = ({ status }: { status: 'archive' | 'latest' }) => {
        return !uploadFile ? (
            <>
                <input ref={uploadFileRef} className="hidden" type="file" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                <button
                    onClick={() => {
                        uploadFileRef.current?.click();
                    }}
                    className="text-xl blue-button"
                >
                    ファイルをアップロード
                </button>
            </>
        ) : (
            <>
                <span>{uploadFile.name}</span>
                <button
                    onClick={() => {
                        uploadFileToSupabase(status);
                    }}
                    className="white-button"
                >
                    保存
                </button>
                <button
                    onClick={() => {
                        setUploadFile(null);
                    }}
                    className="white-button"
                >
                    キャンセル
                </button>
            </>
        );
    };
    return (
        <div className="min-h-screen h-auto w-full py-5 text-gray-300 bg-gradient-to-r from-blue-900 to-gray-800 justify-center content-center items-center">
            {authUser ? (
                <div>
                    <div className={loadingState} aria-label="読み込み中">
                        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                    </div>
                    <div>
                        <div className="m-5 flex flex-wraps">
                            <h1 className="text-gray-100 text-2xl font-bold mb-4">Admin Console for SHINE ON!</h1>
                        </div>
                        <div className="p-5">
                            <Link href="/newsletters" className="white-button">
                                Go to Newsletters →
                            </Link>
                        </div>
                        <section>
                            <div className="m-5 text-3xl border-b flex flex-wrap">最新号</div>
                            <UploadFileButton status="latest" />
                            {latestFiles.map((file, index) => (
                                <Rows file={file} index={index} getData={getData} />
                            ))}
                        </section>

                        <section>
                            <div className="m-5 text-3xl border-b flex flex-wrap">アーカイブ</div>
                            <UploadFileButton status="archive" />
                            <ul className="flex flex-wrap w-full">
                                {archiveFiles.length == 10 && (
                                    <div>
                                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                            Previous
                                        </button>
                                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={files.length / itemsPerPage <= currentPage}>
                                            Next
                                        </button>
                                    </div>
                                )}
                                {archiveFiles.map((file, index) => (
                                    <Rows file={file} index={index} getData={getData} />
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            ) : (
                <div className="block">
                    <div>
                        <input className="m-5 p-3 rounded-lg" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input className="m-5 p-3 rounded-lg" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="blue-button" onClick={() => handleLogin(email, password)}>
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Settings;
