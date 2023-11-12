import React, { useState } from 'react';
import './App.css';
import analyzeImage from './modules/azure-image-analysis';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeImage(imageUrl);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const DisplayResults = () => {
    if (!analysisResult) return (
      <div className="displayResults">
        <h4>Image URL: {imageUrl}</h4>
        <h4>Analysis Results:</h4>
        <p>No results yet</p>
      </div>
    );
    return (
      <div className="displayResults">
        <h4>Image URL: {imageUrl}</h4>
        <h4>Analysis Results:</h4>
        <p><strong>Caption:</strong> {analysisResult.captionResult.text} (confidence: {analysisResult.captionResult.confidence})</p>
        <p><strong>Tags:</strong> {analysisResult.tagsResult.values.map(tag => `${tag.name} (confidence: ${tag.confidence})`).join(', ')}</p>
        <p><strong>Dense Captions:</strong></p>
        <ul>
        {analysisResult.denseCaptionsResult.values.map((caption, index) => (
          <li key={index}>{caption.text} (confidence: {caption.confidence})</li>
        ))}
        </ul> 
      </div>
    );
  };

  return (
    <div className='mainapp'>
      <h1 className='title'>Welcome to the image analyzer</h1>
      <h2 className='subtitle'>Insert URL or type prompt</h2>
      <input type="text" placeholder="Image URL or Image Request" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <button onClick={handleImageAnalysis} disabled={isAnalyzing}>Image Analysis</button>
      {isAnalyzing && <p>Processing...</p>}
      <DisplayResults/>
      <button>Image Generation</button>
    </div>
  );
}

export default App;