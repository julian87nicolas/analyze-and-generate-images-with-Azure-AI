// azure-image-analysis.js
import axios from 'axios';

import "../App.css";
const subscriptionKey = '72e85db32d514bb899c2ffa2f1afa39f';
const endpoint = 'https://computervisionazurejc.cognitiveservices.azure.com';

async function analyzeImage(imageUrl) {
    const url = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-04-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en&gender-neutral-caption=False`;

    try {
        const response = await axios.post(url,
            { url: imageUrl },
            { headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey } }
        );
        return response.data;
    } catch (error) {
        console.error(`Error in Azure Image Analysis: ${error}`);
    }
}

export default analyzeImage;