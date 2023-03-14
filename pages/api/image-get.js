import requireAuth from './_require-auth'
const banana = require('@banana-dev/banana-dev');

const apiKey = '1fa7345f-b488-4a9f-a7a2-76002d9fe192'; // "YOUR_API_KEY"
const modelKey = '1e38475b-5518-4150-83d7-b7d449523d64'; // "YOUR_MODEL_KEY"


const handler = requireAuth(async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);

    const modelInputs = {
        prompt,
        num_inference_steps: 100,
        guidance_scale: 7.5,
        width: 512,
        height: 512,
        seed: -1,
    };

    const callInputs = {
        MODEL_ID: 'runwayml/stable-diffusion-v1-5',
        PIPELINE: 'StableDiffusionPipeline',
        SCHEDULER: 'LMSDiscreteScheduler',
        safety_checker: true,
    };

    const item = await banana.run(apiKey, modelKey, {
        modelInputs,
        callInputs,
    });
    console.log(JSON.stringify(item));

    res.send({
        status: 'success',
        data: item['modelOutputs'][0]['image_base64'],
    });
});

export default withSessionRoute(handler)