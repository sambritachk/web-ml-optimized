import "@tensorflow/tfjs";
import * as mobileNet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import * as bodySeg from "@tensorflow-models/body-segmentation";
// import * as deeplab from "@tensorflow-models/deeplab";
// import * as depthEst from "@tensorflow-models/depth-estimation";
// import * as faceDetect from "@tensorflow-models/face-detection";
import "./bs.css";
import ld from "lodash";
//@ts-ignore
import ds from "./articles.json";

import { useEffect, useState } from "react";

export type TfImageDetectionUnoptimizedPageProps = {
  className?: string;
};

export const TfImageDetectionUnoptimizedPage = () => {
  const [cocoSsd, setCocoSsd] = useState<cocoSsd.ObjectDetection | null>(null);
  const [mobileNet, setMobileNet] = useState<mobileNet.MobileNet | null>(null);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [] = useState(ds);
  const [predictions, setPredictions] = useState<{
    detection: Array<any> | null;
    classifications: Array<any> | null;
  }>({
    detection: null,
    classifications: null,
  });

  useEffect(() => {
    const loadModel = async () => {
      const [cocoSsdModel, mobilenetModel] = await Promise.all([
        cocoSsd?.load(),
        mobileNet?.load(),
        ld.add(1, 2),
      ]);
      setCocoSsd(cocoSsdModel as any);
      setMobileNet(mobilenetModel as any);
      setModelLoaded(true);
    };
    try {
      const dummyRef = async () => {
        // deeplab.load();
        // depthEst.createEstimator(depthEst.SupportedModels.ARPortraitDepth);
        // faceDetect.createDetector(
        //   faceDetect.SupportedModels.MediaPipeFaceDetector
        // );
        // bodySeg.createSegmenter(
        //   bodySeg.SupportedModels.MediaPipeSelfieSegmentation
        // );
        // if ("length" in ds) {
        //   console.log(ds.length);
        // }
      };
      dummyRef();
    } catch (error) {
      console.error(error);
    }
    loadModel();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start space-y-4 w-full h-full">
      <div className="w-full flex justify-start bg-clip-text text-transparent bg-gradient-to-r items-center from-orange-400 to-orange-700">
        <h1 className="text-3xl font-bold">Image Analysis</h1>
        <div></div>
      </div>
      <input
        title="Image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              setImage(img);
            };
            setPredictions({
              detection: null,
              classifications: null,
            });
          }
        }}
      />
      {modelLoaded && image && (
        <div className="flex flex-col items-center space-y-4">
          <img src={image.src} alt="upload" className="h-80 w-96" />
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={async () => {
              const cocoSsdPredictions = await cocoSsd?.detect(image);
              const mobileNetPredictions = await mobileNet?.classify(image);
              setPredictions({
                detection: cocoSsdPredictions || [],
                classifications: mobileNetPredictions || [],
              });
            }}
          >
            Detect
          </button>
        </div>
      )}
      {predictions.detection && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Detection</h2>
          <ul>
            {predictions.detection.map((prediction: any, index) => (
              <li key={index}>
                {prediction.class} - {prediction.score.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {predictions.classifications && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-bold">Classifications</h2>
          <ul>
            {predictions.classifications.map((prediction, index) => (
              <li key={index}>
                {prediction.className} - {prediction.probability.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TfImageDetectionUnoptimizedPage;
