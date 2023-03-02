import React from 'react';
import { createSite, getSites } from '@/components/DataProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import GenericModal from '../UI/GenericModal';
import { ErrorText } from '../ui-helpers';
  
export default function NewSiteModal({site, onComplete}) {
    const [pageName, setPageName] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const createSiteSubmit = async () => {
        setLoading(true);
        var query = createSite({siteName: site, pageName: pageName});
        query.then((result) => {
            onComplete();
            setError(null);
            setLoading(false);
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    }

    return <GenericModal onDone={()=>onComplete()}>
        <div className={"flex flex-col w-full"}>
        <center className={"text-2xl"}>Create a new page</center>
        <div className={"flex flex-col items-start space-y-2"}>
            <label className={"text-lg pl-2"}>Page Name</label>
            
            <div className="flex flex-row border-2 border-gray-500 rounded-md w-full p-2">
            <input className={"flex-grow focus:outline-none"} placeholder="gallery" type="text" value={pageName} 
                onChange={(e)=>{
                    setPageName(e.target.value);

                }}/>
            <RandomSelector onSelect={(value)=>{setPageName(value)}}/>

            </div>

            <label className={"pl-2"}>Choose a name for your new page.</label>

        </div>

        {loading && 'Creating...'}
        {error && <ErrorText>{error}</ErrorText>}
        {!loading && <button 
            className={"border-2 border-dragd bg-dragd hover:bg-dragd/80 p-2 rounded-md mx-auto mt-3 transition-all"} 
            onClick={async ()=>createSiteSubmit()}>
            Create
        </button>}
        </div>
    </GenericModal>
}



const RandomNameGenerator = (N) => {
    const words = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'grey', 'gray', 'big', 'small', 'tiny', 'long', 'short', 'fat', 'skinny', 'round', 'square', 'flat', 'sharp', 'soft', 'hard', 'cold', 'hot', 'warm', 'cool', 'new', 'old', 'young', 'fast', 'slow', 'strong', 'weak', 'loud', 'quiet', 'clean', 'dirty', 'wet', 'dry', 'high', 'low', 'wide', 'narrow', 'deep', 'shallow', 'bright', 'dark', 'light', 'heavy', 'light', 'heavy', 'full', 'empty', 'straight', 'curved', 'sharp', 'dull', 'smooth', 'rough', 'warm', 'cold', 'hot', 'cool', 'sweet', 'sour', 'bitter', 'spicy', 'tasty', 'delicious', 'yummy', 'tasty', 'fresh', 'stale', 'rotten', 'ripe', 'unripe', 'juicy', 'dry', 'wet', 'soft', 'hard', 'crisp', 'crunchy', 'mushy', 'slimy', 'sticky', 'bumpy', 'smooth', 'rough', 'warm', 'cold', 'hot', 'cool', 'sweet', 'sour', 'bitter', 'spicy', 'tasty', 'delicious', 'yummy', 'tasty', 'fresh', 'stale', 'rotten', 'ripe', 'unripe', 'juicy', 'dry', 'wet', 'soft', 'hard', 'crisp', 'crunchy', 'mushy', 'slimy', 'sticky', 'bumpy', 'smooth', 'rough', 'warm', 'cold', 'hot', 'cool', 'sweet', 'sour', 'bitter', 'spicy', 'tasty', 'delicious', 'yummy', 'tasty', 'fresh', 'stale', 'rotten', 'ripe', 'unripe', 'juicy', 'dry', 'wet', 'soft', 'hard', 'crisp']

    const randomName = () => {
        var name = "";
        for (var i = 0; i < N; i++) {
            name += words[Math.floor(Math.random() * words.length)];
        }
        return name;
    }
    return randomName();
}

// return an array of N names from RandomNameGenerator
const RandomNameGeneratorArray = (N) => {
    var names = [];
    for (var i = 0; i < N; i++) {
        names.push(RandomNameGenerator(2));
    }
    return names;
}

const RandomSelector = React.memo(({onSelect}) => {
    return <div className={"flex flex-row text-xs font-thin justify-center"}>
    {RandomNameGeneratorArray(3).map((item, index) => {
        return <button key={index} onClick={()=>{onSelect(item)}} className={"rounded-full bg-gray-500/10 hover:bg-gray-500/20 mx-1 px-1"}>
            {item}
        </button>
        })
    }
</div>
})