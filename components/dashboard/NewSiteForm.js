import React from 'react';
import { createSite, getSites } from '@/components/DataProvider';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
  
export default function CreateSiteForm({}) {
    const [siteName, setSiteName] = React.useState("");
    const [pageName, setPageName] = React.useState("");
    const [error, setError] = React.useState(null);
    const createSiteSubmit = async () => {
        if(!siteName || !pageName) {
            setError("Site Name and Page Name are required");
            return;
        };
        var query = createSite({site: siteName, page: pageName});
        query.then((result) => {
            console.log(result);
        }).catch((error) => {
            setError(error.message);
        });
    }

    return <div className={"flex flex-col w-full rounded-xl p-2 border border-gray-400/80"}>
        <div className={"flex flex-col"}>
            <label>Site Name</label>
            <input type="text" value={siteName} onChange={(e)=>{setSiteName(e.target.value)}}/>
        </div>
        <RandomSelector onSelect={(value)=>{setSiteName(value)}}/>

        <div className={"flex flex-col"}>
            <label>Page Name</label>
            <input type="text" value={pageName}  onChange={(e)=>{setPageName(e.target.value)}}/>
        </div>
        <RandomSelector onSelect={(value)=>{setPageName(value)}}/>

        <button onClick={async ()=>createSiteSubmit()}>
            Create
        </button>
        {error && <div>{error}</div>}
    </div>
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
    Suggested names:
    {RandomNameGeneratorArray(4).map((item, index) => {
        return <button key={index} onClick={()=>{onSelect(item)}} className={"rounded-full bg-gray-500/50 mx-1 px-1"}>
            {item}
        </button>
        })
    }
</div>
})

