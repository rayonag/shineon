import { Ref, useRef, useState } from "react";

export const FileUpload = (props: { label: string; placeholder?: string; ref: any }) => {
    const fileInput = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState("");
    const [imageData, setImageData] = useState("");
    const ref = props.ref;
    // const camera = () => {
    //     if (!fileInput.current) return;
    //     fileInput.current.setAttribute("capture", "environment");
    //     fileInput.current.click();
    // };
    // const isMobile = window.navigator.userAgent
    //     .toLowerCase()
    //     .includes("mobile");
    // <button onClick={camera} type="button" disabled={!isMobile}>
    //     カメラで撮影
    // </button>;
    const deployment = (files: FileList) => {
        const file = files[0];
        const fileReader = new FileReader();
        setFileName(file.name);
        fileReader.onload = () => {
            setImageData(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length <= 0) return;
        deployment(files); // ファイル名とプレビューの表示
    };
    return (
        <label className="flex flex-col space-y-1 w-80 me-5 grow md:max-w-sm">
            <div className="font-semibold mb-1">{props.label}</div>
            <input
                type="file"
                capture="environment"
                accept="image/*"
                onChange={onChange}
                ref={ref}
                // {...rest}
                placeholder={props.placeholder || props.label}
            />
            <img src={imageData} />
        </label>
    );
};
