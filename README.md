# Personal Flight Tracker

Super quick and dirty web-app to track flights. Uses the free API offered by Air
Labs to display flight data. 

To use this repo:

1. Fork it

2. Do the usual `npm i` or whatever package manager you are using

3. Create a `.env` file with the following

```
FLIGHT_API_KEY="YOUR_AIR_LABS_API_KEY"
FLIGHT_API_BASE_URI="https://airlabs.co/api/v9"
ACCESS_AUTH="COMMA_SEPARATED_LIST_OF_IDS_YOU_WANT_TO_USE_YOUR_KEY:SOME_SUPER_SECRET_PASSWORD"
```

4. Run `npm dev`

5. If you want to link to vercel push to git then do the usual vercel link