import axios from 'axios';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const response = await axios.post('http://localhost:8085/predict', req.body);
        const { data: {
            data
        }} = response;
        const [prediction  = []] = data;
        prediction.forEach((r) => r * 100)
        const biggestIndex = prediction.indexOf(Math.max(...prediction));
        res.status(200).json({ mightBe: biggestIndex });
        return;
    }
    res.status(400).json({error: 'Method not allowed'})
}