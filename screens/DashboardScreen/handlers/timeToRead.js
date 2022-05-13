
// every 130 words is about 1 minute of speech according to what I googled. ..
export const timeToRead = 
    (wordCount)=>{
        return Math.floor(wordCount/130)
    };   

export default timeToRead;