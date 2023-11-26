import React, { useRef, useState } from "react";

const CameraComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const capturePhoto = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = canvas.toDataURL("image/jpeg");
                setCapturedImage(imageData);

                // You can now send imageData to your server or directly to Google Vision API
                // For simplicity, let's just log it for now
                console.log("Captured Image:", imageData);
                try {
                    // Send the captured image data to the server
                    const response = await fetch("/api/GoogleUpload", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ imageData }),
                    });

                    const data = await response.json();
                    console.log("Server Response:", data);

                    // Handle the server response as needed
                    if (data.success) {
                        // Do something with the extracted text
                        console.log("Extracted Text:", data.extractedText);
                    } else {
                        console.error("Server Error:", data.error);
                    }
                } catch (error) {
                    console.error("Error sending image data:", error);
                }
            }
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <button onClick={startCamera}>Start Camera</button>
            <button onClick={capturePhoto}>Capture Photo</button>
            {capturedImage && <img src={capturedImage} alt="Captured" />}
        </div>
    );
};

export default CameraComponent;
