# BSV Lucky Dip
*go try it out at [luckydip.run](https://luckydip.run)*

## Thanks to...

[@earvinpiamonte](https://github.com/earvinpiamonte) for his [Next.js + Tailwind CSS template](https://github.com/earvinpiamonte/nextjs-tailwindcss-template).

[@vercel](https://github.com/vercel) for web and API hosting.

[@supabase](https://github.com/supabase) for database and API hosting.

[@ankh2054](https://github.com/ankh2054) for introducing me to the BSV community and RUN protocol.

[@runonbitcoin](https://github.com/runonbitcoin) for their [code examples](https://github.com/runonbitcoin/examples) and for hosting the first [RUN hackathon](https://run.network/hackathon/). Also thanks to other sponsors [RelayX](https://relayx.io/) and [CoinGeek](https://coingeek.com/).

---

## Planned integrations

* https://og-image.vercel.app/ for share images
* https://github.com/ellisonleao/sharer.js for general sharing
* https://github.com/twetch-inc/twetch-js for twetch integration
* https://github.com/tonicpow/tonicpow-js for tonicpow integration
* Various BSV social medias if possible: 
    * Bitpost
    * Relica (relies on image)
    * Streamanity (maybe just the about page)
    * Koalament (perhaps just posting a comment or easter egg on each page)

---
## RUN Contract

Go check it out the live version of the RUN contract here: ```pending deploy```

I am planning for it to include 5 functions:
```js
luckyDip.setUp({params}) // creator-only: creates new lucky dip
luckyDip.update(dipId, {params}) // admin-only: edits current setup - i.e. ticketPriceDuro, cause, payees
luckyDip.addAdmin(dipId) // admin-only: adds admins
luckyDip.removeAdmin(dipId) // admin-only: adds admins 
luckyDip.reset(dipId) // admin-only: resets the lucky dip
luckyDip.draw(dipId) // public: detects how much money has been sent, draws a jig (prize) from the dip, and transfers it to the user along with any change (unused tickets, value sent over the ticket price)
```

---

## API

This is used internally by the app, but can also be used by other front-ends or bots. I probably won't be able to get all these features added by the end of the hackathon, but here's hoping!

**GET /dips**
and **GET dip/id,id,id**

*List all current lucky dips, and teturn details of specific lucky dip/s, respectively.*

response format:
```
[
    { 
        dipId: string, 
        creator:string, 
        admins: string[], 
        cause?: string, 
        originTx: string,
        ticketPriceDuro: number,
        payees: [
            {
                address: string,
                percent: number, // default = 0
                fixedFeeDuro: number, // default = 0
                reason?: string
            }
        ]
        jigs: {
            unlocked: [
                jigId: string[]
            ], 
            locked: [
                jigId: string[]
            ]
        }
    }
]
```

**GET jig/id,id,id**

*Return details of specific jigs (prizes).*

response format:
```
[
    {
        jigId: string,
        name: string,
        includedInDip: string,
        ticketsNeeded: number,
        donor?: string,
        imgTxId?: string,
        description? string,
        url?: string,
        winner?: string,
        wonAt?: string,
        winTx?: string
    }
]
```

**POST dip/id**

*Confirm success/failure of a lucky-dip interaction e.g. ```luckyDip.draw()``` (used by users) or ```luckyDip.update()``` (used by admins) and return details useful for the frontend.*

request format:
```
{
    action: string, // options: "draw", "update"
    txid: string // the txid where the contract interaction was made
}
```

response format:
```
{
    error: boolean,
    message: string, // possible errors include no more prizes to be won, or txid not found
    txid: string,
    changeDuro: number,
    changeDollarCents: number,
    jigWon: {
        jigId: string,
        name: string,
        ticketsNeeded: number,
        donor?: string,
        imgTxId?: string,
        description? string,
        url?: string,
        winner: string,
        wonAt: string,
        winTx: string
    }
}
```

---

## Environment Variables

* DEPLOY_URL e.g. https://www.luckydip.run
* SUPABASE_API_KEY_PRIVATE
* SUPABASE_API_KEY_PUBLIC
* SUPABASE_JWT_SECRET
* SUPABASE_URL

---

## Database Set-Up

There are two tables to set up:
* dips
* jigs

These serve merely to cache data that can be found on the BSV blockchain.

---

### ```dips``` - required columns

---

**dipId: int8**

*primary key - internal ID for dips in this bsv-lucky-dip instance.*

e.g. ```56```

---

**creator: varchar**

*creator of the lucky dip (address)*

e.g. ```16ZtbzKFp9mUb8oae6Ly94Ya6CkP7SVAMH```

---

**admins: ```Array (varchar)```**

*everyone who can modify this lucky dip (usually just the creator, but others can be added, and the creator can remove themselves if they'd like. This shouldn't be left empty, or otherwise no one can edit or end the dip.) note: this needs to be minified (whitespace removed) before being inserted.*

e.g. 
```js
// creator only
["16ZtbzKFp9mUb8oae6Ly94Ya6CkP7SVAMH"]

// creator and another person
["16ZtbzKFp9mUb8oae6Ly94Ya6CkP7SVAMH", "1FaGzGL2PssHn1P3wMYS6FG8uv652zhUbr"]

// creator removes themselves but gives access to another person
["1FaGzGL2PssHn1P3wMYS6FG8uv652zhUbr"]
```

---

**originTx: varchar**

*transaction which created this lucky dip (transaction hash)*

e.g. ```pending example```

---

***ticketPriceDuro: int4**

*ticket price in duros - 1 Đ = 0.000005 BSV*

e.g. ```10000``` - this would be 0.05 BSV or approx $8.


---

**startsAt: timestamptz**

*when the lucky dip started, or will start*

e.g. ```2021-06-06T15:43:07-03:00```

---

**jigs: jsonb**

*unlocked and locked arrays containing ids of jigs (prizes) available or unlocked from this lucky dip. note: this needs to be minified (whitespace removed) before being inserted. see ```jigId```*

e.g.
```js
// some prizes locked, some unlocked
{"locked":["3","4","5"],"unlocked":["1","2"]}

// completely unlocked (completed) dip
{"locked":[],"unlocked":["1","2","3","4","5"]}

// completely locked (new) dip
{"locked":["1","2","3","4","5"],"unlocked":[]}
```

---

### ```dips``` - optional columns

---

**cause: text**

*what the lucky dip is raising money for. can be null if there's no reason.*

e.g. ```prostate cancer```

---

**endsAt: timestamptz**

*when the lucky dip will end/expire. can be null if it will never end.*

e.g. ```2021-06-06T15:43:07-03:00```

---

**payees: jsonb**

*an array of payees for this lucky dip. if null, this is a free dip. note: this needs to be minified (whitespace removed) before being inserted.*

e.g. 
```js
// a free dip
[{"reason":null,"address":null,"percent":0,"fixedFeeDuro":0}]

// an example where a prostate cancer foundation with address `1FaGzGL2PssHn1P3wMYS6FG8uv652zhUbr` recieves 100% of the prize sale after fixed fees are deducted (and there are no other payees with fixed fees, so it will be 100% of the sale.)
[{"reason":"prostate cancer","address":"1FaGzGL2PssHn1P3wMYS6FG8uv652zhUbr","percent":100,"fixedFeeDuro":0}]

// an example identical to before, except where 400 Đ - 0.002 BSV - approximately 35c - are deducted for website hosting.
[{"reason":"prostate cancer","address":"1FaGzGL2PssHn1P3wMYS6FG8uv652zhUbr","percent":100,"fixedFeeDuro":0}, {"reason":"website hosting","address":"16ZtbzKFp9mUb8oae6Ly94Ya6CkP7SVAMH","percent":0,"fixedFeeDuro":400}]
```

---

### ```jigs``` - required columns

---

**jigId: int8**

*primary key - internal ID for jigs in this bsv-lucky-dip instance.*

e.g. ```4```

---

**name: varchar**

*name of the prize*

e.g. ```Purple Cow```

---

**includedInDip: varchar**

*id of the lucky dip this jig is part of. see ```dipId```.*

e.g. ```56```

---

**ticketsNeeded: int2**

*tickets needed for this prize. default = 1*

e.g. ```2```

---

### ```jigs``` - optional columns

---

**donor: varchar**

*who donated the prize - usually, it's the creator of the lucky dip, but it could be someone else (e.g. someone makes the lucky dip, then collects prizes from various artists to add to it). can be null if no attribution desired (though, of course, blockchain power-users will be able to track down the previous owner/s.)*

e.g. ```Jack Daniels```

---

**imgTxId: varchar**

*transaction . using type `text` as it supports UTF-8 content like emojis. [see an example here.](https://www.bitcoinfiles.org/t/e605923f307c0fd02957fed0b4a15af550219207a8b6fd393ee202afed98e504)*

e.g. ```e605923f307c0fd02957fed0b4a15af550219207a8b6fd393ee202afed98e504```

---

**description: text**

*description of the prize. using type `text` as it supports UTF-8 content like emojis*

e.g. ```A digital fire-breathing dragon.```

---

**url: varchar**

*reference URL of the prize. for example a link to a signed document from an artist, confirming the prize's authenticity.*

e.g. ```https://run.network/hackathon```

---

**winner: varchar**

*winner of the prize (address.) if no address given, this prize hasn't been won yet.*

e.g. ```16ZtbzKFp9mUb8oae6Ly94Ya6CkP7SVAMH```

---

**wonAt: timestamptz**

*time the prize was won*

e.g. ```2021-06-06T17:03:17-03:00```

---

**winTx: varchar**

*winning transaction - where the winner recieved the jig (transaction hash)*

e.g. ```pending example```