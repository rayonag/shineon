// pages/api/upload.js
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { NextApiRequest, NextApiResponse } from "next";

const vision = new ImageAnnotatorClient();

export const GET = async (req?: any, res?: any) => {
    try {
        const image = "./Picture1 copy.png";

        // Send the image data to the Cloud Vision API for text recognition
        const [result] = await vision.textDetection({
            image: {
                content: Buffer.from(image, "base64"),
            },
        });

        // Extract text from the result
        const textAnnotations = result.textAnnotations;
        const extractedText = textAnnotations?.[0].description;

        // Respond with the extracted text
        return res.status(200).json({ success: true, extractedText });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error });
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { imageData } = req.body;

        // Send the image data to the Cloud Vision API for text recognition
        const [result] = await vision.textDetection({
            image: {
                content: Buffer.from(imageData, "base64"),
            },
        });

        // Extract text from the result
        const textAnnotations = result.textAnnotations;
        const extractedText = textAnnotations?.[0].description;

        // Respond with the extracted text
        res.status(200).json({ success: true, extractedText });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error });
    }
};
